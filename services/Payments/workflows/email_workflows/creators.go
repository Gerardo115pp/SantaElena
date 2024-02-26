package email_workflows

import (
	"bytes"
	"fmt"
	"html/template"
	app_config "libery_payments_service/Config"
	"libery_payments_service/models"

	"gopkg.in/gomail.v2"
)

type PurchaseConfirmationEmailParams struct {
	Product       models.Product
	Locale        string
	CustomerEmail string
	CustomerName  string
	TrackingCode  string
}

func createPurchaseConfirmationEmail(params PurchaseConfirmationEmailParams) (*gomail.Message, error) {
	template_filename, err := getPurchaseConfirmationTemplateName(params.Locale)
	if err != nil {
		return nil, err
	}

	email_template, err := template.ParseFiles(template_filename)
	if err != nil {
		return nil, err
	}

	template_params := &struct {
		CheckoutSessionID string
		ServiceName       string
	}{
		CheckoutSessionID: params.TrackingCode,
		ServiceName:       params.Product.Name,
	}

	var email_body bytes.Buffer
	err = email_template.Execute(&email_body, template_params)
	if err != nil {
		return nil, err
	}

	plain_text_body := fmt.Sprintf("Gracias por tu compra de %s. Tu número de seguimiento es %s", params.Product.Name, params.TrackingCode)

	mail_message := gomail.NewMessage()
	mail_message.SetHeader("From", fmt.Sprintf("%s <%s>", app_config.EMAIL_CONFIG.MailFrom, app_config.EMAIL_CONFIG.MailUsername))
	mail_message.SetHeader("To", params.CustomerEmail)
	mail_message.SetHeader("Subject", fmt.Sprintf("Confirmación de compra para %s", params.CustomerName))
	mail_message.SetBody("text/plain", plain_text_body)
	mail_message.AddAlternative("text/html", email_body.String())

	return mail_message, nil
}

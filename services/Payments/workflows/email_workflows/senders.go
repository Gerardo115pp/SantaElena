package email_workflows

import (
	"fmt"
	app_config "libery_payments_service/Config"
	"strconv"

	"github.com/Gerardo115pp/patriots_lib/echo"
	"gopkg.in/gomail.v2"
)

func SendPurchaseConfirmation(params PurchaseConfirmationEmailParams) error {
	mail_message, err := createPurchaseConfirmationEmail(params)
	if err != nil {
		return err
	}

	int_port, err := strconv.Atoi(app_config.EMAIL_CONFIG.MailPort)
	if err != nil {
		echo.EchoWarn(fmt.Sprintf("Possibly invalid port number %s for email server", app_config.EMAIL_CONFIG.MailPort))
		return err
	}

	dialer := gomail.NewDialer(app_config.EMAIL_CONFIG.MailServer, int_port, app_config.EMAIL_CONFIG.MailUsername, app_config.EMAIL_CONFIG.MailPassword)

	err = dialer.DialAndSend(mail_message)
	if err != nil {
		echo.EchoWarn(fmt.Sprintf("Error sending email: %s", err.Error()))
		return err
	}

	return nil
}

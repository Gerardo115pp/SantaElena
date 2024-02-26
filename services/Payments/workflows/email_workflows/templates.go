package email_workflows

import (
	"fmt"
	app_config "libery_payments_service/Config"
	"libery_payments_service/helpers"
	"path"

	"github.com/Gerardo115pp/patriots_lib/echo"
)

// Returns the full path of the purchase confirmation email template for the given locale. if there is no template for the given locale, it returns an error
func getPurchaseConfirmationTemplateName(locale string) (string, error) {
	var template_name string = fmt.Sprintf("%s_purchase_confirmation.html", locale)
	template_name = path.Join(app_config.EMAIL_TEMPLATE_PATH, template_name)
	var err error = nil

	if !helpers.FileExists(template_name) {
		echo.EchoWarn(fmt.Sprintf("Tried to use a template for locale %s, but there is no file %s", locale, template_name))
		template_name = ""
		err = fmt.Errorf("Template %s does not exist", template_name)
	}

	return template_name, err
}

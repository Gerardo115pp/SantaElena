package stripe_workflows

import (
	app_config "libery_payments_service/Config"

	"github.com/stripe/stripe-go/v76"
	"github.com/stripe/stripe-go/v76/checkout/session"
)

func RetrieveSession(session_id string) (*stripe.CheckoutSession, error) {
	stripe.Key = app_config.STRIPE_SECRET_KEY

	params := &stripe.CheckoutSessionParams{}
	session, err := session.Get(session_id, params)

	return session, err
}

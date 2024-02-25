package stripe_workflows

import (
	app_config "libery_payments_service/Config"
	"libery_payments_service/models"

	"github.com/stripe/stripe-go/v76"
	"github.com/stripe/stripe-go/v76/checkout/session"
)

func CreateCheckoutSession(products []models.Product, customer_email string, success_url string, cancel_url string) (*stripe.CheckoutSession, error) {
	stripe.Key = app_config.STRIPE_SECRET_KEY

	var line_items []*stripe.CheckoutSessionLineItemParams = convertProductsToLineItems(products)

	params := &stripe.CheckoutSessionParams{
		SuccessURL:    stripe.String(success_url),
		LineItems:     line_items,
		CustomerEmail: stripe.String(customer_email),
		Mode:          stripe.String("payment"),
		CancelURL:     stripe.String(cancel_url),
	}

	session, err := session.New(params)

	return session, err
}

func convertProductsToLineItems(products []models.Product) []*stripe.CheckoutSessionLineItemParams {
	var line_items []*stripe.CheckoutSessionLineItemParams = make([]*stripe.CheckoutSessionLineItemParams, len(products))
	var line_item *stripe.CheckoutSessionLineItemParams

	for h, product := range products {
		line_item = ConvertProductToLineItem(&product)
		line_items[h] = line_item
	}

	return line_items
}

func ConvertProductToLineItem(product *models.Product) *stripe.CheckoutSessionLineItemParams {
	var line_item *stripe.CheckoutSessionLineItemParams = &stripe.CheckoutSessionLineItemParams{
		PriceData: GetPriceDataFromProduct(product),
		Quantity:  stripe.Int64(1),
	}

	return line_item
}

func GetPriceDataFromProduct(product *models.Product) *stripe.CheckoutSessionLineItemPriceDataParams {
	product_data := GetProductDataFromProduct(product)

	var price_in_cents int64 = int64(product.Price * 100)

	var price_data *stripe.CheckoutSessionLineItemPriceDataParams = &stripe.CheckoutSessionLineItemPriceDataParams{
		Currency:    stripe.String(app_config.STRIPE_CURRENCY),
		ProductData: product_data,
		TaxBehavior: stripe.String("unspecified"),
		UnitAmount:  stripe.Int64(price_in_cents),
	}

	return price_data
}

func GetProductDataFromProduct(product *models.Product) *stripe.CheckoutSessionLineItemPriceDataProductDataParams {
	var product_data *stripe.CheckoutSessionLineItemPriceDataProductDataParams = &stripe.CheckoutSessionLineItemPriceDataProductDataParams{
		Name:        stripe.String(product.Name),
		Description: stripe.String(product.ShortDescription),
	}

	return product_data
}

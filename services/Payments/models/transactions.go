package models

// An order register that is not associated with a customer
type OrphanOrder struct {
	OrderID         string   `json:"order_id"`
	OrderDate       string   `json:"order_date"`
	CheckoutID      string   `json:"checkout_id"`
	PaymentIntentID string   `json:"payment_intent_id"`
	Paid            bool     `json:"paid"`
	CustomerEmail   string   `json:"customer_email"`
	CustomerName    string   `json:"customer_name"`
	Locale          string   `json:"locale"`
	ItemsIDs        []string `json:"items_ids"`
}

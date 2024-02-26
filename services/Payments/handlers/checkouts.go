package handlers

import (
	"encoding/json"
	"fmt"
	app_config "libery_payments_service/Config"
	"libery_payments_service/models"
	"libery_payments_service/repositories"
	"libery_payments_service/server"
	stripe_workflows "libery_payments_service/workflows/stripe"
	"net/http"
	"time"

	"github.com/Gerardo115pp/patriots_lib/echo"
)

func CheckoutsHandler(service_instance server.Server) http.HandlerFunc {
	return func(response http.ResponseWriter, request *http.Request) {
		switch request.Method {
		case http.MethodGet:
			getCheckoutsHandler(response, request)
		case http.MethodPost:
			postCheckoutsHandler(response, request)
		case http.MethodPatch:
			patchCheckoutsHandler(response, request)
		case http.MethodDelete:
			deleteCheckoutsHandler(response, request)
		case http.MethodPut:
			putCheckoutsHandler(response, request)
		case http.MethodOptions:
			response.WriteHeader(http.StatusOK)
		default:
			response.WriteHeader(http.StatusMethodNotAllowed)
		}
	}
}

func getCheckoutsHandler(response http.ResponseWriter, request *http.Request) {
	echo.EchoDebug("GET /checkouts")

	query_params := request.URL.Query()
	tracking_id := query_params.Get("tracking_id")
	user_email := query_params.Get("user_email")
	user_name := query_params.Get("user_name")
	success_url := query_params.Get("success_url")
	product_ids := query_params["product_id"]
	cancel_url := query_params.Get("cancel_url")
	locale := query_params.Get("locale")

	if user_email == "" || success_url == "" || len(product_ids) == 0 || tracking_id == "" {
		response.WriteHeader(http.StatusBadRequest)
		return
	}

	if cancel_url == "" {
		schema := request.Header.Get("X-Forwarded-Proto")
		if schema == "" {
			schema = "https"
		}

		cancel_url = fmt.Sprintf("%s://%s/", schema, request.Host)
	}

	if locale == "" {
		locale = "en"
	}

	products, err := repositories.Products.GetProductsByID(product_ids)
	if err != nil {
		echo.EchoErr(err)
		response.WriteHeader(500)
		return
	}

	checkout_session, err := stripe_workflows.CreateCheckoutSession(products, user_email, success_url, cancel_url, tracking_id)
	if err != nil {
		echo.EchoErr(err)
		response.WriteHeader(500)
		return
	}

	response_body := &struct {
		SessionID  string `json:"session_id"`
		SessionURL string `json:"session_url"`
	}{
		SessionID:  checkout_session.ID,
		SessionURL: checkout_session.URL,
	}

	transaction_token, err := models.CreateCheckoutSessionToken(tracking_id)
	if err != nil {
		echo.EchoErr(err)
		response.WriteHeader(500)
		return
	}

	transaction_cookie := http.Cookie{
		Name:     app_config.TRACKING_ID_COOKIE_NAME,
		Value:    transaction_token,
		Expires:  time.Now().Add(7 * (24 * time.Hour)),
		Domain:   request.Host,
		SameSite: http.SameSiteStrictMode,
		HttpOnly: true,
		Secure:   true,
		Path:     "/",
	}

	http.SetCookie(response, &transaction_cookie)

	// Save the transaction as an orphan order(Meaning it's a 'userless' transaction)
	var orphan_order_register *models.OrphanOrder = new(models.OrphanOrder)
	orphan_order_register.OrderID = tracking_id
	orphan_order_register.CheckoutID = checkout_session.ID
	orphan_order_register.PaymentIntentID = ""
	orphan_order_register.Paid = false
	orphan_order_register.CustomerEmail = user_email
	orphan_order_register.CustomerName = user_name
	orphan_order_register.Locale = locale
	orphan_order_register.ItemsIDs = product_ids

	err = repositories.Trades.InsertOrphanOrder(request.Context(), orphan_order_register)
	if err != nil {
		echo.EchoWarn(fmt.Sprintf("Error inserting orphan order: %s", err))
	}

	response.Header().Set("Content-Type", "application/json")
	response.WriteHeader(http.StatusOK)

	err = json.NewEncoder(response).Encode(response_body)
}

func postCheckoutsHandler(response http.ResponseWriter, request *http.Request) {
	response.WriteHeader(http.StatusMethodNotAllowed)
	return
}
func patchCheckoutsHandler(response http.ResponseWriter, request *http.Request) {
	response.WriteHeader(http.StatusMethodNotAllowed)
	return
}
func deleteCheckoutsHandler(response http.ResponseWriter, request *http.Request) {
	response.WriteHeader(http.StatusMethodNotAllowed)
	return
}
func putCheckoutsHandler(response http.ResponseWriter, request *http.Request) {
	response.WriteHeader(http.StatusMethodNotAllowed)
	return
}

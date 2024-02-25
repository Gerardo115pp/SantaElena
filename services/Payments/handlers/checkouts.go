package handlers

import (
	"encoding/json"
	"fmt"
	"libery_payments_service/repositories"
	"libery_payments_service/server"
	stripe_workflows "libery_payments_service/workflows/stripe"
	"net/http"

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
	user_email := query_params.Get("user_email")
	success_url := query_params.Get("success_url")
	product_ids := query_params["product_id"]
	cancel_url := query_params.Get("cancel_url")

	if user_email == "" || success_url == "" || len(product_ids) == 0 {
		response.WriteHeader(http.StatusBadRequest)
	}

	if cancel_url == "" {
		schema := request.Header.Get("X-Forwarded-Proto")
		if schema == "" {
			schema = "https"
		}

		cancel_url = fmt.Sprintf("%s://%s/", schema, request.Host)
	}

	products, err := repositories.Products.GetProductsByID(product_ids)
	if err != nil {
		echo.EchoErr(err)
		response.WriteHeader(500)
		return
	}

	checkout_session, err := stripe_workflows.CreateCheckoutSession(products, user_email, success_url, cancel_url)
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

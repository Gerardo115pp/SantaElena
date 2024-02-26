package handlers

import (
	"encoding/json"
	"fmt"
	app_config "libery_payments_service/Config"
	"libery_payments_service/helpers"
	"libery_payments_service/repositories"
	"libery_payments_service/server"
	"libery_payments_service/workflows/email_workflows"
	stripe_workflows "libery_payments_service/workflows/stripe"
	"net/http"

	"github.com/Gerardo115pp/patriots_lib/echo"
	"github.com/stripe/stripe-go/v76"
)

func OrphanOrdersHandler(service_instance server.Server) http.HandlerFunc {
	return func(response http.ResponseWriter, request *http.Request) {
		switch request.Method {
		case http.MethodGet:
			getOrphanOrdersHandler(response, request)
		case http.MethodPost:
			postOrphanOrdersHandler(response, request)
		case http.MethodPatch:
			patchOrphanOrdersHandler(response, request)
		case http.MethodDelete:
			deleteOrphanOrdersHandler(response, request)
		case http.MethodPut:
			putOrphanOrdersHandler(response, request)
		case http.MethodOptions:
			response.WriteHeader(http.StatusOK)
		default:
			response.WriteHeader(http.StatusMethodNotAllowed)
		}
	}
}

func getOrphanOrdersHandler(response http.ResponseWriter, request *http.Request) {
	response.WriteHeader(http.StatusMethodNotAllowed)
	return
}

func postOrphanOrdersHandler(response http.ResponseWriter, request *http.Request) {
	response.WriteHeader(http.StatusMethodNotAllowed)
	return
}

func patchOrphanOrdersHandler(response http.ResponseWriter, request *http.Request) {
	var resource_requested string = request.URL.Path

	switch resource_requested {
	case "/orphan-orders/verify":
		verifyOrphanOrdersHandler(response, request)
	default:
		response.WriteHeader(http.StatusNotFound)
	}
}
func deleteOrphanOrdersHandler(response http.ResponseWriter, request *http.Request) {
	response.WriteHeader(http.StatusMethodNotAllowed)
	return
}
func putOrphanOrdersHandler(response http.ResponseWriter, request *http.Request) {
	response.WriteHeader(http.StatusMethodNotAllowed)
	return
}

// ========================================== Resource Handlers ==========================================

func verifyOrphanOrdersHandler(response http.ResponseWriter, request *http.Request) {
	verify_orphan_order_params := &struct {
		OrderID   string `json:"order_id"`
		SendEmail bool   `json:"send_email"`
	}{}

	verify_orphan_order_response := &struct {
		Paid            bool                    `json:"paid"`
		TrackingID      string                  `json:"tracking_id"`
		PaymentIntentID string                  `json:"payment_intent_id"`
		CheckoutSession *stripe.CheckoutSession `json:"checkout_session"`
	}{
		Paid: false,
	}

	err := json.NewDecoder(request.Body).Decode(verify_orphan_order_params)
	if err != nil {
		response.WriteHeader(400)
		return
	}

	if verify_orphan_order_params.OrderID == "" {
		ctx_tracking_id, err := helpers.GetStringFromContext(request.Context(), app_config.TRACKING_ID_COOKIE_NAME)
		if err != nil {
			response.WriteHeader(400)
			return
		}

		verify_orphan_order_params.OrderID = ctx_tracking_id
	}

	verify_orphan_order_response.TrackingID = verify_orphan_order_params.OrderID

	// unless explicitly set to false, send the email
	if verify_orphan_order_params.SendEmail {
		verify_orphan_order_params.SendEmail = true
	}

	orphan_order_register, err := repositories.Trades.GetOrphanOrder(request.Context(), verify_orphan_order_params.OrderID)
	if err != nil {
		response.WriteHeader(404)
		return
	}

	if orphan_order_register.Paid {
		response.WriteHeader(200)
		verify_orphan_order_response.Paid = true
		verify_orphan_order_response.PaymentIntentID = orphan_order_register.PaymentIntentID

		err = json.NewEncoder(response).Encode(verify_orphan_order_response)
		if err != nil {
			response.WriteHeader(500)
		}

		return
	}

	checkout_session, err := stripe_workflows.RetrieveSession(orphan_order_register.CheckoutID)
	if err != nil {
		response.WriteHeader(500)
		return
	}

	// Check if the order is paid
	verify_orphan_order_response.Paid = checkout_session.PaymentStatus == "paid"

	if verify_orphan_order_response.Paid != orphan_order_register.Paid {

		orphan_order_register.Paid = verify_orphan_order_response.Paid
		orphan_order_register.PaymentIntentID = checkout_session.PaymentIntent.ID
		verify_orphan_order_response.PaymentIntentID = checkout_session.PaymentIntent.ID

		err = repositories.Trades.UpdateOrphanOrder(request.Context(), orphan_order_register)
		if err != nil {
			response.WriteHeader(500)
			return
		}
	}

	if app_config.DEBUG_MODE {
		verify_orphan_order_response.CheckoutSession = checkout_session
	}

	echo.EchoDebug(fmt.Sprintf("Order: %+v", orphan_order_register))

	// Send purchase confirmation email
	if verify_orphan_order_params.SendEmail && verify_orphan_order_response.Paid {

		go func() {
			echo.EchoDebug("Sending purchase confirmation email")

			products, err := repositories.Products.GetProductsByID(orphan_order_register.ItemsIDs)
			if err != nil {
				echo.EchoErr(err)
				return
			}

			confirmation_params := email_workflows.PurchaseConfirmationEmailParams{
				Product:       products[0],
				Locale:        orphan_order_register.Locale,
				CustomerEmail: orphan_order_register.CustomerEmail,
				CustomerName:  orphan_order_register.CustomerName,
				TrackingCode:  orphan_order_register.PaymentIntentID,
			}

			err = email_workflows.SendPurchaseConfirmation(confirmation_params)
			if err != nil {
				echo.EchoErr(err)
			}
		}()

	}

	response.Header().Add("Content-Type", "application/json")
	response.WriteHeader(200)
	err = json.NewEncoder(response).Encode(verify_orphan_order_response)
	if err != nil {
		echo.EchoErr(err)
	}
}

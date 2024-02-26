package middlewares

import (
	"context"
	"fmt"
	app_config "libery_payments_service/Config"
	"libery_payments_service/models"
	"net/http"
	"strings"

	"github.com/Gerardo115pp/patriots_lib/echo"
	"github.com/golang-jwt/jwt"
)

var (
	NO_AUTH_NEEDED = map[string][]string{
		"/checkouts": {"GET"},
	}
)

func shouldCheckToken(route string, request_method string) bool {
	if request_method == "OPTIONS" {
		return false
	}

	if methods, ok := NO_AUTH_NEEDED[route]; ok {
		for _, method := range methods {
			if method == request_method {
				return false
			}
		}
	}

	return true
}

func CheckAuth(next func(response http.ResponseWriter, request *http.Request)) http.HandlerFunc {
	return func(response http.ResponseWriter, request *http.Request) {
		token := request.Header.Get("Authorization")
		if token == app_config.DOMAIN_SECRET {
			new_request := request.WithContext(context.WithValue(request.Context(), "user_id", app_config.DOMAIN_SECRET))
			next(response, new_request)
			return
		}

		if !shouldCheckToken(request.URL.Path, request.Method) {
			next(response, request)
			return
		}

		if token == "" || !strings.HasPrefix(token, "Bearer ") {
			response.Header().Add("WWW-Authenticate", "Bearer realm=\"libery_payments_service\"")
			response.WriteHeader(401)
			return
		}

		token = strings.TrimPrefix(token, "Bearer ")
		token = strings.TrimSpace(token)

		claims, err := jwt.ParseWithClaims(token, &models.CheckoutSessionToken{}, func(token *jwt.Token) (interface{}, error) {
			return []byte(app_config.JWT_SECRET), nil
		})
		if err != nil {
			response.WriteHeader(403)
			return
		}

		tracking_id := claims.Claims.(*models.CheckoutSessionToken).TrackingID

		new_request := request.WithContext(context.WithValue(request.Context(), "tracking_id", tracking_id))

		next(response, new_request)

	}
}

func CheckTrackingCookie(next func(response http.ResponseWriter, request *http.Request)) http.HandlerFunc {
	return func(response http.ResponseWriter, request *http.Request) {
		if request.Method == "OPTIONS" {
			next(response, request)
			return
		}

		cookie, err := request.Cookie(app_config.TRACKING_ID_COOKIE_NAME)
		if err != nil {
			echo.Echo(echo.RedBG, fmt.Sprintf("Error getting cookie '%s': %s", app_config.TRACKING_ID_COOKIE_NAME, err.Error()))
			response.WriteHeader(403)
			return
		}

		token := cookie.Value

		claims, err := jwt.ParseWithClaims(token, &models.CheckoutSessionToken{}, func(token *jwt.Token) (interface{}, error) {
			return []byte(app_config.JWT_SECRET), nil
		})
		if err != nil {
			echo.Echo(echo.RedBG, fmt.Sprintf("Error parsing token: %s", err.Error()))
			response.WriteHeader(403)
			return
		}

		tracking_id := claims.Claims.(*models.CheckoutSessionToken).TrackingID

		new_request := request.WithContext(context.WithValue(request.Context(), app_config.TRACKING_ID_COOKIE_NAME, tracking_id))

		next(response, new_request)
	}
}

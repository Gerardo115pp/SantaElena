package models

import (
	app_config "libery_payments_service/Config"
	"time"

	"github.com/golang-jwt/jwt"
)

type CheckoutSessionToken struct {
	jwt.StandardClaims
	TrackingID string `json:"tracking_id"`
}

func CreateCheckoutSessionToken(tracking_id string) (string, error) {
	claims := &CheckoutSessionToken{
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: time.Now().Add((time.Hour * 24) * 30).Unix(),
		},
		TrackingID: tracking_id,
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte(app_config.JWT_SECRET))
}

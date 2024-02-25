package app_config

import (
	"encoding/json"
	"fmt"
	"os"
)

// Auto-generated configuration

var DEVELOPMENT_MODE bool = false

// Loads the configuration from the environment variables

var SERVICE_PORT string = os.Getenv("SERVICE_PORT")
var SETTINGS_FILE string = os.Getenv("SETTINGS_FILE")
var OPERATION_DATA_PATH string = os.Getenv("OPERATION_DATA_PATH")
var SSL_CA_PATH string = os.Getenv("SSL_CA_PATH")
var BASE_DOMAIN string = os.Getenv("BASE_DOMAIN")
var WORDPRESS_SERVICE string = os.Getenv("WORDPRESS_SERVICE")

// --------Settings--------

var service_settings map[string]any = make(map[string]any)
var STRIPE_SECRET_KEY string
var STRIPE_CURRENCY string
var USE_WORDPRESS bool = false
var WORDPRESS_URL string
var WP_PRODUCTS_SUFFIX string = "products"

func VerifyConfig() {

	if SERVICE_PORT == "" {
		panic("SERVICE PORT environment variable is required")
	}

	if OPERATION_DATA_PATH == "" {
		panic("OPERATION_DATA_PATH environment variable is required")
	}

	if SSL_CA_PATH != "" {
		DEVELOPMENT_MODE = true
	}

	if BASE_DOMAIN == "" {
		panic("BASE_DOMAIN environment variable is required")
	}

	if SETTINGS_FILE == "" {
		SETTINGS_FILE = "settings.json"
	}

	err := loadSettings()
	if err != nil {
		panic(fmt.Sprintf("Error loading settings file: %s", err.Error()))
	}

	if WORDPRESS_SERVICE == "" && USE_WORDPRESS {
		panic("WORDPRESS_SERVICE environment variable is required")
	}
}

func loadSettings() error {
	// Load settings from file
	var settings_path string = fmt.Sprintf("%s/%s", OPERATION_DATA_PATH, SETTINGS_FILE)
	var err error

	if _, err = os.Stat(settings_path); os.IsNotExist(err) {
		return fmt.Errorf("Settings file<%s> not found", settings_path)
	}

	var setting_content []byte

	setting_content, err = os.ReadFile(settings_path)

	var settings map[string]any = make(map[string]any)

	err = json.Unmarshal(setting_content, &settings)
	if err != nil {
		return fmt.Errorf("While unmarshaling settings data, found error <%s>", err.Error())
	}

	service_settings = settings

	stripe_sk, exists := service_settings["stripe_sk"]
	if !exists {
		return fmt.Errorf("stripe_sk not found in settings")
	}

	STRIPE_SECRET_KEY = stripe_sk.(string)

	if stripe_currency, exists := service_settings["stripe_currency"]; exists {
		STRIPE_CURRENCY = stripe_currency.(string)
	} else {
		return fmt.Errorf("stripe_currency not found in settings")
	}

	if use_wp, exists := service_settings["use_wordpress_products"]; exists {
		USE_WORDPRESS = use_wp.(bool)
	}

	if wp_products_suffix, exists := service_settings["wordpress_products_suffix"]; exists {
		WP_PRODUCTS_SUFFIX = wp_products_suffix.(string)
	} else {
		return fmt.Errorf("wordpress_products_suffix not found in settings")
	}

	return nil
}

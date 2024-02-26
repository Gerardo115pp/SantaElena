package app_config

import (
	"encoding/json"
	"fmt"
	"os"
	"path"
)

type emailConfig struct {
	MailUsername string `json:"mail_username"`
	MailPassword string `json:"mail_password"`
	MailServer   string `json:"mail_server"`
	MailPort     string `json:"mail_port"`
	MailFrom     string `json:"mail_from"`
}

// Auto-generated configuration

var DEVELOPMENT_MODE bool = false
var DEBUG_MODE bool = false
var TRADES_DB string

// Cookies names

var TRACKING_ID_COOKIE_NAME string = "tracking_id"

// Loads the configuration from the environment variables

var SERVICE_PORT string = os.Getenv("SERVICE_PORT")
var SETTINGS_FILE string = os.Getenv("SETTINGS_FILE")
var OPERATION_DATA_PATH string = os.Getenv("OPERATION_DATA_PATH")
var EMAIL_TEMPLATE_PATH string = os.Getenv("EMAIL_TEMPLATE_PATH")
var DATABASE_SCHEMAS_PATH string = os.Getenv("DATABASE_SCHEMAS_PATH")
var DATABASE_DIRECTORY string = os.Getenv("DATABASE_DIRECTORY")
var TRADES_SCHEMA_FILE string = os.Getenv("STRIPE_SCHEMA_FILE")
var BASE_DOMAIN string = os.Getenv("BASE_DOMAIN")
var WORDPRESS_SERVICE string = os.Getenv("WORDPRESS_SERVICE")
var SSL_CA_PATH string = os.Getenv("SSL_CA_PATH")
var JWT_SECRET string = os.Getenv("JWT_SECRET")
var DOMAIN_SECRET string = os.Getenv("DOMAIN_SECRET")

// --------Settings--------

var service_settings map[string]any = make(map[string]any)
var STRIPE_SECRET_KEY string
var STRIPE_CURRENCY string
var USE_WORDPRESS bool = false
var WORDPRESS_URL string
var WP_PRODUCTS_SUFFIX string = "products"
var EMAIL_CONFIG *emailConfig

func VerifyConfig() {

	if SERVICE_PORT == "" {
		panic("SERVICE PORT environment variable is required")
	}

	if OPERATION_DATA_PATH == "" {
		panic("OPERATION_DATA_PATH environment variable is required")
	}

	if EMAIL_TEMPLATE_PATH == "" {
		EMAIL_TEMPLATE_PATH = path.Join(OPERATION_DATA_PATH, "email")
	}

	if DATABASE_SCHEMAS_PATH == "" {
		DATABASE_SCHEMAS_PATH = path.Join(OPERATION_DATA_PATH, "schemas")
	}

	if TRADES_SCHEMA_FILE == "" {
		TRADES_SCHEMA_FILE = path.Join(DATABASE_SCHEMAS_PATH, "trades.sql")
	}

	if DATABASE_DIRECTORY == "" {
		DATABASE_DIRECTORY = path.Join(OPERATION_DATA_PATH, "databases")
	}

	TRADES_DB = path.Join(DATABASE_DIRECTORY, "stripe.db")

	if SSL_CA_PATH != "" {
		DEVELOPMENT_MODE = true
	}

	var debug_mode_requested string = os.Getenv("EDEBUG")
	if debug_mode_requested == "1" && DEVELOPMENT_MODE {
		DEBUG_MODE = true
	}

	if BASE_DOMAIN == "" {
		panic("BASE_DOMAIN environment variable is required")
	}

	if JWT_SECRET == "" {
		panic("JWT_SECRET environment variable is required")
	}

	if DOMAIN_SECRET == "" {
		panic("DOMAIN_SECRET environment variable is required")
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

	// overwrite the cookie names
	if tracking_id_cookie_name := os.Getenv("TRACKING_ID_COOKIE_NAME"); tracking_id_cookie_name != "" {
		TRACKING_ID_COOKIE_NAME = tracking_id_cookie_name
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

	// Load email configuration
	email_config, exists := service_settings["email_config"]
	if !exists {
		return fmt.Errorf("email_config not found in settings")
	}

	EMAIL_CONFIG = &emailConfig{
		MailUsername: email_config.(map[string]any)["mail_username"].(string),
		MailPassword: email_config.(map[string]any)["mail_password"].(string),
		MailServer:   email_config.(map[string]any)["mail_server"].(string),
		MailPort:     email_config.(map[string]any)["mail_port"].(string),
		MailFrom:     email_config.(map[string]any)["mail_from"].(string),
	}

	return err
}

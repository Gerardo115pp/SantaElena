package app_config

import (
	"encoding/json"
	"fmt"
	"os"
) // Loads the configuration from the environment variables

var SERVICE_PORT string = os.Getenv("SERVICE_PORT")
var SETTINGS_FILE string = os.Getenv("SETTINGS_FILE")
var OPERATION_DATA_PATH string = os.Getenv("OPERATION_DATA_PATH")

// --------Settings--------

var service_settings map[string]any = make(map[string]any)

var database_default_engine string = "sqlite"
var DATABASE_ENGINE string = database_default_engine
var DATABASE_SCHEMA_FILE string
var DATABASE_CONTENT_FILE string

func VerifyConfig() {

	if SERVICE_PORT == "" {
		panic("SERVICE PORT environment variable is required")
	}

	if OPERATION_DATA_PATH == "" {
		panic("OPERATION_DATA_PATH environment variable is required")
	}

	if SETTINGS_FILE == "" {
		SETTINGS_FILE = "settings.json"
	}

	err := loadSettings()
	if err != nil {
		panic(fmt.Sprintf("Error loading settings file: %s", err.Error()))
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

	if _, exists := service_settings["database_engine"]; exists {
		DATABASE_ENGINE = service_settings["database_engine"].(string)
	}

	if _, exists := service_settings["database_schema_file"]; exists {
		DATABASE_SCHEMA_FILE = service_settings["database_schema_file"].(string)
	}

	if _, exists := service_settings["database_content_file"]; exists {
		DATABASE_CONTENT_FILE = service_settings["database_content_file"].(string)
	}

	return nil
}

package databases

import (
	"database/sql"
	"fmt"
	app_config "libery_payments_service/Config"
	"libery_payments_service/helpers"
	"os"
	"strings"

	"github.com/Gerardo115pp/patriots_lib/echo"
	_ "github.com/mattn/go-sqlite3"
)

func getSchema(filename string) (string, error) {
	if !helpers.FileExists(filename) {
		return "", fmt.Errorf("Schema directory or files not found at %s", filename)
	}

	schema, err := os.ReadFile(filename)
	if err != nil {
		return "", fmt.Errorf("Error reading schema file: %s", err.Error())
	}

	return string(schema), nil
}

func openTradesSQLiteDB() (*sql.DB, error) {
	var err error

	var databases_directory string = app_config.DATABASE_DIRECTORY
	var trades_db_file string = app_config.TRADES_DB

	var database_exists bool = helpers.FileExists(trades_db_file)

	if !database_exists {

		if !helpers.FileExists(databases_directory) {
			err = os.MkdirAll(databases_directory, 0777)
			if err != nil {
				return nil, fmt.Errorf("Error creating databases directory: %s", err.Error())
			}
		}

		db_file, err := os.OpenFile(trades_db_file, os.O_CREATE, 0777)
		if err != nil {
			return nil, fmt.Errorf("Error creating database file: %s", err.Error())
		}

		db_file.Close()
	}

	db, err := sql.Open("sqlite3", trades_db_file)
	if err != nil {
		return nil, fmt.Errorf("Error opening database: %s", err.Error())
	}

	if !database_exists {
		echo.EchoDebug(fmt.Sprintf("Creating database schema and initial content: %s", trades_db_file))

		var trades_schema_file string = app_config.TRADES_SCHEMA_FILE

		echo.EchoDebug(fmt.Sprintf("Using schema file: %s", trades_schema_file))

		err = writeSchema(db, trades_schema_file)
		if err != nil {
			return nil, fmt.Errorf("Error writing schema: %s", err.Error())
		}

	}

	return db, nil
}

func writeSchema(db *sql.DB, filename string) error {
	if db == nil {
		echo.EchoFatal(fmt.Errorf("trying to write schema to nil database"))
	}

	schema, err := getSchema(filename)
	if err != nil {
		return err
	}

	commands := strings.Split(schema, ";")

	tx, err := db.Begin()
	if err != nil {
		return fmt.Errorf("Error starting transaction: %s", err.Error())
	}

	for _, command := range commands {
		cmd := strings.TrimSpace(command)

		if cmd == "" || strings.HasPrefix(cmd, "--") {
			continue
		}

		echo.Echo(echo.BlueFG, fmt.Sprintf("Executing command: %s", cmd))

		if _, err := tx.Exec(cmd); err != nil {
			tx.Rollback()
			return fmt.Errorf("Error executing command: %s", err.Error())
		}
	}

	return tx.Commit()
}

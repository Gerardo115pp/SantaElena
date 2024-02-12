package main

import (
	"context"
	"fmt"
	app_config "libery_txy_content_service/Config"
	"libery_txy_content_service/database"
	"libery_txy_content_service/handlers"
	"libery_txy_content_service/repository"
	"libery_txy_content_service/server"

	"github.com/Gerardo115pp/patriot_router"
	"github.com/Gerardo115pp/patriots_lib/echo"
)

func setRepositories() {
	var content_database_implementation repository.ContentRepository
	var err error = fmt.Errorf("Couldn't find a database implementation for engine: %s", app_config.DATABASE_ENGINE)

	if app_config.DATABASE_ENGINE == "sqlite" {

		echo.Echo(echo.GreenFG, "Using sqlite database")

		content_database_implementation, err = database.NewContentSQLiteDB()
		if err != nil {
			echo.Echo(echo.RedFG, "Error creating sqlite database")
			echo.EchoFatal(err)
		}
	} else {
		echo.EchoFatal(err)
	}

	repository.SetContentRepository(content_database_implementation)
}

func BinderRoutes(server server.Server, router *patriot_router.Router) {
	router.RegisterRoute(patriot_router.NewRoute("/alive", true), handlers.AliveHandler(server))
	router.RegisterRoute(patriot_router.NewRoute("/content/attributes", true), handlers.ContentAttributesHandler(server))
	router.RegisterRoute(patriot_router.NewRoute("/pages-content", true), handlers.PageContentHandler(server))
	router.RegisterRoute(patriot_router.NewRoute("/pages", true), handlers.PagesHandler(server))
	router.RegisterRoute(patriot_router.NewRoute("/locales(/.+)?$", false), handlers.LocalesHandler(server))
}

func main() {
	echo.Echo(echo.GreenFG, "Starting txy_content_service")
	app_config.VerifyConfig()

	var new_server_config *server.ServerConfig = new(server.ServerConfig)
	new_server_config.Port = app_config.SERVICE_PORT

	echo.EchoDebug(fmt.Sprintf("server config: %+v", new_server_config))

	setRepositories() // if any repository is not set, the server will panic

	server, err := server.NewBroker(context.Background(), new_server_config)
	if err != nil {
		echo.EchoFatal(err)
	}

	server.Run(BinderRoutes)
}

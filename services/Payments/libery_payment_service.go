package main

import (
	"context"
	"fmt"
	app_config "libery_payments_service/Config"
	"libery_payments_service/databases"
	"libery_payments_service/handlers"
	"libery_payments_service/middlewares"
	"libery_payments_service/repositories"
	"libery_payments_service/server"

	"github.com/Gerardo115pp/patriot_router"
	"github.com/Gerardo115pp/patriots_lib/echo"
)

func BinderRoutes(server server.Server, router *patriot_router.Router) {
	router.RegisterRoute(patriot_router.NewRoute("/alive", true), handlers.AliveHandler(server))
	router.RegisterRoute(patriot_router.NewRoute("/checkouts", true), handlers.CheckoutsHandler(server))
	router.RegisterRoute(patriot_router.NewRoute("/orphan-orders(/.+)?$", false), middlewares.CheckTrackingCookie(handlers.OrphanOrdersHandler(server)))
}

func setRepositories() {
	var products_implementation repositories.ProductsRepository
	var trades_implementation repositories.TradesRepository

	if app_config.USE_WORDPRESS {
		products_implementation = databases.NewWpProductsConn()
	} else {
		echo.EchoFatal(fmt.Errorf("No valid products database engine was set"))
	}

	trades_implementation, err := databases.NewTradesSQLiteDB()
	if err != nil {
		echo.EchoFatal(err)
	}

	repositories.SetProductsRepository(products_implementation)
	repositories.SetTradesRepository(trades_implementation)
}

func main() {
	app_config.VerifyConfig()

	echo.Echo(echo.GreenFG, "Starting payments_service")

	var new_server_config *server.ServerConfig = new(server.ServerConfig)
	new_server_config.Port = app_config.SERVICE_PORT

	echo.EchoDebug(fmt.Sprintf("server config: %+v", new_server_config))

	setRepositories()

	server, err := server.NewBroker(context.Background(), new_server_config)
	if err != nil {
		echo.EchoFatal(err)
	}

	server.Run(BinderRoutes)
}

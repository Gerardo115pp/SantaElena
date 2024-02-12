package handlers

import (
	"encoding/json"
	"fmt"
	"libery_txy_content_service/repository"
	"libery_txy_content_service/server"
	"net/http"

	"github.com/Gerardo115pp/patriots_lib/echo"
)

func PageContentHandler(service_instance server.Server) http.HandlerFunc {
	return func(response http.ResponseWriter, request *http.Request) {
		switch request.Method {
		case http.MethodGet:
			getPageContentHandler(response, request)
		case http.MethodPost:
			postPageContentHandler(response, request)
		case http.MethodPatch:
			patchPageContentHandler(response, request)
		case http.MethodDelete:
			deletePageContentHandler(response, request)
		case http.MethodPut:
			putPageContentHandler(response, request)
		case http.MethodOptions:
			response.WriteHeader(http.StatusOK)
		default:
			response.WriteHeader(http.StatusMethodNotAllowed)
		}
	}
}

func getPageContentHandler(response http.ResponseWriter, request *http.Request) {
	var page_id string = request.URL.Query().Get("page_id")
	var page_locale string = request.URL.Query().Get("locale")

	if page_id == "" || page_locale == "" {
		echo.Echo(echo.RedBG, "page_id or locale is empty")
		response.WriteHeader(400)
		return
	}

	page_content, err := repository.PagesContent.GetPageContent(request.Context(), page_id, page_locale)
	if err != nil {
		echo.Echo(echo.RedBG, fmt.Sprintf("Error while getting page content: %v", err))
		response.WriteHeader(500)
		return
	}

	response.Header().Set("Content-Type", "application/json")
	response.WriteHeader(200)

	json.NewEncoder(response).Encode(page_content)
}

func postPageContentHandler(response http.ResponseWriter, request *http.Request) {
	response.WriteHeader(http.StatusMethodNotAllowed)
	return
}
func patchPageContentHandler(response http.ResponseWriter, request *http.Request) {
	response.WriteHeader(http.StatusMethodNotAllowed)
	return
}
func deletePageContentHandler(response http.ResponseWriter, request *http.Request) {
	response.WriteHeader(http.StatusMethodNotAllowed)
	return
}
func putPageContentHandler(response http.ResponseWriter, request *http.Request) {
	response.WriteHeader(http.StatusMethodNotAllowed)
	return
}

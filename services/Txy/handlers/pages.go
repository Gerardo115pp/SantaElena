package handlers

import (
	"encoding/json"
	"libery_txy_content_service/repository"
	"libery_txy_content_service/server"
	"net/http"

	"github.com/Gerardo115pp/patriots_lib/echo"
)

func PagesHandler(service_instance server.Server) http.HandlerFunc {
	return func(response http.ResponseWriter, request *http.Request) {
		switch request.Method {
		case http.MethodGet:
			getPagesHandler(response, request)
		case http.MethodPost:
			postPagesHandler(response, request)
		case http.MethodPatch:
			patchPagesHandler(response, request)
		case http.MethodDelete:
			deletePagesHandler(response, request)
		case http.MethodPut:
			putPagesHandler(response, request)
		case http.MethodOptions:
			response.WriteHeader(http.StatusOK)
		default:
			response.WriteHeader(http.StatusMethodNotAllowed)
		}
	}
}

func getPagesHandler(response http.ResponseWriter, request *http.Request) {
	available_pages, err := repository.PagesContent.GetPages(request.Context())
	if err != nil {
		response.WriteHeader(500)
		return
	}

	response.Header().Set("Content-Type", "application/json")
	response.WriteHeader(200)

	json.NewEncoder(response).Encode(available_pages)
}

func postPagesHandler(response http.ResponseWriter, request *http.Request) {
	new_page_request := &struct {
		PageID   string `json:"page_id"`
		PageName string `json:"page_name"`
	}{}

	err := json.NewDecoder(request.Body).Decode(new_page_request)
	if err != nil {
		response.WriteHeader(400)
		return
	}

	if new_page_request.PageID == "" || new_page_request.PageName == "" {
		echo.Echo(echo.RedBG, "PageID or PageName is empty")
		response.WriteHeader(400)
		return
	}

	err = repository.PagesContent.AddPage(request.Context(), new_page_request.PageID, new_page_request.PageName, nil)
	if err != nil {
		response.WriteHeader(500)
		return
	}

	response.WriteHeader(201)
}

func patchPagesHandler(response http.ResponseWriter, request *http.Request) {
	response.WriteHeader(http.StatusMethodNotAllowed)
	return
}

func deletePagesHandler(response http.ResponseWriter, request *http.Request) {
	response.WriteHeader(http.StatusMethodNotAllowed)
	return
}

func putPagesHandler(response http.ResponseWriter, request *http.Request) {
	response.WriteHeader(http.StatusMethodNotAllowed)
	return
}

package handlers

import (
	"encoding/json"
	"libery_txy_content_service/repository"
	"libery_txy_content_service/server"
	"net/http"
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
	response.WriteHeader(http.StatusMethodNotAllowed)
	return
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

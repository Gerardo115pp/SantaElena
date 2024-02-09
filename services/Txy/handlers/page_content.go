package handlers

import (
	"libery_txy_content_service/server"
	"net/http"
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
		response.WriteHeader(400)
		return
	}
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

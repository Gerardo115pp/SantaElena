package handlers

import (
	"encoding/json"
	"libery_txy_content_service/models"
	"libery_txy_content_service/server"
	"net/http"
)

func ContentAttributesHandler(service_instance server.Server) http.HandlerFunc {
	return func(response http.ResponseWriter, request *http.Request) {
		switch request.Method {
		case http.MethodGet:
			getContentAttributesHandler(response, request)
		case http.MethodPost:
			postContentAttributesHandler(response, request)
		case http.MethodPatch:
			patchContentAttributesHandler(response, request)
		case http.MethodDelete:
			deleteContentAttributesHandler(response, request)
		case http.MethodPut:
			putContentAttributesHandler(response, request)
		case http.MethodOptions:
			response.WriteHeader(http.StatusOK)
		default:
			response.WriteHeader(http.StatusMethodNotAllowed)
		}
	}
}
func getContentAttributesHandler(response http.ResponseWriter, request *http.Request) {
	response.Header().Set("Content-Type", "application/json")
	response.WriteHeader(200)
	json.NewEncoder(response).Encode(models.ContentEntryAttributes)
}
func postContentAttributesHandler(response http.ResponseWriter, request *http.Request) {
	response.WriteHeader(http.StatusMethodNotAllowed)
	return
}
func patchContentAttributesHandler(response http.ResponseWriter, request *http.Request) {
	response.WriteHeader(http.StatusMethodNotAllowed)
	return
}
func deleteContentAttributesHandler(response http.ResponseWriter, request *http.Request) {
	response.WriteHeader(http.StatusMethodNotAllowed)
	return
}
func putContentAttributesHandler(response http.ResponseWriter, request *http.Request) {
	response.WriteHeader(http.StatusMethodNotAllowed)
	return
}

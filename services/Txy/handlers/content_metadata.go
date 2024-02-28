package handlers

import (
	"encoding/json"
	"libery_txy_content_service/models"
	"libery_txy_content_service/server"
	"net/http"
)

func ContentMetadataHandler(service_instance server.Server) http.HandlerFunc {
	return func(response http.ResponseWriter, request *http.Request) {
		switch request.Method {
		case http.MethodGet:
			getContentMetadataHandler(response, request)
		case http.MethodPost:
			postContentMetadataHandler(response, request)
		case http.MethodPatch:
			patchContentMetadataHandler(response, request)
		case http.MethodDelete:
			deleteContentMetadataHandler(response, request)
		case http.MethodPut:
			putContentMetadataHandler(response, request)
		case http.MethodOptions:
			response.WriteHeader(http.StatusOK)
		default:
			response.WriteHeader(http.StatusMethodNotAllowed)
		}
	}
}

func getContentMetadataHandler(response http.ResponseWriter, request *http.Request) {
	var resource string = request.URL.Path

	switch resource {
	case "/content-metadata/attributes":
		getContentAttributesHandler(response, request)
		return
	case "/content-metadata/types":
		getContentTypesHandler(response, request)
		return
	default:
		response.WriteHeader(http.StatusNotFound)
		return
	}
}

func getContentAttributesHandler(response http.ResponseWriter, request *http.Request) {
	response.Header().Set("Content-Type", "application/json")
	response.WriteHeader(200)
	json.NewEncoder(response).Encode(models.ContentEntryAttributes)
}

func getContentTypesHandler(response http.ResponseWriter, request *http.Request) {
	response.Header().Set("Content-Type", "application/json")
	response.WriteHeader(200)
	json.NewEncoder(response).Encode(models.ContentEntryTypes)
}

func postContentMetadataHandler(response http.ResponseWriter, request *http.Request) {
	response.WriteHeader(http.StatusMethodNotAllowed)
	return
}
func patchContentMetadataHandler(response http.ResponseWriter, request *http.Request) {
	response.WriteHeader(http.StatusMethodNotAllowed)
	return
}
func deleteContentMetadataHandler(response http.ResponseWriter, request *http.Request) {
	response.WriteHeader(http.StatusMethodNotAllowed)
	return
}
func putContentMetadataHandler(response http.ResponseWriter, request *http.Request) {
	response.WriteHeader(http.StatusMethodNotAllowed)
	return
}

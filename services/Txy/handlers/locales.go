package handlers

import (
	"encoding/json"
	"fmt"
	"libery_txy_content_service/repository"
	"libery_txy_content_service/server"
	"net/http"

	"github.com/Gerardo115pp/patriots_lib/echo"
)

func LocalesHandler(service_instance server.Server) http.HandlerFunc {
	return func(response http.ResponseWriter, request *http.Request) {
		switch request.Method {
		case http.MethodGet:
			getLocalesHandler(response, request)
		case http.MethodPost:
			postLocalesHandler(response, request)
		case http.MethodPatch:
			patchLocalesHandler(response, request)
		case http.MethodDelete:
			deleteLocalesHandler(response, request)
		case http.MethodPut:
			putLocalesHandler(response, request)
		case http.MethodOptions:
			response.WriteHeader(http.StatusOK)
		default:
			response.WriteHeader(http.StatusMethodNotAllowed)
		}
	}
}

func getLocalesHandler(response http.ResponseWriter, request *http.Request) {
	var resource string = request.URL.Path

	switch resource {
	case "/locales/pages":
		response.Header().Add("Location", "/locales/available")
		response.WriteHeader(301)
	case "/locales/available":
		getAvailableLocalesHandler(response, request)
		return
	default:
		echo.Echo(echo.RedFG, "Resource not found: "+resource)
		response.WriteHeader(404)
		return
	}
}

/*
Deprecated: This function is deprecated in favor of getAvailableLocalesHandler. this is because all the
pages in a txy site should have the same locales available
*/
func getLocalesPagesHandler(response http.ResponseWriter, request *http.Request) {
	echo.Echo(echo.GreenFG, "Getting locales for pages")
	var page_id string = request.URL.Query().Get("page_id")
	if page_id == "" {
		response.WriteHeader(400)
		return
	}

	var locales []string

	locales, err := repository.PagesContent.GetPageLocales(request.Context(), page_id)
	if err != nil {
		response.WriteHeader(500)
		return
	}

	echo.Echo(echo.GreenFG, fmt.Sprintf("Locales for page %s: %v", page_id, locales))

	response.Header().Add("Content-Type", "application/json")
	response.Header().Add("Cache-Control", "max-age=600") // 10 minutes, in production this should be a lot more
	response.WriteHeader(200)

	json.NewEncoder(response).Encode(locales)
}

func getAvailableLocalesHandler(response http.ResponseWriter, request *http.Request) {
	var locales []string

	locales, err := repository.PagesContent.GetLocales(request.Context())
	if err != nil {
		response.WriteHeader(500)
		return
	}

	// catch the response for 3 days
	response.Header().Add("Content-Type", "application/json")
	response.Header().Add("Cache-Control", "max-age=259200") // 3 days
	response.WriteHeader(200)

	json.NewEncoder(response).Encode(locales)
}

func postLocalesHandler(response http.ResponseWriter, request *http.Request) {
	new_locale_request := &struct {
		Locale string `json:"locale"`
	}{}

	err := json.NewDecoder(request.Body).Decode(new_locale_request)
	if err != nil {
		response.WriteHeader(400)
		return
	}

	err = repository.PagesContent.AddLocale(request.Context(), new_locale_request.Locale)
	if err != nil {
		echo.Echo(echo.RedFG, fmt.Sprintf("Error adding locale: %s", err.Error()))
		response.WriteHeader(500)
		return
	}

	response.WriteHeader(201)
}

func patchLocalesHandler(response http.ResponseWriter, request *http.Request) {
	response.WriteHeader(http.StatusMethodNotAllowed)
	return
}
func deleteLocalesHandler(response http.ResponseWriter, request *http.Request) {
	response.WriteHeader(http.StatusMethodNotAllowed)
	return
}
func putLocalesHandler(response http.ResponseWriter, request *http.Request) {
	response.WriteHeader(http.StatusMethodNotAllowed)
	return
}

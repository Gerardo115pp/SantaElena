package handlers

import (
	"encoding/json"
	"fmt"
	"libery_txy_content_service/models"
	"libery_txy_content_service/repository"
	"libery_txy_content_service/server"
	"net/http"
	"time"

	"github.com/Gerardo115pp/patriots_lib/echo"
)

// Used mainly to request current configurations so they can be boundled in txy applications and be used as fallbacks
// this is good for SEO and first rendering time.
func FallbackHandler(service_instance server.Server) http.HandlerFunc {
	return func(response http.ResponseWriter, request *http.Request) {
		switch request.Method {
		case http.MethodGet:
			getFallbackHandler(response, request)
		case http.MethodPost:
			postFallbackHandler(response, request)
		case http.MethodPatch:
			patchFallbackHandler(response, request)
		case http.MethodDelete:
			deleteFallbackHandler(response, request)
		case http.MethodPut:
			putFallbackHandler(response, request)
		case http.MethodOptions:
			response.WriteHeader(http.StatusOK)
		default:
			response.WriteHeader(http.StatusMethodNotAllowed)
		}
	}
}

func getFallbackHandler(response http.ResponseWriter, request *http.Request) {
	start_time := time.Now()

	var pages_fallbacks map[string]models.PageContent = make(map[string]models.PageContent, 0)
	var pages_metadata []models.PageMetadata = make([]models.PageMetadata, 0)
	var page_content *models.PageContent
	var page_locales []string
	var err error

	pages_metadata, err = repository.PagesContent.GetPages(request.Context())
	if err != nil {
		echo.Echo(echo.RedFG, fmt.Sprintf("Error getting pages: %s", err.Error()))
		response.WriteHeader(500)
		return
	}

	page_locales, err = repository.PagesContent.GetLocales(request.Context())

	for _, page := range pages_metadata {
		for _, locale := range page_locales {
			page_content, err = repository.PagesContent.GetPageContent(request.Context(), page.PageID, locale)
			if err != nil {
				echo.Echo(echo.RedFG, fmt.Sprintf("Error getting page content: %s", err.Error()))
				response.WriteHeader(500)
				return
			}

			if _, exists := pages_fallbacks[page.PageID]; !exists {
				pages_fallbacks[page.PageID] = *page_content
			}

			pages_fallbacks[page.PageID].LocalesContent[locale] = page_content.LocalesContent[locale]
		}
	}

	response.Header().Set("Content-Type", "application/json")
	response.WriteHeader(200)

	json.NewEncoder(response).Encode(pages_fallbacks)

	elapsed_time := time.Since(start_time)

	echo.Echo(echo.GreenFG, fmt.Sprintf("Fallbacks served in %s", elapsed_time.String()))

	return
}
func postFallbackHandler(response http.ResponseWriter, request *http.Request) {
	response.WriteHeader(http.StatusMethodNotAllowed)
	return
}
func patchFallbackHandler(response http.ResponseWriter, request *http.Request) {
	response.WriteHeader(http.StatusMethodNotAllowed)
	return
}
func deleteFallbackHandler(response http.ResponseWriter, request *http.Request) {
	response.WriteHeader(http.StatusMethodNotAllowed)
	return
}
func putFallbackHandler(response http.ResponseWriter, request *http.Request) {
	response.WriteHeader(http.StatusMethodNotAllowed)
	return
}

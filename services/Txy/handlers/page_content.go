package handlers

import (
	"context"
	"encoding/json"
	"fmt"
	app_config "libery_txy_content_service/Config"
	"libery_txy_content_service/models"
	"libery_txy_content_service/repository"
	"libery_txy_content_service/server"
	"net/http"

	"github.com/Gerardo115pp/patriots_lib/echo"
)

type PageContentUpdatedResponse struct {
	ContentHash string `json:"content_hash"`
}

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
	var resource string = request.URL.Path

	switch resource {
	case "/pages-content":
		getAllPageContentHandler(response, request)
		return
	case "/pages-content/entry":
		getPageContentEntryHandler(response, request)
		return
	default:
		echo.Echo(echo.RedBG, fmt.Sprintf("Resource not found: %s", resource))
		response.WriteHeader(404)
		return
	}

}

func getAllPageContentHandler(response http.ResponseWriter, request *http.Request) {
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

	page_content.CalculateHash()

	response.Header().Set("Content-Type", "application/json")
	response.WriteHeader(200)

	json.NewEncoder(response).Encode(page_content)
}

func getPageContentEntryHandler(response http.ResponseWriter, request *http.Request) {
	var entry_id string = request.URL.Query().Get("entry_id")
	var locale string = request.URL.Query().Get("locale")
	var content_hash string = request.URL.Query().Get("content_hash")

	if entry_id == "" || locale == "" {
		echo.Echo(echo.RedBG, "entry_id or locale is empty")
		response.WriteHeader(400)
		return
	}

	content_entry, err := repository.PagesContent.GetContentEntry(request.Context(), entry_id, locale)
	if err != nil {
		echo.Echo(echo.RedBG, fmt.Sprintf("Error while getting content entry: %s", err))
		response.WriteHeader(500)
		return
	}

	var valid_hash bool = content_entry.ContentHash == content_hash

	if !valid_hash {
		response.Header().Set("Content-Type", "application/json")
		response.WriteHeader(200)

		json.NewEncoder(response).Encode(content_entry)
	} else {
		response.WriteHeader(304)
		return
	}
}

func postPageContentHandler(response http.ResponseWriter, request *http.Request) {
	var resource string = request.URL.Path

	switch resource {
	case "/pages-content/section":
		addPageSectionHandler(response, request)
		return
	case "/pages-content/entry":
		addContentEntryHandler(response, request)
		return
	default:
		echo.Echo(echo.RedBG, fmt.Sprintf("Resource not found: %s", resource))
		response.WriteHeader(404)
		return
	}
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
	var resource string = request.URL.Path

	switch resource {
	case "/pages-content/entry":
		updateContentEntryHandler(response, request)
		return
	default:
		echo.Echo(echo.RedBG, fmt.Sprintf("Resource not found: %s", resource))
		response.WriteHeader(404)
		return
	}
}

func updateContentEntryHandler(response http.ResponseWriter, request *http.Request) {
	var new_content_entry *models.ContentEntry = new(models.ContentEntry)

	err := json.NewDecoder(request.Body).Decode(new_content_entry)
	if err != nil {
		echo.Echo(echo.RedBG, fmt.Sprintf("Error while decoding request: %s", err))
		response.WriteHeader(400)
		return
	}

	new_content_entry.UpdateContentHash() // Necessary step so the frontend can know it needs to pull the new content

	err = repository.PagesContent.UpdateContentEntry(request.Context(), new_content_entry)
	if err != nil {
		echo.Echo(echo.RedBG, fmt.Sprintf("Error while updating content entry: %v", err))
		response.WriteHeader(500)
		return
	}

	err = repository.PagesContent.UpdateContentEntryContent(request.Context(), new_content_entry, nil)
	if err != nil {
		echo.Echo(echo.RedBG, fmt.Sprintf("Error while updating content entry content: %v", err))
		response.WriteHeader(500)
		return
	}

	response.WriteHeader(200)
}

func getPageUpdatedResponse(ctx context.Context, page_id string) (*PageContentUpdatedResponse, error) {
	locales, err := repository.PagesContent.GetLocales(ctx)
	if err != nil {
		return nil, err
	}

	existing_locale := app_config.INITIAL_LOCALE // we need a locale to get the page content but we don't care which one, just that it exists. because pages must have the same content for all locales

	if locales != nil && len(locales) > 0 {
		existing_locale = locales[0]
	}

	// We need to get the page content to calculate the hash that is send back to the client
	page_content, err := repository.PagesContent.GetPageContent(ctx, page_id, existing_locale)
	if err != nil {
		return nil, err
	}

	page_content.CalculateHash()

	new_content_entry_response := &PageContentUpdatedResponse{
		ContentHash: page_content.ContentHash,
	}

	return new_content_entry_response, nil
}

// ----- Resource handlers -----

func addPageSectionHandler(response http.ResponseWriter, request *http.Request) {
	new_section_request := &struct {
		SectionID   string `json:"section_id"`
		SectionName string `json:"section_name"`
		PageID      string `json:"page_id"`
	}{}

	err := json.NewDecoder(request.Body).Decode(new_section_request)
	if err != nil {
		echo.Echo(echo.RedBG, fmt.Sprintf("Error while decoding request: %s", err))
		response.WriteHeader(400)
		return
	}

	if new_section_request.SectionID == "" || new_section_request.SectionName == "" || new_section_request.PageID == "" {
		echo.Echo(echo.RedBG, "SectionID, SectionName or PageID is empty")
		response.WriteHeader(400)
		return
	}

	err = repository.PagesContent.AddSection(request.Context(), new_section_request.SectionID, new_section_request.SectionName, new_section_request.PageID, nil)
	if err != nil {
		echo.Echo(echo.RedBG, fmt.Sprintf("Error while adding section: %v", err))
		response.WriteHeader(500)
		return
	}

	response_body, err := getPageUpdatedResponse(request.Context(), new_section_request.PageID)
	if err != nil {
		echo.Echo(echo.RedBG, fmt.Sprintf("Error while getting page updated response: %v", err))
		response.WriteHeader(500)
		return
	}

	response.Header().Add("Content-Type", "application/json")
	response.WriteHeader(201)
	json.NewEncoder(response).Encode(response_body)
}

func addContentEntryHandler(response http.ResponseWriter, request *http.Request) {
	new_content_entry_request := &struct {
		EntityID    string `json:"entry_id"`
		Name        string `json:"name"`
		ContentType string `json:"content_type"`
		SectionID   string `json:"section_id"`
		PageID      string `json:"page_id"`
	}{}

	err := json.NewDecoder(request.Body).Decode(new_content_entry_request)
	if err != nil {
		echo.Echo(echo.RedBG, fmt.Sprintf("Error while decoding request: %s", err))
		response.WriteHeader(400)
		return
	}

	if new_content_entry_request.EntityID == "" || new_content_entry_request.Name == "" || new_content_entry_request.ContentType == "" {
		echo.Echo(echo.RedBG, "EntityID, Name, ContentType or Locale is empty")
		response.WriteHeader(400)
		return
	}

	content_type, err := models.CastContentEntryType(new_content_entry_request.ContentType)
	if err != nil {
		echo.Echo(echo.RedBG, fmt.Sprintf("Error while casting content type: %s", err))
		response.WriteHeader(400)
		return
	}

	new_content_entry := models.NewContentEntry()
	new_content_entry.EntryID = new_content_entry_request.EntityID
	new_content_entry.Name = new_content_entry_request.Name
	new_content_entry.ContentType = content_type

	err = repository.PagesContent.AddContentToSection(request.Context(), new_content_entry, new_content_entry_request.SectionID, new_content_entry_request.PageID, nil)
	if err != nil {
		echo.Echo(echo.RedBG, fmt.Sprintf("Error while adding content entry: %v", err))
		response.WriteHeader(500)
		return
	}

	response_body, err := getPageUpdatedResponse(request.Context(), new_content_entry_request.PageID)
	if err != nil {
		echo.Echo(echo.RedBG, fmt.Sprintf("Error while getting page updated response: %v", err))
		response.WriteHeader(500)
		return
	}

	response.Header().Add("Content-Type", "application/json")
	response.WriteHeader(201)
	json.NewEncoder(response).Encode(response_body)
}

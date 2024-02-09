package models

type PageContent struct {
	PageID         string                       `json:"page_id"`
	Name           string                       `json:"name"`
	LocalesContent map[string]*[]ContentSection `json:"locales_content"`
}

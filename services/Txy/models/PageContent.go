package models

type PageMetadata struct {
	PageID string `json:"page_id"`
	Name   string `json:"name"`
}

type PageContent struct {
	PageMetadata
	LocalesContent map[string]*[]ContentSection `json:"locales_content"`
}

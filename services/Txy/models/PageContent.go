package models

import (
	"fmt"
	"libery_txy_content_service/helpers"

	"github.com/Gerardo115pp/patriots_lib/echo"
)

type PageMetadata struct {
	PageID string `json:"page_id"`
	Name   string `json:"name"`
}

type PageContent struct {
	PageMetadata
	ContentHash    string                       `json:"content_hash"`
	LocalesContent map[string]*[]ContentSection `json:"locales_content"`
}

func (pc *PageContent) CalculateHash() string {
	var hash_source string = fmt.Sprintf("pageId_%s+pageName_%s", pc.PageID, pc.Name)
	for locale, content := range pc.LocalesContent {
		hash_source += "locale_" + locale + "+sections_++"
		for _, section := range *content {
			hash_source += "content_++" + section.CalculateHash()
		}
	}

	echo.EchoDebug(fmt.Sprintf("Hash source: %s", hash_source))

	content_hash := helpers.GenerateSha1ID(hash_source)

	pc.ContentHash = content_hash

	return content_hash
}

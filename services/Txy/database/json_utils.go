package database

import (
	"encoding/json"
	"libery_txy_content_service/models"
	"os"

	"github.com/Gerardo115pp/patriots_lib/echo"
)

type contentEntryJSON struct {
	EntryId     string            `json:"entry_id"`
	Locale      string            `json:"locale"`
	Name        string            `json:"name"`
	ContentType string            `json:"content_type"`
	Attributes  map[string]string `json:"attributes"`
}

type contentSectionJSON struct {
	SectionId string             `json:"section_id"`
	Name      string             `json:"name"`
	Content   []contentEntryJSON `json:"content"`
}

type pageContentJSON struct {
	PageId  string               `json:"page_id"`
	Name    string               `json:"name"`
	Content []contentSectionJSON `json:"content"`
}

func loadContentFromJson(json_filename string) (*models.PageContent, error) {
	var page_content *models.PageContent = new(models.PageContent)
	var page_sections []models.ContentSection
	content_bytes, err := os.ReadFile(json_filename)
	if err != nil {
		return page_content, err
	}

	var page_content_json pageContentJSON

	err = json.Unmarshal(content_bytes, &page_content_json)
	if err != nil {
		return page_content, err
	}

	page_content.PageID = page_content_json.PageId
	page_content.Name = page_content_json.Name
	page_content.LocalesContent = make(map[string]*[]models.ContentSection)

	locale := "en"

	page_sections = loadContentSectionsFromJson(page_content_json.Content)

	if len(page_sections) > 0 && len(page_sections[0].Content) > 0 {
		locale = page_sections[0].Content[0].Locale
	}

	page_content.LocalesContent[locale] = &page_sections

	return page_content, nil
}

func loadContentSectionsFromJson(content_sections []contentSectionJSON) []models.ContentSection {
	var sections []models.ContentSection

	for _, section_json := range content_sections {
		var section models.ContentSection
		section.SectionID = section_json.SectionId
		section.Name = section_json.Name
		section.Content = loadContentEntriesFromJson(section_json.Content)
		sections = append(sections, section)
	}

	return sections
}

func loadContentEntriesFromJson(content_entries []contentEntryJSON) []models.ContentEntry {
	var err error
	var entries []models.ContentEntry

	for _, entry_json := range content_entries {
		var entry *models.ContentEntry = models.NewContentEntry()
		entry.EntryID = entry_json.EntryId
		entry.Locale = entry_json.Locale
		entry.Name = entry_json.Name
		entry.ContentType, err = models.CastContentEntryType(entry_json.ContentType)
		if err != nil {
			echo.EchoFatal(err)
		}

		for key, value := range entry_json.Attributes {
			attribute, err := models.CastContentEntryAttribute(key)
			if err != nil {
				echo.EchoFatal(err)
			}

			entry.Attributes[attribute] = value
		}

		entry.UpdateContentHash()

		entries = append(entries, *entry)
	}

	return entries
}

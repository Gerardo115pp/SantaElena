package models

import (
	"fmt"
	"libery_txy_content_service/helpers"
)

// Enums

type contentEntryAttribute string

type contentEntryAttributes struct {
	Text         contentEntryAttribute
	Href         contentEntryAttribute
	MediaUrl     contentEntryAttribute
	Instructions contentEntryAttribute
}

var ContentEntryAttributes = contentEntryAttributes{
	Text:         "text",
	Href:         "href",
	MediaUrl:     "media_url",
	Instructions: "instructions",
}

func CastContentEntryAttribute(attribute string) (contentEntryAttribute, error) {
	var proposed_attribute contentEntryAttribute = contentEntryAttribute(attribute)

	switch proposed_attribute {
	case ContentEntryAttributes.Text:
		return ContentEntryAttributes.Text, nil
	case ContentEntryAttributes.Href:
		return ContentEntryAttributes.Href, nil
	case ContentEntryAttributes.MediaUrl:
		return ContentEntryAttributes.MediaUrl, nil
	case ContentEntryAttributes.Instructions:
		return ContentEntryAttributes.Instructions, nil
	default:
		return "", fmt.Errorf("Invalid content entry attribute: %s", attribute)
	}
}

type contentEntryType string

type contentEntryTypes struct {
	Image contentEntryType
	Video contentEntryType
	Text  contentEntryType
	Html  contentEntryType
}

func CastContentEntryType(content_type string) (contentEntryType, error) {
	var proposed_content_type contentEntryType = contentEntryType(content_type)

	switch proposed_content_type {
	case ContentEntryTypes.Image:
		return ContentEntryTypes.Image, nil
	case ContentEntryTypes.Video:
		return ContentEntryTypes.Video, nil
	case ContentEntryTypes.Text:
		return ContentEntryTypes.Text, nil
	case ContentEntryTypes.Html:
		return ContentEntryTypes.Html, nil
	default:
		return "", fmt.Errorf("Invalid content entry type: %s", content_type)
	}
}

var ContentEntryTypes = contentEntryTypes{
	Image: "image",
	Video: "video",
	Text:  "text",
	Html:  "html",
}

// END of Enums

type ContentEntry struct {
	EntryID     string                           `json:"entry_id"`
	Name        string                           `json:"name"`
	ContentType contentEntryType                 `json:"content_type"`
	Attributes  map[contentEntryAttribute]string `json:"attributes"`
	ContentHash string                           `json:"content_hash"`
}

func NewContentEntry() *ContentEntry {
	return &ContentEntry{
		Attributes: make(map[contentEntryAttribute]string),
	}
}

func (ce *ContentEntry) GetAttribute(attribute contentEntryAttribute) string {
	var attribute_value string

	if value, exists := ce.Attributes[attribute]; exists {
		attribute_value = value
	}

	return attribute_value
}

func (ce *ContentEntry) UpdateContentHash() {
	var hash_source string = fmt.Sprintf("%s+%s", ce.EntryID, ce.Name)

	switch ce.ContentType {
	case ContentEntryTypes.Text:
		hash_source += fmt.Sprintf("+%s+%s", ce.GetAttribute(ContentEntryAttributes.Text), ce.GetAttribute(ContentEntryAttributes.Href))
	default:
		hash_source += fmt.Sprintf("+%s", ce.GetAttribute(ContentEntryAttributes.MediaUrl))
	}

	ce.ContentHash = helpers.GenerateSha1ID(hash_source)
}

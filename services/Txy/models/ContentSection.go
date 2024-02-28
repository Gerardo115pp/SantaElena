package models

import "fmt"

type ContentSection struct {
	SectionID string         `json:"section_id"`
	Name      string         `json:"name"`
	Content   []ContentEntry `json:"content"`
}

func (section *ContentSection) AddContent(content ContentEntry) {
	if section.Content == nil {
		section.Content = make([]ContentEntry, 0)
	}

	section.Content = append(section.Content, content)
}

func (section *ContentSection) CalculateHash() string {
	var hash_source string = fmt.Sprintf("sectionId_%s+sectionName_%s+content_++", section.SectionID, section.Name)
	for _, content := range section.Content {
		hash_source += "entry_" + content.ContentHash + "+"
	}

	return hash_source
}

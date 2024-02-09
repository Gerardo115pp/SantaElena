package models

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

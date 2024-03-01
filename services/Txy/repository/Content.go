package repository

import (
	"context"
	"database/sql"
	"libery_txy_content_service/models"
)

type ContentRepository interface {
	AddPage(ctx context.Context, page_id string, name string, tx *sql.Tx) error
	AddSection(ctx context.Context, section_id string, name string, page_id string, tx *sql.Tx) error
	AddContentToSection(ctx context.Context, content_entry *models.ContentEntry, section_id string, page_id string, tx *sql.Tx) error
	AddLocale(ctx context.Context, locale string) error
	DeleteLocale(ctx context.Context, locale string) error
	PageHasLocale(ctx context.Context, page_id string, locale string) (bool, error)
	GetPages(ctx context.Context) ([]models.PageMetadata, error)
	GetPageContent(ctx context.Context, page_id string, locale string) (*models.PageContent, error)
	GetContentEntry(ctx context.Context, content_id string, locale string) (models.ContentEntry, error)
	// Deprecated: This function is deprecated in favor of GetLocales
	GetPageLocales(ctx context.Context, page_id string) ([]string, error)
	GetLocales(ctx context.Context) ([]string, error)
	UpdateContentEntry(ctx context.Context, content_entry *models.ContentEntry) error
	UpdateContentEntryContent(ctx context.Context, content_entry *models.ContentEntry, tx *sql.Tx) error
	Close() error
}

var PagesContent ContentRepository

func SetContentRepository(repository ContentRepository) {
	PagesContent = repository
}

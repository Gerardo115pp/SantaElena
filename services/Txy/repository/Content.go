package repository

import (
	"context"
	"libery_txy_content_service/models"
)

type ContentRepository interface {
	AddLocale(ctx context.Context, locale string) error
	PageHasLocale(ctx context.Context, page_id string, locale string) (bool, error)
	GetPages(ctx context.Context) ([]models.PageMetadata, error)
	GetPageContent(ctx context.Context, page_id string, locale string) (*models.PageContent, error)
	GetContentEntry(ctx context.Context, content_id string, locale string) (models.ContentEntry, error)
	// Deprecated: This function is deprecated in favor of GetLocales
	GetPageLocales(ctx context.Context, page_id string) ([]string, error)
	GetLocales(ctx context.Context) ([]string, error)
	UpdateContentEntry(ctx context.Context, content_entry *models.ContentEntry) error
	UpdateContentEntryContent(ctx context.Context, content_entry *models.ContentEntry) error
	Close() error
}

var PagesContent ContentRepository

func SetContentRepository(repository ContentRepository) {
	PagesContent = repository
}

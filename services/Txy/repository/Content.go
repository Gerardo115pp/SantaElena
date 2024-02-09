package repository

import (
	"context"
	"libery_txy_content_service/models"
)

type ContentRepository interface {
	PageHasLocale(ctx context.Context, page_id string, locale string) (bool, error)
	GetPageContent(ctx context.Context, page_id string, locale string) (*models.PageContent, error)
	GetContentEntry(ctx context.Context, content_id string) (models.ContentEntry, error)
	GetPageLocales(ctx context.Context, page_id string) ([]string, error)
	UpdateContentEntry(ctx context.Context, content_entry *models.ContentEntry) error
	UpdateContentEntryContent(ctx context.Context, content_entry *models.ContentEntry) error
	Close() error
}

var PagesContent ContentRepository

func SetContentRepository(repository ContentRepository) {
	PagesContent = repository
}

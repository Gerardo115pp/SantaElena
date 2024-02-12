package database

import (
	"context"
	"database/sql"
	"fmt"
	"libery_txy_content_service/models"

	"github.com/Gerardo115pp/patriots_lib/echo"
	_ "github.com/mattn/go-sqlite3"
)

type ContentSQLiteDB struct {
	db *sql.DB
}

func NewContentSQLiteDB() (*ContentSQLiteDB, error) {
	var err error

	content_db := new(ContentSQLiteDB)

	content_db.db, err = openContentSQLiteDB()
	if err != nil {
		return nil, err
	}

	return content_db, nil
}

// Only use prepared statements in methods that are public and receive user input

func (content_db *ContentSQLiteDB) GetPages(ctx context.Context) ([]models.PageMetadata, error) {
	var pages []models.PageMetadata

	sql_statement := "SELECT `page_id`, `name` FROM `pages`"

	rows, err := content_db.db.QueryContext(ctx, sql_statement)
	if err != nil {
		return pages, err
	}

	defer rows.Close()

	for rows.Next() {
		var page models.PageMetadata

		err = rows.Scan(&page.PageID, &page.Name)
		if err != nil {
			return pages, err
		}

		pages = append(pages, page)
	}

	return pages, nil
}

func (content_db *ContentSQLiteDB) GetPageLocales(ctx context.Context, page_id string) ([]string, error) {
	var locales []string

	stmt, err := content_db.db.Prepare("SELECT DISTINCT `locale` FROM `content_entries` WHERE `page_fk`=?")
	if err != nil {
		return locales, err
	}

	rows, err := stmt.QueryContext(ctx, page_id)
	if err != nil {
		return locales, err
	}

	defer rows.Close()

	for rows.Next() {
		var locale string

		err = rows.Scan(&locale)
		if err != nil {
			return locales, err
		}

		locales = append(locales, locale)
	}

	return locales, nil

}

func (content_db *ContentSQLiteDB) GetPageContent(ctx context.Context, page_id string, locale string) (*models.PageContent, error) {
	var page *models.PageContent = new(models.PageContent)

	page_stmt, err := content_db.db.Prepare("SELECT `page_id`, `name` FROM `pages` WHERE `page_id`=?")
	if err != nil {
		return page, err
	}

	err = page_stmt.QueryRowContext(ctx, page_id).Scan(&page.PageID, &page.Name)
	if err != nil {
		return page, err
	}
	page_stmt.Close()

	page.LocalesContent = make(map[string]*[]models.ContentSection)

	page_sections, err := content_db.getPageSections(ctx, page_id, locale)
	if err != nil {
		return page, err
	}

	page.LocalesContent[locale] = &page_sections

	echo.EchoDebug(fmt.Sprintf("page: %+v", page))

	return page, nil
}

func (content_db *ContentSQLiteDB) getPageSections(ctx context.Context, page_id string, locale string) ([]models.ContentSection, error) {
	var page_sections []models.ContentSection

	var page_content_entries map[string]*[]models.ContentEntry
	page_content_entries, err := content_db.getPageContentEntries(ctx, page_id, locale)
	for key, value := range page_content_entries {
		echo.EchoDebug(fmt.Sprintf("key: %s, value: %+v \n", key, value))
	}

	section_stmt, err := content_db.db.Prepare("SELECT `section_id`, `name` FROM `sections` WHERE `page_fk`=?")
	if err != nil {
		return nil, err
	}

	rows, err := section_stmt.QueryContext(ctx, page_id)
	if err != nil {
		return nil, err
	}

	defer rows.Close()

	for rows.Next() {
		var section models.ContentSection

		err = rows.Scan(&section.SectionID, &section.Name)
		if err != nil {
			return nil, err
		}

		if section_entries, exists := page_content_entries[section.SectionID]; exists {
			section.Content = *section_entries
		} else {
			section.Content = make([]models.ContentEntry, 0)
		}

		page_sections = append(page_sections, section)
	}

	section_stmt.Close()

	return page_sections, nil
}

func (content_db *ContentSQLiteDB) getPageContentEntries(ctx context.Context, page_id string, locale string) (map[string]*[]models.ContentEntry, error) {
	page_sections := make(map[string]*[]models.ContentEntry)

	content_stmt, err := content_db.db.Prepare("SELECT `entry_id`, `section_fk`, `name`, `content_type`, `content_hash` FROM `content_entries` WHERE `page_fk`=? AND `locale`=?")
	if err != nil {
		return nil, err
	}

	rows, err := content_stmt.QueryContext(ctx, page_id, locale)
	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var section_slice *[]models.ContentEntry

	for rows.Next() {
		var content_entry models.ContentEntry = *models.NewContentEntry()
		var section_fk string

		err = rows.Scan(&content_entry.EntryID, &section_fk, &content_entry.Name, &content_entry.ContentType, &content_entry.ContentHash)
		if err != nil {
			return nil, err
		}

		section_slice, _ = page_sections[section_fk]

		if section_slice == nil {
			new_slice := make([]models.ContentEntry, 0)
			page_sections[section_fk] = &new_slice
			section_slice = &new_slice
		}

		err = content_db.populateAttributes(&content_entry)
		if err != nil {
			return nil, err
		}

		*section_slice = append(*section_slice, content_entry)
	}

	content_stmt.Close()

	return page_sections, nil
}

func (content_db *ContentSQLiteDB) GetContentEntry(ctx context.Context, content_id string) (models.ContentEntry, error) {
	var content_entry models.ContentEntry

	stmt, err := content_db.db.Prepare("SELECT `entry_id`, `name`, `content_type`, `content_hash` FROM `content_entries` WHERE `entry_id`=?")
	if err != nil {
		return content_entry, err
	}

	err = stmt.QueryRowContext(ctx, content_id).Scan(&content_entry.EntryID, &content_entry.Name, &content_entry.ContentType, &content_entry.ContentHash)
	if err != nil {
		return content_entry, err
	}

	err = content_db.populateAttributes(&content_entry)
	if err != nil {
		return content_entry, err
	}

	return content_entry, nil
}

func (content_db *ContentSQLiteDB) PageHasLocale(ctx context.Context, page_id string, locale string) (bool, error) {
	stmt, err := content_db.db.Prepare("SELECT count(*) FROM `content_entries` WHERE `page_fk`=? AND `locale`=?")
	if err != nil {
		return false, err
	}

	var count int
	err = stmt.QueryRowContext(ctx, page_id, locale).Scan(&count)
	if err != nil {
		return false, err
	}

	return count > 0, nil
}

func (content_db *ContentSQLiteDB) populateAttributes(content_entry *models.ContentEntry) error {
	sql_statement := "SELECT `attribute_name`, `attribute_value` FROM `entry_attributes` WHERE `entry_fk`=?"

	rows, err := content_db.db.Query(sql_statement, content_entry.EntryID)
	if err != nil {
		return err
	}

	defer rows.Close()

	for rows.Next() {
		var attribute_name string
		var attribute_value string

		err = rows.Scan(&attribute_name, &attribute_value)
		if err != nil {
			return err
		}

		attribute, err := models.CastContentEntryAttribute(attribute_name)
		if err != nil {
			return err
		}

		content_entry.Attributes[attribute] = attribute_value
	}

	return nil
}

func (content_db *ContentSQLiteDB) UpdateContentEntry(ctx context.Context, content_entry *models.ContentEntry) error {
	stmt, err := content_db.db.Prepare("UPDATE `content_entries` SET `name`=?, `content_type`=?, `content_hash`=? WHERE `entry_id`=?")
	if err != nil {
		return err
	}

	_, err = stmt.ExecContext(ctx, content_entry.Name, content_entry.ContentType, content_entry.ContentHash, content_entry.EntryID)
	if err != nil {
		return err
	}

	stmt.Close()

	return nil
}

func (content_db *ContentSQLiteDB) UpdateContentEntryContent(ctx context.Context, content_entry *models.ContentEntry) error {
	stmt, err := content_db.db.Prepare("DELETE FROM `entry_attributes` WHERE `entry_fk`=?")
	if err != nil {
		return err
	}

	_, err = stmt.ExecContext(ctx, content_entry.EntryID)
	if err != nil {
		return err
	}

	stmt.Close()

	stmt, err = content_db.db.Prepare("INSERT INTO `entry_attributes` (`entry_fk`, `attribute_name`, `attribute_value`) VALUES (?, ?, ?)")

	for attribute, value := range content_entry.Attributes {
		_, err = stmt.ExecContext(ctx, content_entry.EntryID, attribute, value)
		if err != nil {
			return err
		}
	}

	stmt.Close()

	return nil
}

func (content_db *ContentSQLiteDB) verifyEntriesContentHash() error {
	sql_statement := "SELECT `entry_id`, `name`, `content_type`, `content_hash` FROM `content_entries` WHERE `content_hash`=''"

	rows, err := content_db.db.Query(sql_statement)
	if err != nil {
		return err
	}

	defer rows.Close()

	for rows.Next() {
		var unverified_entry *models.ContentEntry = models.NewContentEntry()
		var content_type_holder string

		err = rows.Scan(&unverified_entry.EntryID, &unverified_entry.Name, &content_type_holder, &unverified_entry.ContentHash)
		if err != nil {
			return err
		}

		content_type, err := models.CastContentEntryType(content_type_holder)
		if err != nil {
			return err
		}

		unverified_entry.ContentType = content_type

		err = content_db.populateAttributes(unverified_entry)
		if err != nil {
			return err
		}

		unverified_entry.UpdateContentHash()

		err = content_db.UpdateContentEntry(context.Background(), unverified_entry)
		if err != nil {
			return err
		}
	}

	return nil
}

func (content_db *ContentSQLiteDB) Close() error {
	return content_db.db.Close()
}

package database

import (
	"context"
	"database/sql"
	"fmt"
	app_config "libery_txy_content_service/Config"
	"libery_txy_content_service/helpers"
	"libery_txy_content_service/models"
	"path"

	"github.com/Gerardo115pp/patriots_lib/echo"
	_ "github.com/mattn/go-sqlite3"
)

type ContentSQLiteDB struct {
	db            *sql.DB
	locales_cache []string
}

func NewContentSQLiteDB() (*ContentSQLiteDB, error) {
	var err error

	content_db := new(ContentSQLiteDB)

	db_file := path.Join(app_config.OPERATION_DATA_PATH, "databases", "content.db")
	db_file_exists := helpers.FileExists(db_file)

	content_db.db, err = openContentSQLiteDB()
	if err != nil {
		return nil, err
	}

	if app_config.DATABASE_CONTENT_FILE != "" && !db_file_exists {
		switch true {
		case helpers.IsFileJson(app_config.DATABASE_CONTENT_FILE):
			var initial_content_json string = path.Join(app_config.OPERATION_DATA_PATH, "content", app_config.DATABASE_CONTENT_FILE)

			initial_page, err := loadContentFromJson(initial_content_json)
			if err != nil {
				return nil, err
			}

			err = content_db.addPageContent(context.Background(), initial_page)
			if err != nil {
				echo.Echo(echo.OrangeBG, fmt.Sprintf("Failed to add initial content to database: %s\nProceeding without initial content", err.Error()))
			}
		}
	}

	site_locales, err := content_db.GetLocales(context.Background())
	if err != nil {
		return nil, err
	}

	content_db.locales_cache = site_locales

	if len(site_locales) == 0 {
		content_db.locales_cache = append(content_db.locales_cache, app_config.INITIAL_LOCALE)
	}

	_, err = content_db.db.Exec("PRAGMA foreign_keys = ON")
	if err != nil {
		return nil, err
	}

	return content_db, nil
}

// Only use prepared statements in methods that are public and receive user input
func (content_db *ContentSQLiteDB) addPageContent(ctx context.Context, page_content *models.PageContent) error {
	tx, err := content_db.db.Begin()
	if err != nil {
		return err
	}

	err = content_db.AddPage(ctx, page_content.PageID, page_content.Name, tx)
	if err != nil {
		echo.Echo(echo.RedBG, fmt.Sprintf("Error while adding page %s: %s", page_content.PageID, err))
		tx.Rollback()
		return err
	}

	if content_db.locales_cache == nil {
		content_db.locales_cache = make([]string, 0)
		for locale := range page_content.LocalesContent {
			content_db.locales_cache = append(content_db.locales_cache, locale)
		}
	}

	echo.EchoDebug(fmt.Sprintf("locales_cache: %+v", content_db.locales_cache))

	if len(content_db.locales_cache) == 0 {
		tx.Commit()
		return nil
	}

	sections := page_content.LocalesContent[content_db.locales_cache[0]]

	for _, section := range *sections {
		err = content_db.AddSection(ctx, section.SectionID, section.Name, page_content.PageID, tx)
		if err != nil {
			echo.Echo(echo.RedBG, fmt.Sprintf("Error while adding section %s: %s", section.SectionID, err))
			tx.Rollback()
		}

		for _, content_entry := range section.Content {
			err = content_db.AddContentToSection(ctx, &content_entry, section.SectionID, page_content.PageID, tx)
			if err != nil {
				echo.Echo(echo.RedBG, fmt.Sprintf("Error while adding content '%s' to section %s: %s", content_entry.EntryID, section.SectionID, err))
				tx.Rollback()
			}

			// Adds the content entry attributes
			err = content_db.UpdateContentEntryContent(ctx, &content_entry, tx)
			if err != nil {
				echo.Echo(echo.RedBG, fmt.Sprintf("Error while adding content entry attributes: %s", err))
				tx.Rollback()
			}
		}

	}

	err = tx.Commit()

	return err
}

func (content_db *ContentSQLiteDB) AddPage(ctx context.Context, page_id string, name string, tx *sql.Tx) error {
	var err error
	var tx_passed bool = tx != nil

	if !tx_passed {
		echo.EchoDebug("AddPage: No transaction passed, starting new one")
		tx, err = content_db.db.Begin()
		if err != nil {
			return err
		}
	}

	page_stmt, err := tx.PrepareContext(ctx, "INSERT INTO `pages` (`page_id`, `name`) VALUES (?, ?)")
	if err != nil {
		return err
	}

	_, err = page_stmt.ExecContext(ctx, page_id, name)
	if err != nil {
		return err
	}

	page_stmt.Close()

	if !tx_passed {
		echo.EchoDebug("AddPage: No transaction passed, committing new one")
		err = tx.Commit()
		if err != nil {
			tx.Rollback()
			return err
		}
	}

	return nil
}

func (content_db *ContentSQLiteDB) AddSection(ctx context.Context, section_id string, name string, page_id string, tx *sql.Tx) error {
	var err error
	var tx_passed bool = tx != nil

	if !tx_passed {
		echo.EchoDebug("AddSection: No transaction passed, starting new one")
		tx, err = content_db.db.Begin()
		if err != nil {
			return err
		}
	}

	section_stmt, err := tx.PrepareContext(ctx, "INSERT INTO `sections` (`section_id`, `name`, `page_fk`) VALUES (?, ?, ?)")
	if err != nil {
		return err
	}

	_, err = section_stmt.ExecContext(ctx, section_id, name, page_id)
	if err != nil {
		return err
	}

	section_stmt.Close()

	if !tx_passed {
		echo.EchoDebug("AddSection: No transaction passed, committing new one")
		err = tx.Commit()
		if err != nil {
			tx.Rollback()
			return err
		}
	}

	return nil

}

func (content_db *ContentSQLiteDB) AddContentToSection(ctx context.Context, content_entry *models.ContentEntry, section_id string, page_id string, tx *sql.Tx) error {
	var err error
	var tx_passed bool = tx != nil

	if !tx_passed {
		echo.EchoDebug("AddContentToSection: No transaction passed, starting new one")
		tx, err = content_db.db.Begin()
		if err != nil {
			echo.Echo(echo.RedBG, fmt.Sprintf("Error while starting transaction for adding content to section: %s", err))
			return err
		}
	}

	content_stmt, err := tx.PrepareContext(ctx, "INSERT INTO `content_entries` (`id`, `entry_id`, `section_fk`, `page_fk`, `locale`, `name`, `content_type`, `content_hash`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)")
	if err != nil {
		echo.Echo(echo.RedBG, fmt.Sprintf("Error while preparing statement for adding content to section: %s", err))
		return err
	}

	for _, locale := range content_db.locales_cache {
		content_entry.SetLocale(locale)
		content_entry.UpdateContentHash()

		_, err = content_stmt.ExecContext(ctx, content_entry.ID(), content_entry.EntryID, section_id, page_id, locale, content_entry.Name, content_entry.ContentType, content_entry.ContentHash)
		if err != nil {
			echo.Echo(echo.RedBG, fmt.Sprintf("Error while adding content to section: %s", err))
			return err
		}
	}

	content_stmt.Close()

	if !tx_passed {
		echo.EchoDebug("AddContentToSection: No transaction passed, committing new one")
		err = tx.Commit()
		if err != nil {
			echo.Echo(echo.RedBG, fmt.Sprintf("Error while committing transaction for adding content to section: %s", err))
			tx.Rollback()
			return err
		}
	}

	return nil
}

func (content_db *ContentSQLiteDB) AddLocale(ctx context.Context, locale string) error {
	rows, err := content_db.db.QueryContext(ctx, "SELECT `locale`, `entry_id`, `section_fk`, `page_fk`, `name`, `content_type` FROM `content_entries` WHERE `locale`=(SELECT DISTINCT `locale` FROM `content_entries` LIMIT 1)")
	if err != nil {
		return err
	}

	defer rows.Close()

	tx, err := content_db.db.BeginTx(ctx, nil)

	content_stmt, err := tx.PrepareContext(ctx, "INSERT INTO `content_entries` (`id`, `entry_id`, `section_fk`, `page_fk`, `locale`, `name`, `content_type`, `content_hash`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)")

	for rows.Next() {
		var content_entry *models.ContentEntry = models.NewContentEntry()
		var section_fk string
		var page_id string
		var original_locale string // we will use this to retrieve a media url when these are implemented

		err = rows.Scan(&original_locale, &content_entry.EntryID, &section_fk, &page_id, &content_entry.Name, &content_entry.ContentType)
		if err != nil {
			return err
		}

		echo.EchoDebug(fmt.Sprintf("content_entry.ID(): %s", content_entry.ID()))
		content_entry.SetLocale(original_locale)
		echo.EchoDebug(fmt.Sprintf("content_entry.ID() after SetLocale: %s", content_entry.ID()))

		content_db.populateAttributes(content_entry)

		echo.EchoDebug(fmt.Sprintf("Populated attributes for content entry %s: %+v", content_entry.ID(), content_entry.Attributes))

		content_entry.SetLocale(locale)
		content_entry.UpdateContentHash()

		_, err = content_stmt.ExecContext(ctx, content_entry.ID(), content_entry.EntryID, section_fk, page_id, locale, content_entry.Name, content_entry.ContentType, content_entry.ContentHash)
		if err != nil {
			echo.EchoErr(err)
			tx.Rollback()
			return err
		}

		err = content_db.UpdateContentEntryContent(ctx, content_entry, tx)
		if err != nil {
			echo.EchoErr(err)
			tx.Rollback()
			return err
		}
	}

	err = tx.Commit()

	content_db.locales_cache = append(content_db.locales_cache, locale)

	return err
}

func (content_db *ContentSQLiteDB) DeleteLocale(ctx context.Context, locale string) error {
	stmt, err := content_db.db.Prepare("DELETE FROM `content_entries` WHERE `locale`=?")
	if err != nil {
		return err
	}

	_, err = stmt.ExecContext(ctx, locale)
	if err != nil {
		return err
	}

	var updated_locales []string

	for _, l := range content_db.locales_cache {
		if l != locale {
			updated_locales = append(updated_locales, l)
		}
	}

	content_db.locales_cache = updated_locales
	stmt.Close()

	return nil
}

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

// Returns a list of locales that exist in the txy website. if the locales_cache is populated, it will return that cached list. Otherwise, it will query the database and return that list
// Under no circumstances will populate the locales_cache on its own. This is useful for when you want to refresh the list of locales
func (content_db *ContentSQLiteDB) GetLocales(ctx context.Context) ([]string, error) {
	if content_db.locales_cache != nil || len(content_db.locales_cache) != 0 {
		return content_db.locales_cache, nil
	}

	var locales []string

	rows, err := content_db.db.QueryContext(ctx, "SELECT DISTINCT `locale` FROM `content_entries`")
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

	content_stmt, err := content_db.db.Prepare("SELECT `entry_id`, `section_fk`, `name`, `content_type`, `content_hash`, `locale` FROM `content_entries` WHERE `page_fk`=? AND `locale`=?")
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

		err = rows.Scan(&content_entry.EntryID, &section_fk, &content_entry.Name, &content_entry.ContentType, &content_entry.ContentHash, &content_entry.Locale)
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

func (content_db *ContentSQLiteDB) GetContentEntry(ctx context.Context, content_id string, locale string) (models.ContentEntry, error) {
	var content_entry models.ContentEntry = *models.NewContentEntry()
	echo.EchoDebug(fmt.Sprintf("content_id: %s, locale: %s", content_id, locale))

	stmt, err := content_db.db.Prepare("SELECT `entry_id`, `name`, `content_type`, `content_hash`, `locale` FROM `content_entries` WHERE `entry_id`=? AND `locale`=?")
	if err != nil {
		echo.Echo(echo.RedBG, fmt.Sprintf("Error while preparing statement: %s", err))
		return content_entry, err
	}

	echo.EchoDebug(fmt.Sprintf("stmt: %+v", stmt))

	err = stmt.QueryRowContext(ctx, content_id, locale).Scan(&content_entry.EntryID, &content_entry.Name, &content_entry.ContentType, &content_entry.ContentHash, &content_entry.Locale)
	if err != nil {
		echo.Echo(echo.RedBG, fmt.Sprintf("Error while getting content entry: %s", err))
		return content_entry, err
	}

	echo.EchoDebug(fmt.Sprintf("content_entry: %+v", content_entry))

	err = content_db.populateAttributes(&content_entry)
	if err != nil {
		echo.Echo(echo.RedBG, fmt.Sprintf("Error while populating attributes: %s", err))
		return content_entry, err
	}

	echo.EchoDebug(fmt.Sprintf("content_entry: %+v", content_entry))

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

	echo.EchoDebug(fmt.Sprintf("populateAttributes: content_entry.ID(): %s", content_entry.ID()))
	rows, err := content_db.db.Query(sql_statement, content_entry.ID())
	if err != nil {
		return err
	}
	echo.EchoDebug(fmt.Sprintf("populateAttributes: content_entry.ID()(after query): %s", content_entry.ID()))

	defer rows.Close()

	echo.EchoDebug(fmt.Sprintf("Found %d attributes for content entry %s", len(content_entry.Attributes), content_entry.ID()))

	for rows.Next() {
		var attribute_name string
		var attribute_value string

		err = rows.Scan(&attribute_name, &attribute_value)
		if err != nil {
			return err
		}

		echo.EchoDebug(fmt.Sprintf("for content entry %s found attribute: %s=%s", content_entry.ID(), attribute_name, attribute_value))

		attribute, err := models.CastContentEntryAttribute(attribute_name)
		if err != nil {
			return err
		}

		content_entry.Attributes[attribute] = attribute_value
	}

	echo.EchoDebug(fmt.Sprintf("Attributes for content entry %s: %+v", content_entry.ID(), content_entry.Attributes))

	return nil
}

func (content_db *ContentSQLiteDB) UpdateContentEntry(ctx context.Context, content_entry *models.ContentEntry) error {
	stmt, err := content_db.db.Prepare("UPDATE `content_entries` SET `name`=?, `content_type`=?, `content_hash`=? WHERE `id`=?")
	if err != nil {
		return err
	}

	_, err = stmt.ExecContext(ctx, content_entry.Name, content_entry.ContentType, content_entry.ContentHash, content_entry.ID())
	if err != nil {
		return err
	}

	stmt.Close()

	return nil
}

// Updates the content entry attributes.
func (content_db *ContentSQLiteDB) UpdateContentEntryContent(ctx context.Context, content_entry *models.ContentEntry, tx *sql.Tx) error {
	var content_id string = content_entry.ID()
	var err error
	tx_passed := tx != nil

	if !tx_passed {
		tx, err = content_db.db.Begin()
		if err != nil {
			echo.Echo(echo.RedBG, fmt.Sprintf("Error while starting transaction for updating content entry content: %s", err))
			return err
		}
	}

	stmt, err := tx.PrepareContext(ctx, "DELETE FROM `entry_attributes` WHERE `entry_fk`=?")
	if err != nil {
		return err
	}

	_, err = stmt.ExecContext(ctx, content_id)
	if err != nil {
		tx.Rollback()
		return err
	}

	stmt.Close()

	stmt, err = tx.PrepareContext(ctx, "INSERT INTO `entry_attributes` (`entry_fk`, `attribute_name`, `attribute_value`) VALUES (?, ?, ?)")

	for attribute, value := range content_entry.Attributes {
		_, err = stmt.ExecContext(ctx, content_id, attribute, value)
		if err != nil {
			tx.Rollback()
			return err
		}
	}

	stmt.Close()

	if !tx_passed {
		err = tx.Commit()
		if err != nil {
			tx.Rollback()
			return err
		}
	}

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

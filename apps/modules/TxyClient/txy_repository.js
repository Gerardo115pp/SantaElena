import { getPageContent, getExistingPages, getLocales, TxyPage } from "./models/pages";
import TxyContentEntry from "./models/content_entry";
import { TxySection } from "./models/section";
import TXY_METADATA from "./txy_metadata";

/**
 * @typedef {Object} PageMetadata
 * @property {string} page_id
 * @property {string} name
 */

class TxyRepository {
    /**
     * The locales availabe for this site
     * @type {string[]}
     */
    #site_locales;

    /**
     * The loaded txy pages
     * @type {Object<string, TxyPage>} - map from page_id to TxyPage
     */
    #txy_pages;

    /**
     * The metadata for this TxyRepository, things like the default page_id, default locale, text fallbacks, etc. 
     * @type {typeof TXY_METADATA}
     */
    #metadata;

    /**
     * Whether this repository is ready to be used
     * @type {boolean}
     */
    #booted;

    /**
     * The current page in which to look for content
     * @type {string}
     */
    #current_page_id;

    /**
     * The current locale been used to look for content
     * @type {string}
     * @example 'es'
     */
    #current_locale;

    /**
     * A list of pages registered for this site
     * @type {PageMetadata[]}
     */
    #existing_pages;

    /**
     * A map for the sections that is repopulated when the current page or locale changes
     * @type {Map<string, TxySection>}
     */
    #sections_map;


    /**
     * A map for the content entries that is repopulated when the current page or locale changes
     * @type {Map<string, TxyContentEntry>}
     */
    #content_entries_map;


    /**
     * 
     * @param {typeof TXY_METADATA} metadata 
     */
    constructor(metadata) {
        this.#metadata = metadata;
        this.#site_locales = [];
        

        this.#txy_pages = {};

        // convert the fallback data into Object<pages_id, TxyPage>
        for (let page_id in metadata.fallback) {
            this.#txy_pages[page_id] = new TxyPage(metadata.fallback[page_id]);
        }

        this.#current_page_id = undefined;
        this.#current_locale = undefined;

        this.#sections_map = {};
        this.#content_entries_map = {};

        this.#booted = metadata.fallback !== undefined;

        // set the default page and locale
        this.setCurrentPageAndLocale(metadata.default_page_id, metadata.default_locale);
    }

    async boot() {
        if (this.#booted) {
            console.debug('TxyRepository already booted');
            return;
        }

        this.#site_locales = await this.#requestSiteLocales();

        this.#existing_pages = await this.#requestExistingPages();

        await this.#loadPage(this.#metadata.default_page_id, this.#metadata.default_locale);

        this.#booted = (this.#site_locales.length > 0) && (this.#existing_pages.length > 0) && (this.#txy_pages[this.#metadata.default_page_id] !== undefined);

        console.debug('TxyRepository booted:', this.#booted);
        console.debug('Site locales:', this.#site_locales);
        console.debug('Existing pages:', this.#existing_pages);
        console.debug('Loaded pages:', this.#txy_pages);

        return this.#booted;
    }

    /**
     * Returns all the data in the txy section for the current page and locale.
     * @param {string} section_id 
     * @returns {TxySection}
     */
    getSection(section_id) {
        return this.#sections_map.get(section_id);
    }

    /**
     * Returns a content entry by its id or undefined if it does not exist
     * @param {string} entry_id
     * @returns {TxyContentEntry}
     */
    getContentEntry(entry_id) {
        return this.#content_entries_map.get(entry_id);
    }

    /**
     * Loads a page from the TXY API with the given page_id and locale
     * @param {string} page_id 
     * @param {string} locale 
     * @returns {Promise<void>}
     */
    async #loadPage(page_id, locale) {
        const page_content = await getPageContent(page_id, locale);

        this.#txy_pages[page_id] = page_content;
    }

    /**
     * Requests the available locales for the site
     * @returns {Promise<string[]>}
     */
    async #requestSiteLocales() {
        return getLocales();        
    }

    /**
     * Returns the existing pages for this site
     * @returns {Promise<PageMetadata[]>}
     */
    async #requestExistingPages() {
        return getExistingPages();
    }

    /**
     * Repopulates the sections map with the sections of the current page and locale
     * @returns {void}
     */
    #populateSectionsMap() {
        this.#sections_map = new Map();

        let sections = this.#txy_pages[this.#current_page_id].locales_content[this.#current_locale];

        for (let section of sections) {
            this.#sections_map.set(section.section_id, section);
        }
    }

    /**
     * Repopulates the content entries map with the content entries of the current page and locale
     * @returns {void}
     */
    #populateContentEntriesMap() {
        this.#content_entries_map = new Map();

        let sections = this.#txy_pages[this.#current_page_id].locales_content[this.#current_locale];

        for (let section of sections) {
            for (let entry of section.ContentEntries) {
                this.#content_entries_map.set(entry.entry_id, entry);
            }
        }
    }

    /**
     * Sets the current page and locale to the given values. if any of the values is null, the current values will be used.
     * @param {string|null} page_id
     * @param {string|null} locale
     */
    setCurrentPageAndLocale(page_id, locale) {
        if (page_id === null && locale === null) return;

        this.#current_page_id = page_id ?? this.#current_page_id;
        this.#current_locale = locale ?? this.#current_locale;

        this.#populateSectionsMap();
        this.#populateContentEntriesMap();
    }

}

const txy_repository = new TxyRepository(TXY_METADATA);

export default txy_repository;
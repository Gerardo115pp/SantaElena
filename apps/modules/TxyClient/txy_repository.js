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
            console.debug('Creating TxyPage for page_id:', page_id);
            console.debug('Page data:', metadata.fallback[page_id]);
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

    /**
     * Returns all the existing pages for this site
     * @returns {PageMetadata[]}
     * @readonly    
     */
    get ExistingPages() {
        return this.#existing_pages;
    }

    /**
     * The current set locale
     * @returns {string}
     */
    get CurrentLocale() {
        return this.#current_locale;
    }

    async boot() {
        await this.#loadSiteLocales();

        await this.#loadExistingPages();

        if (this.#booted) {
            console.debug('TxyRepository already booted');
            return;
        }

        await this.#loadPage(this.#metadata.default_page_id, this.#metadata.default_locale);

        this.#booted = (this.#site_locales.length > 0) && (this.#existing_pages.length > 0) && (this.#txy_pages[this.#metadata.default_page_id] !== undefined);

        console.debug('TxyRepository booted:', this.#booted);
        console.debug('Site locales:', this.#site_locales);
        console.debug('Existing pages:', this.#existing_pages);
        console.debug('Loaded pages:', this.#txy_pages);

        return this.#booted;
    }

    /**
     * 
     */

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
     * Returns whether the page_id exists in site
     * @param {string} page_id
     * @returns {boolean}
     */
    pageExists(page_id) {
        let page = this.#existing_pages?.find(p => p.page_id === page_id);
        return page != null;
    }

    /**
     * Returns a txy page by its id. if it's not loaded, checks in #existing_pages and if it's there, loads it.
     * if not, returns undefined
     * @param {string} page_id
     * @returns {Promise<TxyPage>}
     */
    async getPage(page_id) {
        let target_page = this.#txy_pages[page_id];

        if (target_page === undefined) {
            let page_metadata = this.#existing_pages.find(p => p.page_id === page_id);
            if (page_metadata !== undefined) {
                await this.#loadPage(page_id, this.#current_locale);
                target_page = this.#txy_pages[page_id];
            }
        }

        return target_page;
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
     * loads the existing pages for this site
     * @returns {Promise<void>}
     * @private
     */
    async #loadExistingPages() {
        if (this.#existing_pages != null) return;

        this.#existing_pages = await this.#requestExistingPages();
    }

    /**
     * loads the site locales
     * @returns {Promise<void>}
     * @private
     */
    async #loadSiteLocales() {
        if (this.#site_locales != null) return;

        this.#site_locales = await this.#requestSiteLocales();
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
     * Refreshes the existing pages for this site
     * @returns {Promise<void>}
     */
    async refreshExistingPages() {
        let fresh_pages = await this.#requestExistingPages();

        this.#existing_pages = fresh_pages;
    }

    /**
     * Refreshes the site locales
     * @returns {Promise<void>}
     * @private
     */



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
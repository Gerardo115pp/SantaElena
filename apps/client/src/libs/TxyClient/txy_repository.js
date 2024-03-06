import { getPageContent, getExistingPages, getLocales, TxyPage } from "./models/pages";
import TxyContentEntry from "./models/content_entry";
import { TxySection } from "./models/section";
import TXY_METADATA from "./txy_metadata";
import { getTxyUserLocale } from "./txy_utils";

/**
* @typedef {Object} GetContentEntriesParams
 * @property {string} page_id - the page_id of the page
 * @property {string} section_id - the section_id of the section
 * @property {string} entry_id - the entry_id of the entry
*/

/**
 * @typedef {Object} PageMetadata
 * @property {string} page_id
 * @property {string} name
 */

class TxyRepository {
    // Private fields
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
         * A locale to be used by the repository. It's the user locale if it's available, otherwise the default locale
         * @type {string}
         */
        #use_safe_locale;

        /**
         * The existing pages for this site
         * @type {PageMetadata[]}
         */
        #existing_pages;


        /**
         * Whether this repository is ready to be used
         * @type {boolean}
         */
        #booted;

    /**
     * 
     * @param {typeof TXY_METADATA} metadata 
     */
    constructor(metadata) {
        this.#metadata = metadata;
        this.#txy_pages = {};

        // convert the fallback data into Object<pages_id, TxyPage>
        for (let page_id in metadata.fallback) {
            this.#txy_pages[page_id] = new TxyPage(metadata.fallback[page_id]);
        }
        
        
        this.#site_locales = this.#createSiteLocales();
        this.#existing_pages = this.#createExistingPages();

        this.#use_safe_locale = this.#getUseSafeLocale();        


        this.#booted = metadata.fallback !== undefined;
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
        return this.#use_safe_locale;
    }

    async boot() {
        console.debug('Booting TxyRepository');
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
     * From the txy fallbacks. creates the existing pages.
     * @returns {PageMetadata[]}
     */
    #createExistingPages() {
        let existing_pages = [];

        Object.keys(this.#metadata.fallback).forEach(page_id => {
            existing_pages.push({ page_id, name: this.#metadata.fallback[page_id].name });
        });

        return existing_pages;
    }

    /**
     * Creates the site locales array from the fallbacks
     * @returns {string[]}
     */
    #createSiteLocales() {
        let a_page_id = Object.keys(this.#metadata.fallback)[0];
        if (a_page_id === undefined) return [];

        let a_page = this.#txy_pages[a_page_id];

        return Object.keys(a_page.locales_content);
    }

    /**
     * Returns all the data in the txy section for the current page and locale.
     * @param {string} page_id
     * @param {string} section_id 
     * @returns {TxySection}
     */
    getSection(page_id, section_id) {
        // this

        return this.#txy_pages[page_id].locales_content[this.#use_safe_locale].find(s => s.SectionId === section_id);
    }

    /**
     * Returns the best locale prioritizing the user locale
     */
    #getUseSafeLocale() {
        let use_safe_locale = getTxyUserLocale();

        return this.#site_locales.includes(use_safe_locale) ? use_safe_locale : this.#metadata.default_locale;        
    }

    /**
     * Returns a content entry from the repository. if it's not loaded, it will attempt to fetch it from the Txy Service.
     * @param {GetContentEntriesParams} get_content_params
     * @returns {TxyContentEntry}
     */
    async getContentEntry(get_content_params) {
        let page = await this.getPage(get_content_params.page_id);
        if (page == null) return undefined;

        let section = page.locales_content[this.#use_safe_locale].find(s => s.SectionId === get_content_params.section_id);
        if (section === undefined) return undefined;

        return section.getContentEntry(get_content_params.entry_id);
    }

    /**
     * Returns synchronously the content entry from the repository. if it's not loaded, it will NOT attempt to fetch it from the Txy Service.
     * This is useful when asynchronous operations are not allowed.
     * @param {GetContentEntriesParams} get_content_params
     */
    getContentEntrySync(get_content_params) {
        let page = this.#txy_pages[get_content_params.page_id];
        if (page == null) return undefined;

        let section = page.locales_content[this.#use_safe_locale].find(s => s.SectionId === get_content_params.section_id);
        if (section === undefined) return undefined;

        return section.getContentEntry(get_content_params.entry_id);
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
     * Returns whether the page_id exists and is loaded in the repository
     * @param {string} page_id
     * @returns {boolean}
     */
    pageIsLoaded(page_id) {
        return this.#txy_pages[page_id] !== undefined;
    }

    /**
     * Returns a txy page by its id. if it's not loaded, checks in #existing_pages and if it's there, loads it.
     * if not, returns undefined
     * @param {string} page_id
     * @param {boolean} force_load - whether to force the load of a fresh page from the Txy Service
     * @returns {Promise<TxyPage>}
     */
    async getPage(page_id, force_load = false) {
        let target_page = this.#txy_pages[page_id];

        if (target_page === undefined || force_load) {
            let page_metadata = this.#existing_pages.find(p => p.page_id === page_id);
            if (page_metadata !== undefined || force_load) {
                await this.#loadPage(page_id, this.#use_safe_locale);
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
     * Refreshes the site locales
     * @returns {Promise<void>}
     * @private
     */
    async refreshSiteLocales() {
        let fresh_locales = await this.#requestSiteLocales();

        this.#site_locales = fresh_locales;
    }
}

const txy_repository = new TxyRepository(TXY_METADATA);

export default txy_repository;
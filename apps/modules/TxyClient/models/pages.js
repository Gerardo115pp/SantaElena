import { GetPageLocalesRequest, GetLocalesRequest, GetExistingPagesRequest, GetPageContentRequest } from '../../Services/HttpRequests';
import { TxySection } from './section';

/**
 * @typedef {Object} PageMetadata
 * @property {string} page_id
 * @property {string} name
 */

export class TxyPage {
    /**
     * @type {string}
     */
    page_id;
    /**
     * @type {string}
     */
    name;
    /**
     * @type {Object<string, TxySection[]>}
     */
    locales_content;

    constructor({ page_id, name, locales_content }) {
        this.page_id = page_id;
        this.name = name;
        this.locales_content = {};
        this.#loadLocalesContent(locales_content);
    }

    addNewLocale = async locale => {
        const page_content = await getPageContent(this.page_id, locale);

        this.locales_content[locale] = page_content.locales_content[locale];
    }

    /**
     * 
     * @param {Object<string, Object[]>} json_locales_content 
     * @returns {void} 
     */
    #loadLocalesContent = json_locales_content => {
        for (const locale in json_locales_content) {
            this.locales_content[locale] = json_locales_content[locale].map(section => new TxySection(section));
        }
    }
}

/**
 * returns all the locales available for a page.
 * Deprecated in favor of getLocales. because all pages in a txy site should have the same locales available
 * @param {string} page_id
 * @deprecated
 * @returns {Promise<string[]>}
 */
export const getPageLocales = async (page_id) => {
    let page_locales = [];

    const request = new GetPageLocalesRequest(page_id);
  
    const response = await request.do();

    if (response.Ok) {
        page_locales = response.data;
    }

    return page_locales;
};

/**
 * returns all the locales available for the website.
 * @returns {Promise<string[]>}
 */
export const getLocales = async () => {
    let locales = [];

    const request = new GetLocalesRequest();
  
    const response = await request.do();

    if (response.Ok) {
        locales = response.data;
    }

    return locales;
}

export const getExistingPages = async () => {
    let pages = [];

    const request = new GetExistingPagesRequest();
  
    const response = await request.do();

    if (response.Ok) {
        pages = response.data;
    }

    return pages;
}

/**
 * returns a promise that resolves to a TxyPage object
 * @param {string} page_id 
 * @param {string} locale 
 * @returns {Promise<TxyPage>}
 */
export const getPageContent = async (page_id, locale) => {
    let content = null;

    const request = new GetPageContentRequest(page_id, locale);
  
    const response = await request.do();

    if (response.Ok) {
        content = new TxyPage(response.data);
    }

    return content;
};
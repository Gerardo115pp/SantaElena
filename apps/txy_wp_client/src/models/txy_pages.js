import { GetLocalesRequest, GetExistingPagesRequest, GetPageContentRequest } from '@app_modules/Services/HttpRequests';
import { TxyPageSection } from './txy_sections';

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
     * @type {Object<string, TxyPageSection[]>}
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
            this.locales_content[locale] = json_locales_content[locale].map(section => new TxyPageSection(section));
        }
    }
}

export const getLocales = async () => {
    let available_locales = [];

    const request = new GetLocalesRequest();
  
    const response = await request.do();

    if (response.Ok) {
        available_locales = response.data;
    }

    return available_locales;
};

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
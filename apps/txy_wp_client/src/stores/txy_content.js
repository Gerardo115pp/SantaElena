import { writable, Writable } from "svelte/store";
import { PageMetadata } from "@models/txy_pages";

/**
 * The page's locale been selected
 * @type {Writable<string>}
 */
export const selected_locale = writable("");

/**
 * All the locales that exist for the website
 * @type {Writable<string[]>}
 */
export const existing_locales = writable([]);



/**
 * The id of the page selected 
 * @type {Writable<string>}
 */
export const selected_page_id = writable("");

/**
 * The content hash of the page selected
 * @type {Writable<string>}
 */
export const selected_page_content_hash = writable("");


/**
 * Existing pages metadata
 * @type {Writable<PageMetadata[]>}
 */
export const existing_pages_metadata = writable([]);

export const application_information = {
    content_attributes: {},
    content_types: {}
}
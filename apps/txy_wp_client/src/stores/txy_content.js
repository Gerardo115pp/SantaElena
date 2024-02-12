import { writable, Writable } from "svelte/store";

/**
 * The page's locale been selected
 * @type {Writable<string>}
 */
export const selected_locale = writable("");


/**
 * The id of the page selected 
 * @type {Writable<string>}
 */
export const selected_page_id = writable("");

export const application_information = {
    content_attributes: {},
}
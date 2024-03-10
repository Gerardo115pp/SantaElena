import { writable, get } from "svelte/store";
import { ServiceData, ServiceArchiveItem, getSantaElenaServicesArchive } from "@models/Services";
import { browser } from "$app/environment";
/**
 * @typedef {import("svelte/store").Writable<T>} Writable
 * @template T
 */


/**
 * The selected service
 * @type {Writable<ServiceData>}
 */
export const selected_service = writable(null);

/**
 * The two byte code of the user's language
 * @type {string}
 */
let user_locale = browser ? window.navigator.language : "en-US";

/**
 * The price formater
 * @type {Intl.NumberFormat}
 */
export const user_agent_price_formatter = new Intl.NumberFormat(user_locale, {
    style: "currency",
    currency: "MXN"
});
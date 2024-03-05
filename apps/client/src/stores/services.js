import { writable } from "svelte/store";
import { ServiceData } from "@models/Services";
import { browser } from "$app/environment";

/**
 * The selected service
 * @type {Writable<ServiceData>}
 */
export const selected_service = writable(null);

let user_locale = browser ? window.navigator.language : "en-US";

/**
 * The price formater
 * @type {Intl.NumberFormat}
 */
export const user_agent_price_formatter = new Intl.NumberFormat(user_locale, {
    style: "currency",
    currency: "MXN"
});
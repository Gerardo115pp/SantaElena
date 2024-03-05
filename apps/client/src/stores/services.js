import { Writable, writable } from "svelte/store";
import { ServiceData } from "@models/Services";

/**
 * The selected service
 * @type {Writable<ServiceData>}
 */
export const selected_service = writable(null);

/**
 * The price formater
 * @type {Intl.NumberFormat}
 */
export const user_agent_price_formatter = new Intl.NumberFormat(window.navigator.language, {
    style: "currency",
    currency: "MXN"
});
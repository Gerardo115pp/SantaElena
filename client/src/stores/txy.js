import { Writable, writable } from "svelte/store";

/**
 * Whether the txy repository is usable or not
 * @type {Writable<boolean>}
 */
export const txy_ready = writable(false);
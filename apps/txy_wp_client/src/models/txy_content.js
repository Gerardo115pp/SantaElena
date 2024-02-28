import { GetAvailableAttributesRequest, GetAvailableContentTypesRequest, PutContentEntryRequest, PostNewLocaleRequest, PostNewContentEntryRequest } from "@app_modules/Services/HttpRequests";

export class TxyContentEntry {
    /**
     * @type {Object<string, string>}
     */
    #attributes;
    constructor({ entry_id, name, content_type, attributes, content_hash, locale }) {
        this.entry_id = entry_id;
        this.name = name;
        this.content_type = content_type;
        this.#attributes = attributes;
        this.content_hash = content_hash;
        this.locale = locale;
    }

    get Instructions() {
        return this.#attributes.instructions;
    }

    set Instructions(value) {
        this.#attributes.instructions = value;
    }

    get Text() {
        return this.#attributes.text;
    }

    set Text(value) {
        this.#attributes.text = value;
    }

    get Href() {
        return this.#attributes.href;
    }

    set Href(value) {
        this.#attributes.href = value;
    }

    get MediaUrl() {
        return this.#attributes.media_url;
    }

    set MediaUrl(value) {
        this.#attributes.media_url = value;
    }

    /**
     * Compares this content entry to another. returns true if they are the same, false otherwise
     * @param {TxyContentEntry} other
     * @returns {boolean}
     */
    Equals(other)  {
        let are_equal = this.entry_id === other.entry_id;

        are_equal = are_equal && this.name === other.name;
        are_equal = are_equal && this.content_type === other.content_type;
        are_equal = are_equal && this.Text === other.Text;
        are_equal = are_equal && this.Href === other.Href;
        are_equal = are_equal && this.MediaUrl === other.MediaUrl;
        are_equal = are_equal && this.Instructions === other.Instructions;

        return are_equal;
    }

    /**
     * Creates an exact copy of the current instance
     * @returns {TxyContentEntry}
     */
    Copy() {
        let new_attributes = { ...this.#attributes };
        return new TxyContentEntry({ ...this, attributes: new_attributes });
    }

    /**
     * Generates a new content hash based on the current content states.
     * it does this by concatenating entry_id, name. if it's a text content, it also concatenates the text + href.
     * if it's any other type, it concatenates the media_url. strings are joined by a '+' character.
     * @returns {Promise<string>}
     * @deprecated
     */
    #updateContentHash = async () => {
        let new_hash = `${this.entry_id}+${this.name}`;

        if (this.content_type === "text") {
            new_hash += `+${this.#attributes.text}+${this.#attributes.href}`;
        } else {
            new_hash += `+${this.#attributes.media_url}`;
        }

        const msg_uint8 = new TextEncoder().encode(new_hash);
        const hash_buffer = await crypto.subtle.digest('SHA-1', msg_uint8);
        const hash_array = Array.from(new Uint8Array(hash_buffer));
        const hash_hex = hash_array.map(b => b.toString(16).padStart(2, '0')).join('');
        
        return hash_hex;
    }   

    /**
     * Saves the current content entry to the server
     * @async
     * @returns {Promise<boolean>}
     */
    PushUpdates = async () => {
        const json_values = {
            entry_id: this.entry_id,
            name: this.name,
            content_type: this.content_type,
            attributes: this.#attributes,
            content_hash: this.content_hash,
            locale: this.locale
        };

        const request = new PutContentEntryRequest(json_values);
        const response = await request.do();

        return response.Ok;
    }
}

export const getAvailableAttributes = async () => {
    let attributes = {};

    const request = new GetAvailableAttributesRequest();

    const response = await request.do();

    if (response.Ok) {
        attributes = response.data;
    }

    return attributes;
}

/**
 * Retrieves all the available content types for content entries.
 * @async
 * @returns {Promise<Object<string, string>>}
 */
export const getAvailableContentTypes = async () => {
    let content_types = {};

    const request = new GetAvailableContentTypesRequest();

    const response = await request.do();

    if (response.Ok) {
        content_types = response.data;
    }

    return content_types;
}

/**
 * Creates a new locale on the server
 * @async
 * @param {string} locale
 * @returns {Promise<boolean>}
 */
export const createNewLocale = async locale => {
    const request = new PostNewLocaleRequest(locale);

    const response = await request.do();

    return response.Created;
}

/**
 * @typedef {Object} NewContentEntryParams  
 * @property {string} entry_id
 * @property {string} name
 * @property {string} content_type
 * @property {string} section_id
 * @property {string} page_id
 */

/**
 * Creates a new content entry on the server. It returns the content_hash of the page where the content entry was created. which considers the new content entry.
 * @async
 * @param {NewContentEntryParams} params
 * @returns {Promise<string>}
 */
export const createNewContentEntry = async params => {
    let new_content_hash = "";
    const request = new PostNewContentEntryRequest(params.entry_id, params.name, params.content_type, params.section_id, params.page_id);

    const response = await request.do();

    if (response.Created) {
        new_content_hash = response.data?.content_hash;
    }

    return new_content_hash;    
}
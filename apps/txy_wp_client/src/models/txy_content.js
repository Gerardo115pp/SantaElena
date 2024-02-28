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

    /**
     * @returns {Object<string, string>}
     * @readonly
     */
    get Attributes() {
        return this.#attributes;
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
        // console.debug("Entry ID is equal: ", are_equal)

        are_equal = are_equal && this.name === other.name;
        // console.debug("Name is equal: ", are_equal)
        are_equal = are_equal && this.content_type === other.content_type;
        // console.debug("Content type is equal: ", are_equal)
        are_equal = are_equal && this.Text === other.Text;
        // console.debug("Text is equal: ", are_equal)
        are_equal = are_equal && this.Href === other.Href;
        // console.debug("Href is equal: ", are_equal)
        are_equal = are_equal && this.MediaUrl === other.MediaUrl;
        // console.debug("Media URL is equal: ", are_equal)
        are_equal = are_equal && this.Instructions === other.Instructions;
        // console.debug("Instructions are equal: ", are_equal)

        // console.log("This: ", JSON.stringify(this, null, 4));
        // console.log("Other: ", JSON.stringify(other, null, 4));

        // console.debug("This.Attributes: ", JSON.stringify(this.#attributes, null, 4));
        // console.debug("Other.Attributes: ", JSON.stringify(other.Attributes, null, 4));

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
     * Overwrites the current content entry with the values of another content entry
     * @param {TxyContentEntry} other
     * @returns {void}
     */
    OverwriteWith(other) {
        this.entry_id = other.entry_id;
        this.name = other.name;
        this.content_type = other.content_type;
        this.#attributes = { ...other.Attributes };
        this.content_hash = other.content_hash;
        this.locale = other.locale;
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
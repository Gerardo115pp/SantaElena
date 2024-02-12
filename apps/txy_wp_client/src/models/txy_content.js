import { GetAvailableAttributesRequest } from "@app_modules/Services/HttpRequests";

export class TxyContentEntry {
    /**
     * @type {Object<string, string>}
     */
    #attributes;
    constructor({ entry_id, name, content_type, attributes, content_hash }) {
        this.entry_id = entry_id;
        this.name = name;
        this.content_type = content_type;
        this.#attributes = attributes;
        this.content_hash = content_hash;
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
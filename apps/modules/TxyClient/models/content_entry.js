import { GetAvailableAttributesRequest, PutContentEntryRequest, GetFreshContentEntryRequest } from "../../Services/HttpRequests";

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
        return this.#attributes.text ?? "";
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
     * The attributes of the content entry
     * @type {Object<string, string>}
     * @readonly
     */
    get Attributes() {
        return this.#attributes;
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

    /**
     * Gets the most recent version of the content entry from the server. If the content is the same as the current instance, the data will be null
     * @async
     * @returns {Promise<TxyContentEntry|null>}
     */
    GetFreshCopy = async () => {
        const request = new GetFreshContentEntryRequest(this.entry_id, this.locale, this.content_hash);
        const response = await request.do();

        if (response.Ok) {
            return new TxyContentEntry(response.data);
        }

        return null;
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

export default TxyContentEntry;
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

    get Text() {
        return this.#attributes.text;
    }

    get Href() {
        return this.#attributes.href;
    }

    get MediaUrl() {
        return this.#attributes.media_url;
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
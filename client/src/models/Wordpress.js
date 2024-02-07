import { GetWordpressMediaByIdRequest } from "@libs/Services/HttpRequests";

/**
* @typedef {Object} WordpressImageMeta
 * @property {number} aperture
 * @property {string} camera
 * @property {string} credit
 * @property {string} caption
 * @property {string} created_timestamp
 * @property {string} copyright
*/

/**
* @typedef {Object} WordpressImageSize
 * @property {number} file
 * @property {number} width
 * @property {number} height
 * @property {string} mime_type
 * @property {string} source_url
*/

/**
* @typedef {Object} WordpressImageSizes
 * @property {WordpressImageSize} full
 * @property {WordpressImageSize} large
 * @property {WordpressImageSize} medium
 * @property {WordpressImageSize} thumbnail
*/

/**
* @typedef {Object} WordpressMediaDetails
 * @property {string} file
 * @property {number} filesize
 * @property {string} height
 * @property {string} width
 * @property {WordpressImageSizes} sizes
 * @property {WordpressImageMeta} image_meta
*/

export class WordpressMedia {
        /** @type {number} */
        #id;
        /** @type {string} */
        #alt_text;
        /** @type {string} */
        #author;
        /** @type {Object<string, string>} */
        #caption;
        /** @type {string} */
        #comment_status;
        /** @type {string} */
        #date;
        /** @type {string} */
        #date_gmt;
        /** @type {Object<string, string>} */
        #description;
        /** @type {Object<string, string>} */
        #guid;
        /** @type {string} */
        #link;
        /** @type {WordpressMediaDetails} */
        #media_details;
        /** @type {string} */
        #media_type;
        /** @type {string} */
        #mime_type;
        /** @type {string} */
        #modified;
        /** @type {string} */
        #modified_gmt;
        /** @type {string} */
        #ping_status;
        /** @type {string} */
        #slug;
        /** @type {string} */
        #source_url;
        /** @type {string} */
        #status;
        /** @type {string} */
        #template;
        /** @type {Object<string, string>} */
        #title;
        /** @type {string} */
        #type;
    
    constructor(media_data) {
        this.#id = media_data.id;
        this.#title = media_data.title.rendered;
        this.#alt_text = media_data.alt_text ?? this.#title;
        this.#author = media_data.author;
        this.#caption = media_data.caption;
        this.#comment_status = media_data.comment_status;
        this.#date = media_data.date;
        this.#date_gmt = media_data.date_gmt;
        this.#description = media_data.description;
        this.#guid = media_data.guid;
        this.#link = media_data.link;
        this.#media_details = media_data.media_details;
        this.#media_type = media_data.media_type;
        this.#mime_type = media_data.mime_type;
        this.#modified = media_data.modified;
        this.#modified_gmt = media_data.modified_gmt;
        this.#ping_status = media_data.ping_status;
        this.#slug = media_data.slug;
        this.#source_url = media_data.source_url;
        this.#status = media_data.status;
        this.#template = media_data.template;
        this.#type = media_data.type;
    }

    get Id() {
        return this.#id;
    }

    get SourceUrl() {
        return this.#source_url;
    }

    get LargeUrl() {
        return this.#media_details?.sizes?.large?.source_url;
    }

    get MediumUrl() {
        return this.#media_details?.sizes?.medium?.source_url;
    }

    get ThumbnailUrl() {
        return this.#media_details?.sizes?.thumbnail?.source_url;
    }
}

export const getWordpressMediaById = async (id) => {
    const response = await new GetWordpressMediaByIdRequest(id).do();

    let wordpress_media = null;

    if (response.Ok) {
        wordpress_media = new WordpressMedia(response.data);
    }
    
    return wordpress_media;
}
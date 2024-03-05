import { GetAllPostsRequest } from "@app_modules/Services/HttpRequests";

export class WordpressPost {
    /** @type {number} */
    #id;
    /** @type {string} */
    #date;
    /** @type {string} */
    #date_gmt;
    /** @type {string} */
    #guid;
    /** @type {string} */
    #modified;
    /** @type {string} */
    #modified_gmt;
    /** @type {string} */
    #slug;
    /** @type {string} */
    #status;
    /** @type {string} */
    #type;
    /** @type {string} */
    #link;
    /** @type {string} */
    #title;
    /** @type {string} */
    #content;
    /** @type {string} */
    #excerpt;
    /** @type {number} */
    #author;
    /** @type {number} */
    #featured_media;
    /** @type {string} */
    #comment_status;
    /** @type {string} */
    #ping_status;
    /** @type {string} */
    #template;
    /** @type {string} */
    #format;
    /** @type {Object<string, string>} */
    #meta;
    /** @type {number[]} */
    #categories;
    /** @type {number[]} */
    #tags;

    constructor(post_data) {
        this.#id = post_data.id;
        this.#date = post_data.date;
        this.#date_gmt = post_data.date_gmt;
        this.#guid = post_data.guid.rendered;
        this.#modified = post_data.modified;
        this.#modified_gmt = post_data.modified_gmt;
        this.#slug = post_data.slug;
        this.#status = post_data.status;
        this.#type = post_data.type;
        this.#link = post_data.link;
        this.#title = post_data.title.rendered;
        this.#content = post_data.content.rendered;
        this.#excerpt = post_data.excerpt.rendered;
        this.#author = post_data.author;
        this.#featured_media = post_data.featured_media;
        this.#comment_status = post_data.comment_status;
        this.#ping_status = post_data.ping_status;
        this.#template = post_data.template;
        this.#format = post_data.format;
        this.#meta = post_data.meta;
        this.#categories = post_data.categories;
        this.#tags = post_data.tags;
    }

    get Title() {
        return this.#title;
    }

    get Content() {
        return this.#content;
    }

    get Excerpt() {
        return this.#excerpt;
    }

    get Date() {
        return this.#date;
    }

    get Link() {
        return this.#link;
    }
}

/**
 * Returns a list with all the posts in the wordpress cms   
 * @async
 * @returns {Promise<WordpressPost[]>}
 */
export const getAllPosts = async () => {
    const request = new GetAllPostsRequest();
    const response = await request.do();
    let posts = [];

    if (response.Ok) {
        posts = response.data.map(post => new WordpressPost(post));
    }

    return posts;
}

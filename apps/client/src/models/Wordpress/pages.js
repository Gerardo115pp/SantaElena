import { WordpressPost } from "./posts";
import { GetPageByIdRequest } from "@libs/Services/HttpRequests";

export class WordpressPage extends WordpressPost {
    constructor(data) {
        super(data);
    }
}

/**
 * Fetches a page by its ID and returns a WordpressPage object
 * @param {number} page_id
 * @returns {Promise<WordpressPage>}
 */
export const getPageById = async (page_id) => {
    /** @type {WordpressPage} */
    let wp_page = null;

    const request = new GetPageByIdRequest(page_id);

    const response = await request.do();
    
    if (response.Ok) {
        wp_page = new WordpressPage(response.data);
    }

    return wp_page;
}
import { TxyContentEntry } from "./txy_content";
import { PostNewSectionRequest } from "@app_modules/Services/HttpRequests";

export class TxyPageSection {
    constructor({ section_id, name, content }) {
        this.section_id = section_id;
        this.name = name;
        this.content = this.loadContent(content);   
    }

    loadContent = json_content => {
        const new_content = json_content.map(entry => new TxyContentEntry(entry));
        return new_content;
    }
}

/**
 * Creates a new section on the given page
 * @async
 * @param {string} section_id
 * @param {string} section_name
 * @param {string} page_id
 * @returns {Promise<string>} - the content hash of the page after the new section has been added
 */
export const createNewSection = async (section_id, section_name, page_id) => {
    let content_hash = '';

    const new_section_request = new PostNewSectionRequest(section_name, section_id, page_id);
    const response = await new_section_request.do();

    if (response.Created) {
        content_hash = response.data.content_hash;
    }

    return content_hash;
}

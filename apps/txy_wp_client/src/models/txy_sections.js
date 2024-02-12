import { TxyContentEntry } from "./txy_content";

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
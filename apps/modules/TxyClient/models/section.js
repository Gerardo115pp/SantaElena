import TxyContentEntry from "./content_entry";

export class TxySection {
    /**
     * @type {string}
     */
    #name;
    /**
     * @type {string}
     */
    #section_id;
    /**
     * @type {Object<string, TxyContentEntry>}
     */
    #content_entries;

    constructor({ name, section_id, content }) {
        this.#name = name;
        this.#section_id = section_id;
        this.#content_entries = {};

        for (const entry of content) {
            let new_entry = new TxyContentEntry(entry);
            this.#content_entries[new_entry.entry_id] = new_entry;
        }
    }

    /**
     * The id of the section
     * @type {string}
     * @readonly
     */
    get SectionId() {
        return this.#section_id;
    }

    /**
     * The name of the section
     * @type {string}
     * @readonly
     */
    get Name() {
        return this.#name;
    }
    
    /**
     * The content entries for this section
     * @type {TxyContentEntry[]}
     * @readonly
     */
    get ContentEntries() {
        let content_entries = Object.values(this.#content_entries);
        return content_entries;
    }

    /**
     * Returns a content entry by its id or undefined if it does not exist
     * @param {string} entry_id 
     * @returns {TxyContentEntry}
     */
    getContentEntry(entry_id) {
        return this.#content_entries[entry_id];
    }
}
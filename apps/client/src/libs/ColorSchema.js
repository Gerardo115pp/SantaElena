import { get } from "svelte/store";
import { page } from "$app/stores";


/**
 * @this {ColorSchema}
 */
function defineNavbarColorSchema() {
    let theme_subject_selector = this.element_selector ?? supported_components.NAVBAR;

    let theme_subject = document.querySelector(theme_subject_selector);

    if (theme_subject === null) {
        theme_subject = document.body;
    }

    theme_subject.style.setProperty(`--color-schema-primary`, this.color);
    theme_subject.style.setProperty(`--color-schema-surface`, this.background);
    theme_subject.style.setProperty(`--color-schema-border`, this.border);
    theme_subject.style.setProperty(`--color-schema-contrast`, this.contrast);

    theme_subject.setAttribute('data-schema-theme', this.theme_name);
}

export class ColorSchema {
  constructor(color, contrast, theme_name="default", element_selector=null) {
    this.color = color;
    this.contrast = contrast;
    this.background = contrast;
    this.border = color;
    this.theme_name = theme_name;
    this.element_selector = element_selector;
  }

  define = () => {
    throw new Error('ColorSchema.define() is not implemented');
  }
}

export const supported_components = {
    NAVBAR: 'NAVBAR'
}

export function registerSupportedComponent(component_name, element_selector) {
    if (supported_components[component_name] === undefined) {
        throw new Error(`component ${component_name} is not supported`);
    }

    supported_components[component_name] = element_selector;
}
/**
 * 
 * @param {HTMLElement} dom_element 
 * @returns {boolean}
 */
function sectionReachTopScreen(dom_element) {
    if (dom_element === undefined) {
        return false;
    }

    const element_rect = dom_element.getBoundingClientRect();

    const element_top = element_rect.top;

    const viewport_height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    let reached_top = element_top <= viewport_height * .14;

    return reached_top;
}

export function checkLastComponentCollision(sections_color_schemas, current_hash, check_every=50) {
    // FIXME: this is a temporary fix for ssr compatibility. implement uri verification
    console.log(`current hash ${current_hash} is equal to site_page ${get(location)}`)
    if (current_hash !== current_hash) {
        console.log(`current hash ${current_hash} is not equal to site_page ${get(location)}`)
        return;
    }

    this.skipped_sections = this.skipped_sections !== undefined ? this.skipped_sections : check_every;
    if (this.skipped_sections < check_every) {
        this.skipped_sections++;
        return;
    }

    this.skipped_sections = 0;

    /**
     * @type {SectionListenerParams[]}
     */
    const sections = Object.values(sections_color_schemas);

    if (sections.length === 0) {
        return;
    }

    let last_collided_section = sections[0];
    
    for (let section of sections) {
        if (sectionReachTopScreen(section.ref)) {
            if (section.ord > last_collided_section.ord) {
                last_collided_section = section;
            }
        }
    }

    last_collided_section.color_schema.define();
}

/**
* @typedef {Object} SectionListenerParams
 * @property {number} ord
 * @property {string} section_id
 * @property {HTMLElement} ref
 * @property {ColorSchema} color_schema
*/

/**
 * @callback SectionListenerUnsubscriber - Disables the collision listener
 * @returns {void}
*/

/**
 * Starts watching the collisions of the provided sections
 * @param {Object<string, SectionListenerParams>} sections_color_schemas 
 * @returns {SectionListenerUnsubscriber}
 */
export const watchCollisions = (sections_color_schemas) => {
    let current_hash = get(page).url;

    const collision_listener = checkLastComponentCollision.bind({}, sections_color_schemas, current_hash);

    window.addEventListener('scroll', collision_listener);

    return () => {
        window.removeEventListener('scroll', collision_listener);
    }
}

// This is createColorSchema function
export default ({color, contrast, theme}, component) => {
    let color_schema = new ColorSchema(color, contrast, theme);

    switch (component) {
        case supported_components.NAVBAR:
            color_schema.define = defineNavbarColorSchema.bind(color_schema);
            break;
        default:
            color_schema = null;
            break;
    }

    return color_schema;
} 


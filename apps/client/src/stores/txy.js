import {  writable } from "svelte/store";

/**
 * Whether the txy repository is usable or not
 * @type {Writable<boolean>}
 */
export const txy_ready = writable(false);


/*=============================================
=            Txy IDs            =
=============================================*/

const TXY_PAGES = {
    HOME_PAGE: "santa-elena-home-page",
    ABOUT_PAGE: "santa-elena-about-us-page",
    NAVIGATION_OPTIONS: "santa-elena-navigation-options",
    BLOG_PAGE: "santa-elena-blog-page"
};

const TXY_SECTIONS = {
    HOME_HERO: "stehp-hero-section",
    HOME_ABOUT: "stehp-about-section",
    HOME_PARALLAX: "stehp-parallax-divisor-section",
    HOME_SERVICES: "stehp-services-section",
    HOME_CONTACT: "stehp-contact-section",
    ABOUT_HEADLINE: "about-us-page-headline",
    NAVIGATION_OPTIONS: "seno-navbar-options",
    BLOG_HEADLINE: "santa-elena-blog-header"
};

const TXY_CONTENT_ENTRIES = {
    HOME_HERO_SUBHEADLINE: "stehp-hero-section-subheadline",
    HOME_ABOUT_HEADLINE_ONE: "stehp-as-card-one-title",
    HOME_ABOUT_CONTENT_ONE: "stehp-as-card-one-content",
    HOME_ABOUT_HEADLINE_TWO: "stehp-as-card-two-title",
    HOME_ABOUT_CONTENT_TWO: "stehp-as-card-two-content",
    HOME_PARALLAX_HEADLINE: "stehp-pds-title",
    HOME_SERVICES_INSTRUCTIONS: "stehp-sc-instructions",
    HOME_CONTACT_WHATSAPP: "stehp-cc-whatsapp-redirection",
    HOME_SOCIAL_FACEBOOK: "stehp-cc-social-list-facebook",
    HOME_SOCIAL_INSTAGRAM: "stehp-cc-social-list-instagram",
    ABOUT_HEADER_HEADLINE: "auph-header-headline",
    ABOUT_HEADER_SUBHEADLINE: "auph-subheadline",
    NAVIGATION_OPTIONS_HOME: "seno-home-redirect",
    NAVIGATION_OPTIONS_ABOUT: "seno-about-redirect",
    NAVIGATION_OPTIONS_BLOG: "seno-blog-redirect",
    BLOG_HEADER: "sebh-headline",
    BLOG_SUBHEADER: "sebh-subheadline"
};

Object.freeze(TXY_SECTIONS);
Object.freeze(TXY_PAGES);
Object.freeze(TXY_CONTENT_ENTRIES);

/**
 * @typedef {Object} GetContentEntriesParams
 * @property {string} page_id - the page_id of the page
 * @property {string} section_id - the section_id of the section
 * @property {string} entry_id - the entry_id of the entry
 */

export const get_content_entries_params = {
    HOME_HERO_SUBHEADLINE: {
        page_id: TXY_PAGES.HOME_PAGE,
        section_id: TXY_SECTIONS.HOME_HERO,
        entry_id: TXY_CONTENT_ENTRIES.HOME_HERO_SUBHEADLINE
    },
    HOME_ABOUT_HEADLINE_ONE: {
        page_id: TXY_PAGES.HOME_PAGE,
        section_id: TXY_SECTIONS.HOME_ABOUT,
        entry_id: TXY_CONTENT_ENTRIES.HOME_ABOUT_HEADLINE_ONE
    },
    HOME_ABOUT_CONTENT_ONE: {
        page_id: TXY_PAGES.HOME_PAGE,
        section_id: TXY_SECTIONS.HOME_ABOUT,
        entry_id: TXY_CONTENT_ENTRIES.HOME_ABOUT_CONTENT_ONE
    },
    HOME_ABOUT_HEADLINE_TWO: {
        page_id: TXY_PAGES.HOME_PAGE,
        section_id: TXY_SECTIONS.HOME_ABOUT,
        entry_id: TXY_CONTENT_ENTRIES.HOME_ABOUT_HEADLINE_TWO
    },
    HOME_ABOUT_CONTENT_TWO: {
        page_id: TXY_PAGES.HOME_PAGE,
        section_id: TXY_SECTIONS.HOME_ABOUT,
        entry_id: TXY_CONTENT_ENTRIES.HOME_ABOUT_CONTENT_TWO
    },
    HOME_PARALLAX_HEADLINE: {
        page_id: TXY_PAGES.HOME_PAGE,
        section_id: TXY_SECTIONS.HOME_PARALLAX,
        entry_id: TXY_CONTENT_ENTRIES.HOME_PARALLAX_HEADLINE
    },
    HOME_SERVICES_INSTRUCTIONS: {
        page_id: TXY_PAGES.HOME_PAGE,
        section_id: TXY_SECTIONS.HOME_SERVICES,
        entry_id: TXY_CONTENT_ENTRIES.HOME_SERVICES_INSTRUCTIONS
    },
    HOME_CONTACT_WHATSAPP: {
        page_id: TXY_PAGES.HOME_PAGE,
        section_id: TXY_SECTIONS.HOME_CONTACT,
        entry_id: TXY_CONTENT_ENTRIES.HOME_CONTACT_WHATSAPP
    },
    HOME_SOCIAL_FACEBOOK: {
        page_id: TXY_PAGES.HOME_PAGE,
        section_id: TXY_SECTIONS.HOME_CONTACT,
        entry_id: TXY_CONTENT_ENTRIES.HOME_SOCIAL_FACEBOOK
    },
    HOME_SOCIAL_INSTAGRAM: {
        page_id: TXY_PAGES.HOME_PAGE,
        section_id: TXY_SECTIONS.HOME_CONTACT,
        entry_id: TXY_CONTENT_ENTRIES.HOME_SOCIAL_INSTAGRAM
    },
    ABOUT_HEADER_HEADLINE: {
        page_id: TXY_PAGES.ABOUT_PAGE,
        section_id: TXY_SECTIONS.ABOUT_HEADLINE,
        entry_id: TXY_CONTENT_ENTRIES.ABOUT_HEADER_HEADLINE
    },
    ABOUT_HEADER_SUBHEADLINE: {
        page_id: TXY_PAGES.ABOUT_PAGE,
        section_id: TXY_SECTIONS.ABOUT_HEADLINE,
        entry_id: TXY_CONTENT_ENTRIES.ABOUT_HEADER_SUBHEADLINE
    },
    NAVIGATION_OPTIONS_HOME: {
        page_id: TXY_PAGES.NAVIGATION_OPTIONS,
        section_id: TXY_SECTIONS.NAVIGATION_OPTIONS,
        entry_id: TXY_CONTENT_ENTRIES.NAVIGATION_OPTIONS_HOME
    },
    NAVIGATION_OPTIONS_ABOUT: {
        page_id: TXY_PAGES.NAVIGATION_OPTIONS,
        section_id: TXY_SECTIONS.NAVIGATION_OPTIONS,
        entry_id: TXY_CONTENT_ENTRIES.NAVIGATION_OPTIONS_ABOUT
    },
    NAVIGATION_OPTIONS_BLOG: {
        page_id: TXY_PAGES.NAVIGATION_OPTIONS,
        section_id: TXY_SECTIONS.NAVIGATION_OPTIONS,
        entry_id: TXY_CONTENT_ENTRIES.NAVIGATION_OPTIONS_BLOG
    },
    BLOG_HEADER: {
        page_id: TXY_PAGES.BLOG_PAGE,
        section_id: TXY_SECTIONS.BLOG_HEADLINE,
        entry_id: TXY_CONTENT_ENTRIES.BLOG_HEADER
    },
    BLOG_SUBHEADER: {
        page_id: TXY_PAGES.BLOG_PAGE,
        section_id: TXY_SECTIONS.BLOG_HEADLINE,
        entry_id: TXY_CONTENT_ENTRIES.BLOG_SUBHEADER
    }
}




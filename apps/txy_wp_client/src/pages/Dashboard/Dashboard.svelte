<script>
    import LiberyHeadline from "@app_modules/components/LiberyUI/LiberyHeadline.svelte";
    import TxyContextMenu from "@components/contextmenu/TxyContextMenu.svelte";
    import PagesSelector from "@components/PagesControllers/PagesSelector.svelte";
    import LocaleSwitch from "@components/LocalesControllers/LocaleSwitch.svelte";
    import { getPageContent, TxyPage } from "@models/txy_pages";
    import { TxyPageSection } from "@models/txy_sections";
    import { selected_locale, selected_page_id } from "@stores/txy_content";
    import { onMount } from "svelte";
    import PageEditor from "./sub-components/PageEditor.svelte";
    import { blur } from "svelte/transition";
    import { circIn } from "svelte/easing";

    /*=============================================
    =            Properties            =
    =============================================*/

        const home_page_id = window.txy?.home_page_txy_id; // defined by the php server

        /**
         * a hash map of the loaded pages
         * @type {Map<string, TxyPage>}
         */
        let pages = new Map();

        /**
         * a list of page sections that will be passed down to the editor
         * @type {TxyPageSection[]}
         */
        let page_sections = [];

        /**
         * The position where to show the context menu
         */
        let context_menu_position = null;

        /**
         * The dashboard element
         * @type {HTMLDivElement}
         */
        let dashboard_element;

        selected_page_id.set(home_page_id);

        let locale_selected_unsubscribe;
        

    /*=====  End of Properties  ======*/

    onMount(() => {
        verifyInstallation();

        locale_selected_unsubscribe = selected_locale.subscribe(new_locale => loadPageContent($selected_page_id, new_locale));
    });

    /*=============================================
    =            Methods            =
    =============================================*/

        /**
         * Handles the context menu event
         * @param {MouseEvent} e
         */
        const handleContextMenu = e => {
            e.preventDefault();

            if (context_menu_position !== null) {
                context_menu_position = null;
                return;
            }

            let body_rect = document.body.getBoundingClientRect();
            let dashboard_rect = dashboard_element.getBoundingClientRect();

            let x = e.clientX - (body_rect.width - dashboard_rect.width);
            let y = e.clientY - dashboard_rect.top;

            console.debug("Context menu position: ", { x, y });
            context_menu_position = { x, y };
        }

        const loadPageContent = async (page_id, locale) => {
            if (page_id === "" || locale === "") return;

            let selected_page = pages.get(page_id);
            
            // Load page if it's not loaded
            if (selected_page === undefined) {
                selected_page = await getPageContent(page_id, locale);
                if (selected_page === null) {
                    console.error(`Page with id ${page_id} not found`);
                    return;
                }
                pages.set(page_id, selected_page);
            }

            // Load the content locale if it's not loaded
            if (selected_page.locales_content[locale] === undefined) {
                await selected_page.addNewLocale(locale);
            }

            console.debug("Selected page: ", selected_page);

            page_sections = selected_page.locales_content[locale];
        }
    
        const verifyInstallation = () => {
            if (home_page_id === undefined) {
                throw new Error("txy.home_page_txy_id is not defined");
            }
        }
    
    /*=====  End of Methods  ======*/
    
    
</script>

<div bind:this={dashboard_element} id="txy-dashboard-screen">
    <TxyContextMenu bind:position={context_menu_position} />
    <header id="tds-top-header" class:adebug={false} on:contextmenu={handleContextMenu} role="menubar" tabindex="0">
        <article id="tds-th-informational-section" class="tds-th-column">
            <div id="tds-th-text-content-wrapper">
                <LiberyHeadline headline_text="Txy Content Manager" forced_font_size="var(--font-size-h3)" headline_color="var(--grey-1)"/>
                <p id="tds-th-is-introduction">
                    Here you an edit the content of your website. You can select any of the pages not managed by wordpress, see thier sections and all the content you can edit. changes will be visible in the website immediately.
                </p>
            </div>
            <div role="group" id="tds-th-is-controls">
                <div class="tds-th-control">
                    <LocaleSwitch />
                </div>
            </div>
        </article>
        <!-- TODO: When you decide what you want to do with this space area, change the id name -->
        <div id="tds-th-undefined-section" class="hide-on-mobile tds-th-column"></div>
    </header>
    <PagesSelector />
    {#key page_sections}
        <div in:blur={{delay: 200, opacity: 0, duration: 1000, easing: circIn }} class="page-editor-wrapper">
            <PageEditor {page_sections} />
        </div>
    {/key}
</div>

<style>
    #txy-dashboard-screen {
        position: relative;
    }

    header#tds-top-header {
        display: grid;
        grid-template-columns: 50% 50%;
        grid-auto-rows: 50dvh;
    }

    .tds-th-column {
        padding: var(--spacing-4);
    }

    #tds-th-informational-section {
        display: flex;
        flex-direction: column;
        row-gap: var(--spacing-3);
    }

    #tds-th-text-content-wrapper {
        display: flex;
        flex-direction: column;
        row-gap: var(--spacing-2);
    }

    #tds-th-is-introduction {
        font-size: var(--font-size-p-small);
        line-height: 1.5;
        font-weight: 300;
    }

    
    /*=============================================
    =            Page Editor            =
    =============================================*/
    
        .page-editor-wrapper {
            padding: var(--spacing-5) 0;
        }
    
    /*=====  End of Page Editor  ======*/
    
    
</style>
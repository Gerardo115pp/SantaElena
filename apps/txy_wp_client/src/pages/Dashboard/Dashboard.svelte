<script>
    import LiberyHeadline from "@app_modules/components/LiberyUI/LiberyHeadline.svelte";
    import PagesSelector from "@components/PagesControllers/PagesSelector.svelte";
    import LocaleSwitch from "@components/LocalesControllers/LocaleSwitch.svelte";
    import { getPageContent, TxyPage } from "@models/txy_pages";
    import { TxyPageSection } from "@models/txy_sections";
    import { selected_locale, selected_page_id } from "@stores/txy_content";
    import { onMount } from "svelte";
    import PageEditor from "./sub-components/PageEditor.svelte";

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

            page_sections = selected_page.locales_content[locale];
        }
    
        const verifyInstallation = () => {
            if (home_page_id === undefined) {
                throw new Error("txy.home_page_txy_id is not defined");
            }
        }
    
    /*=====  End of Methods  ======*/
    
    
</script>

<div id="txy-dashboard-screen">
    <header id="tds-top-header" class:adebug={false}>
        <article id="tds-th-informational-section" class="tds-th-column">
            <div id="tds-th-text-content-wrapper">
                <LiberyHeadline headline_text="Txy Content Manager" forced_font_size="var(--font-size-h3)" headline_color="var(--grey-1)"/>
                <p id="tds-th-is-introduction">
                    Here you an edit the content of your website. You can select any of the pages not managed by wordpress, see thier sections and all the content you can edit. changes will be visible in the website immediately.
                </p>
            </div>
            <div role="group" id="tds-th-is-controls">
                <div class="tds-th-control">
                    <LocaleSwitch page_id={$selected_page_id} />
                </div>
            </div>
        </article>
        <!-- TODO: When you decide what you want to do with this space area, change the id name -->
        <div id="tds-th-undefined-section" class="hide-on-mobile tds-th-column"></div>
    </header>
    <PagesSelector />
    <div class="page-editor-wrapper">
        <PageEditor {page_sections} />
    </div>
</div>

<style>
    header#tds-top-header {
        display: grid;
        grid-template-columns: 50% 50%;
        grid-auto-rows: 40cqh;
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
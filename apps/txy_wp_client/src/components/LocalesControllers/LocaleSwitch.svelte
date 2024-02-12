<script>
    import { getPageLocales } from "@models/txy_pages";
    import { onMount } from "svelte";
    import LocaleItem from "./LocaleItem.svelte";
    import { selected_locale } from "@stores/txy_content";

    
    /*=============================================
    =            Properties            =
    =============================================*/
    
        /**
         * The page id of which we want to get the locales
         */
        export let page_id;

        /**
         * The locales of the page
         */
        let page_locales = [];

    /*=====  End of Properties  ======*/

    onMount(() => {
        updatePageLocales(page_id).then(locales => {
            if (locales.length > 0) {
                selected_locale.set(locales[0]);
            }
        });
    });
    
    
    /*=============================================
    =            Methods            =
    =============================================*/
    
        const updatePageLocales = async page_id => {
            page_locales = await getPageLocales(page_id);
            return page_locales;
        }
    
    /*=====  End of Methods  ======*/
</script>

<menu id="twp-locale-switch">
    {#each page_locales as locale}
        <LocaleItem {locale} />
    {/each}
</menu>

<style>
    menu#twp-locale-switch {
        display: flex;
        gap: 0;
    }
</style>
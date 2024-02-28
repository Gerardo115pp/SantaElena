<script>
    import { getLocales } from "@models/txy_pages";
    import { onMount } from "svelte";
    import LocaleItem from "./LocaleItem.svelte";
    import { selected_locale, existing_locales  } from "@stores/txy_content";

    
    /*=============================================
    =            Properties            =
    =============================================*/

    /*=====  End of Properties  ======*/

    onMount(() => {
        updateLocales().then(locales => {
            if (locales.length > 0) {
                selected_locale.set(locales[0]);
            }
        });
    });
    
    
    /*=============================================
    =            Methods            =
    =============================================*/
    
        const handleLocaleSelected = event => {
            selected_locale.set(event.detail.locale);
        }

        const updateLocales = async page_id => {
            let recovered_locales = await getLocales();

            existing_locales.set(recovered_locales);

            return recovered_locales;
        }
    
    /*=====  End of Methods  ======*/
</script>

<menu id="twp-locale-switch">
    {#each $existing_locales as locale}
        <LocaleItem {locale} is_selected_locale={$selected_locale === locale} on:locale-selected={handleLocaleSelected}/>
    {/each}
</menu>

<style>
    menu#twp-locale-switch {
        display: flex;
        gap: var(--spacing-1);
    }
</style>
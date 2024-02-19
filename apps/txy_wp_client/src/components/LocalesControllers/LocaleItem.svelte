<script>
    import { createEventDispatcher } from "svelte";

    
    /*=============================================
    =            Properties            =
    =============================================*/
    
        /** 
         * The locale of the item
         * @type {string}
         */
        export let locale;

        /**
         * Is the locale selected
         */
        export let is_selected_locale = false;

        const dispatch = createEventDispatcher();

    /*=====  End of Properties  ======*/

    
    /*=============================================
    =            Methods            =
    =============================================*/
    
        const emitLocaleSelected = () => {
            console.debug("Emitting locale selected: ", locale);
            dispatch("locale-selected", { locale });
        } 
    
    /*=====  End of Methods  ======*/
    
</script>

<button on:click={emitLocaleSelected} class="txy-locale-item" class:txy-selected-locale={is_selected_locale}>
    {locale}
</button>

<style>
    button.txy-locale-item {
        background: var(--main-dark);
        color: var(--grey-1);
        padding: var(--spacing-1) var(--spacing-3);
    }

    button.txy-locale-item:hover {
        background: var(--main-dark-color-5);
    }

    button.txy-locale-item:active {
        background: var(--main-dark-color-4);
        transition: background-color 0.1s
    }

    button.txy-locale-item.txy-selected-locale {
        outline: 1px solid var(--success-2);
    }
</style>


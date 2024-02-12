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

        const dispatch = createEventDispatcher();

    /*=====  End of Properties  ======*/

    
    /*=============================================
    =            Methods            =
    =============================================*/
    
        const emitLocaleSelected = () => {
            dispatch("locale-selected", { locale });
        } 
    
    /*=====  End of Methods  ======*/
    
</script>

<button class="txy-locale-item">
    {locale}
</button>

<style>
    button.txy-locale-item {
        background: var(--main-dark);
        color: var(--grey-1);
        padding: var(--spacing-1) var(--spacing-3);
    }
</style>


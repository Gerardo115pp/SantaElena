<script>
    import { getExistingPages, PageMetadata } from "@models/txy_pages";
    import { onMount } from "svelte";

    
    /*=============================================
    =            properties            =
    =============================================*/
    
        /**
         * The available pages metadata retrieved from the txy service
         * @type {PageMetadata[]}
         */
        let pages_metadata = [];
    
    /*=====  End of properties  ======*/

    onMount(() => {
        updatePagesMetadata();
    });

    
    /*=============================================
    =            Methods            =
    =============================================*/
    
        const updatePagesMetadata = async () => {
            pages_metadata = await getExistingPages();
        }
    
    /*=====  End of Methods  ======*/
    
    
    
    
</script>

<menu id="pages-selection">
    {#each pages_metadata as page}
        <li role="navigation" class="ps-page-available-li">{page.name}</li>
    {/each}
</menu>

<style>
    menu#pages-selection {
        display: flex;
        height: 4em;
        border-top: 2px dashed var(--main);
        border-bottom: 2px dashed var(--main);
    }

    .ps-page-available-li {
        font-family: var(--font-decorative);
        display: flex;
        height: 100%;
        padding: 0 var(--spacing-3);
        background: hsl(from var(--grey-9) h s 9);
        color: var(--main-dark);
        justify-content: center;
        align-items: center;
    }
        
</style>
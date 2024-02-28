<script>
    import { getExistingPages, PageMetadata } from "@models/txy_pages";
    import { existing_pages_metadata } from "@stores/txy_content";
    import { selected_page_id } from "@stores/txy_content";
    import { onMount } from "svelte";

    
    /*=============================================
    =            properties            =
    =============================================*/
    
    /*=====  End of properties  ======*/

    onMount(() => {
        updatePagesMetadata();
    });

    
    /*=============================================
    =            Methods            =
    =============================================*/
    
        /**
         * Handles the page selected event
         * @param {PageMetadata} page
         */
        const handlePageSelected = page => {
            selected_page_id.set(page.page_id);
        }
    
        const updatePagesMetadata = async () => {
            let recovered_pages = await getExistingPages();

            existing_pages_metadata.set(recovered_pages);
        }
    
    /*=====  End of Methods  ======*/
    
    
    
    
</script>

<menu id="pages-selection">
    {#each $existing_pages_metadata as page}
        <li on:click={() => handlePageSelected(page)} role="navigation" class="ps-page-available-li">{page.name}</li>
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
        cursor: default;
        font-family: var(--font-decorative);
        display: flex;
        height: 100%;
        padding: 0 var(--spacing-3);
        background: hsl(from var(--grey-9) h s 9);
        color: var(--main-dark);
        justify-content: center;
        align-items: center;
        transition: all 0.1s ease-in;
    }

    .ps-page-available-li:not(:first-child) {
        border-left: 1px dashed var(--main-dark);
    }
     
    .ps-page-available-li:hover {
        background: var(--main-dark-color-8);
    }

    @supports (color: rgb(from white r g b)) {
        .ps-page-available-li:hover {
            background:hsl(from var(--main-dark-color-8) h s l / 0.3);
        }
    }
</style>
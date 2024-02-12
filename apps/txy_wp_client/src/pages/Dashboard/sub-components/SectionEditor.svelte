<script>
    import { TxyPageSection } from "@models/txy_sections";
    import ContentEditor from "./ContentEditor.svelte";

    
    /*=============================================
    =            Properties            =
    =============================================*/
    
        /** 
         * @type {TxyPageSection} 
         */
        export let page_section;
    
    /*=====  End of Properties  ======*/
    
    
</script>

<section class="txy-page-section-editor">
    <h3 class="section-name">
        {page_section.name}
    </h3>
    <ul class="content-entries">
        {#each page_section.content as content_entry}
            <ContentEditor content_entry={content_entry}/>
        {/each}
    </ul>
</section>

<style>
    .section-name {
        line-height: 1;
        color: var(--grey-2);
        font-size: var(--font-size-h4);
    }
</style>
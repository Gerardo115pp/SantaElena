<script>
    import { TxyPageSection } from "@models/txy_sections";
    import SectionEditor from "./SectionEditor.svelte";

    
    /*=============================================
    =            Properties            =
    =============================================*/
    
        /**
         * The sections of content inside the selected page
         * @type {TxyPageSection[]}
         */
        export let page_sections = [];
        
    /*=====  End of Properties  ======*/
    
    
</script>

{#each page_sections as psection}
    <SectionEditor page_section={psection}/>
{/each}
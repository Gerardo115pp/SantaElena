<script>
    import TxyContentEntry from "@libs/TxyClient/models/content_entry";
    import txy_repository from "@libs/TxyClient/txy_repository";
    import TxyMarkup from "@libs/TxyClient/components/TxyMarkup.svelte";
    import { santa_elena_markup_rules } from "@themes/markup_styles/santa_elena_markup";
    import { onMount } from "svelte";
    import { get_content_entries_params } from "@stores/txy";

    
    /*=============================================
    =            Properties            =
    =============================================*/
    
        /** 
         * The headline content entry
         * @type {TxyContentEntry}
         */
        let headline_entry = txy_repository.getContentEntrySync(get_content_entries_params.BLOG_HEADER);

        /** 
         * The subheadline content entry
         * @type {TxyContentEntry}
         */
        let subheadline_entry = txy_repository.getContentEntrySync(get_content_entries_params.BLOG_SUBHEADER);

    
    /*=====  End of Properties  ======*/
    
    onMount(() => {
        updateContentEntries();
    })

    
    /*=============================================
    =            Methods            =
    =============================================*/
    
        /**
         * Updates the content entries
         * @returns {Promise<void>}
         */
        const updateContentEntries = async () => {
            let new_headline_entry = await headline_entry.GetFreshCopy();
            let new_subheadline_entry = await subheadline_entry.GetFreshCopy();

            if (new_headline_entry !== null) {
                headline_entry = new_headline_entry;
            }

            if (new_subheadline_entry !== null) {
                subheadline_entry = new_subheadline_entry;
            }
        }
    
    /*=====  End of Methods  ======*/
    
    

</script>

<header id="santa-elena-blog-header">
    <h1 id="sebh-headline">{headline_entry.Text}</h1>
    <div class="sebh-subheadline">
        {#key subheadline_entry}
            <TxyMarkup content_entry={subheadline_entry} rules={santa_elena_markup_rules} wrapper_class="sebh-subheadline-content" />
        {/key}
    </div>
</header>

<style>
    #santa-elena-blog-header {
        width: 70%;
        display: flex;
        flex-direction: column;
        row-gap: var(--spacing-2);
    }

    #santa-elena-blog-header h1#sebh-headline {
        font-size: var(--font-size-h2);
        color: var(--dark-9);
    }

    :global(.sebh-subheadline-content) {
        display: flex;
        flex-direction: column;
        row-gap: var(--spacing-1);
    }

    :global(.sebh-subheadline-content p.markup-paragraph) {
        font-size: var(--font-size-1);  
    }
</style>
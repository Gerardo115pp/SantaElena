<script>
    import { browser } from "$app/environment";
    import { LiberyHTMLPreprocessor} from "../html_preprocessor";
    import { onMount } from "svelte";

    
    /*=============================================
    =            Properties            =
    =============================================*/
    
        /**
         * The rules to apply to the content html
         * @type {NodesPreprocessRule[]}
         */
        export let the_rules = [];

        /**
         * An class to reference the wrapper element
         * @type {string}
         */
        export let wrapper_class = crypto.randomUUID();

        /**
         * The content to be rendered
         * @type {string}
         */
        export let the_content;

        /**
         * Whether the element should be rendered on the server to optimize for SEO
         * @type {boolean}
         */
        export let optimize_seo = false;
    
        /**
         * The markup preprocessor
         * @type {LiberyHTMLPreprocessor}
         */
        let preprocessor = new LiberyHTMLPreprocessor();

        /**
         * The content mount element
         * @type {HTMLDivElement}
         */
        let content_mount;
    
    /*=====  End of Properties  ======*/
    
    onMount(() => {
        preprocessor.setRules(the_rules);
        renderContent(the_content);
    });

    
    /*=============================================
    =            Methods            =
    =============================================*/
    
        /** 
         * Renders the content description 
         * @param {string} content 
         */
        const renderContent = content => {
            let dom_nodes = preprocessor.processText(content);

            content_mount.replaceChildren(...dom_nodes);
        }
    
    /*=====  End of Methods  ======*/

</script>

{#if browser}
    <div class="libery-html-preprocessor {wrapper_class}" bind:this={content_mount}>
    </div>
{:else if (optimize_seo)}
    <div class="libery-html-preprocessor {wrapper_class}" style:color="transparent">
        {@html the_content}
    </div>
{/if}
<script>
    import { LiberyHTMLPreprocessor, NodesPreprocessRule } from "../html_preprocessor";
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

<div class="libery-html-preprocessor {wrapper_class}" bind:this={content_mount}>
</div>
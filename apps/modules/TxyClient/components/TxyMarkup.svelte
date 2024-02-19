<script>
    import { LiberyHTMLPreprocessor, NodesPreprocessRule } from "../../LiberyHTMLpreprocessor/html_preprocessor";
    import { TxyContentEntry } from "../models/content_entry";
    import { onMount } from "svelte";
    import { marked } from "marked";

    
    /*=============================================
    =            Properties            =
    =============================================*/
    
        /**
         * The rules to apply to the content html
         * @type {NodesPreprocessRule[]}
         */
        export let rules = [];

        /**
         * An class to reference the wrapper element
         * @type {string}
         */
        export let wrapper_class = crypto.randomUUID();

        /**
         * The content entry to be rendered
         * @type {TxyContentEntry}
         */
        export let content_entry;

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
        updatePreprocessorRules(rules);
        renderContentEntry(content_entry);
    })

    
    /*=============================================
    =            Methods            =
    =============================================*/
    
        /**
         * Renders the content description
         * @param {TxyContentEntry} content_entry 
         */
        const renderContentEntry = content_entry => {
            if (content_mount === undefined) return;

            if (content_entry.content_type !== "markdown") { 
                console.error(`Content entry with id ${content_entry.entry_id} is not of type markdown.`);
                return;
            }

            let html_markup = marked.parse(content_entry.Text);

            let dom_nodes = preprocessor.processText(html_markup);

            content_mount.replaceChildren(...dom_nodes);
        }

        /**
         * Updates the rules of the preprocessor
         * @param {NodesPreprocessRule[]} new_rules 
         */
        const updatePreprocessorRules = new_rules => {
            preprocessor.setRules(new_rules);
        }
    
    /*=====  End of Methods  ======*/
    
    
</script>

<div class="txy-markup-wrapper {wrapper_class}" bind:this={content_mount}>
</div>
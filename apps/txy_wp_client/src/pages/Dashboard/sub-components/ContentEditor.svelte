<script>
    import Editor from "bytemd/svelte/editor.svelte";
    import ESLocale from "bytemd/locales/es.json";
    import { TxyContentEntry } from "@models/txy_content";
    import { onMount } from "svelte";
    import { marked } from "marked";

    
    /*=============================================
    =            properties            =
    =============================================*/
    
        /**
         * The content entry to be edited
         * @type {TxyContentEntry}
         */
        export let content_entry;

        
        /*----------  Editor  ----------*/
            /**
             * The new content to be saved.
             * @type {TxyContentEntry}
             */
            let new_content = null;

            let editing_instructions = false;

            let new_instructions = "";
            let new_content_text = "";
            let new_content_href = "";

            let content_updated = false;

    
    /*=====  End of properties  ======*/

    onMount(() => {
        setupEditor();
    });

    
    /*=============================================
    =            Methods            =
    =============================================*/

        const handleInstructionsKeydown = e => {
            if (e.key === "Enter") {
                return toggleEditingInstructions();
            }

            // console.debug("Key pressed: ", e.key);
            // console.debug("Instructions: ", new_instructions);
            // console.debug("Editing instructions: ", editing_instructions);
            // console.debug("e.target.value: ", e.target.value);
            // queueMicrotask(() => {
            //     console.debug("Instructions after handler return: ", new_instructions);
            // });



            return updateContent();
        }

        const setupEditor = () => {
            new_content = content_entry.Copy();

            new_instructions = content_entry.Instructions;
            new_content_text = content_entry.Text ?? "";
            new_content_href = content_entry.Href;
        }

        const toggleEditingInstructions = () => {
            editing_instructions = !editing_instructions;
        }

        const updateContent = () => {
            new_content.Text = new_content_text;
            new_content.Href = new_content_href;
            new_content.Instructions = new_instructions;


            content_updated = !(new_content.Equals(content_entry));
            console.debug("Content updated: ", content_updated);
        }

        const resetContent = () => {
            new_content = content_entry.Copy();
            new_instructions = content_entry.Instructions;
            new_content_text = content_entry.Text;
            new_content_href = content_entry.Href;

            editing_instructions = false;
            content_updated = false;
        }

        const saveContent = () => {
            content_entry.OverwriteWith(new_content);
            
            if (content_entry.content_type === "html") {
                content_entry.Text = marked.parse(new_content_text);
            }

            if (content_entry.content_type === "markdown") {
                content_entry.Text = new_content_text;
            }

            content_entry.PushUpdates(); // Pushes the new content to the server
            resetContent();
        }

        const handleMarkdownChange = (e) => {
            new_content_text = e.detail.value;

            updateContent();
        }
    
    /*=====  End of Methods  ======*/
    
    


    
</script>

<li class="txy-content-entry-editor">
    <div class="tcee-content-column">
        <div class="tcee-headline">
            <h4 class="content-name">
                {content_entry.name}
            </h4>
            {#if content_entry.Instructions !== undefined}
                 <p class="tcee-instructions">
                    {content_entry.Instructions}
                 </p>
            {/if}
            {#if editing_instructions}
                <textarea bind:value={new_instructions} on:keyup={handleInstructionsKeydown} class="tcee-editor"></textarea>
            {:else}
                <div class="edit-instructions-wrapper">
                    <button on:click={toggleEditingInstructions} class="button-1 button-thin">
                        Editar instrucciones
                    </button>
                </div>
            {/if}
        </div>
        <div class="tcee-editor-wrapper">
            {#if content_entry.content_type === "markdown"}
                <Editor value={new_content_text} locale={ESLocale} on:change={handleMarkdownChange} mode="split"/>
            {:else}
                <textarea on:keyup={updateContent} bind:value={new_content_text} class="tcee-editor"></textarea>
            {/if}
        </div>
    </div>
    <div class="tcee-attributes-column">
        <details open class="tcee-attributes">
            <summary>
                Atributos del contenido
            </summary>
            <dl class="attributes-list">
                <dt class="attribute-name">Hipervínculo(Link) asociado</dt>
                <dd class="attribute-editor-wrapper">
                    <input on:change={updateContent} bind:value={new_content_href} type="text" class="attribute-editor" >
                </dd>
            </dl>
        </details>
    </div>
    <div class="tcee-controls-bar">
        {#if content_updated}
            <button on:click={saveContent} class="button-2 button-thin">Guardar</button>
            <button on:click={resetContent} class="button-1 button-thin">Cancelar</button>
        {/if}
    </div>
</li>

<style>
    .txy-content-entry-editor {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        padding: var(--spacing-4) var(--spacing-2);
        height: 700px;
        min-height: max-content;
        container-type: size;
        row-gap: var(--spacing-2);
        column-gap: var(--spacing-3);
    }

    .tcee-content-column {
        grid-column: 1 / span 1;
        display: flex;
        height: 80cqh;
        container-type: size;
        flex-direction: column;
        row-gap: var(--spacing-3);
    }

    
    /*=============================================
    =            content            =
    =============================================*/
    
    
        .tcee-headline {
            display: flex;
            flex-direction: column;
            height: 30cqh;
            row-gap: var(--spacing-2);
        }

        .content-name {
            font-family: var(--font-decorative);
            font-size: var(--font-size-h5);
            color: var(--main-dark-color-8);
        }

        .tcee-instructions {
            font-size: var(--font-size-p-small);
            line-height: 1.5;
            font-weight: 300;
        }

        .tcee-editor {
            font-family: var(--font-read);
            width: 100%;
            height: 60cqh;
            background: var(--grey-8);
            border: 2px solid var(--main-dark);
            color: var(--main);
            padding: var(--spacing-1);
            outline: none;
            box-shadow: none !important;
        }


    
    /*=====  End of content headline  ======*/
    
    


    .tcee-attributes-column {
        grid-column: 2 / span 1;
        height: 80cqh;
    }

    
    /*=============================================
    =            Attributes            =
    =============================================*/
    
        .tcee-attributes summary {
            font-family: var(--font-decorative);
            font-size: var(--font-size-h5);
            color: var(--main-dark-color-8);
            list-style: none;
        }

        dl.attributes-list {
            display: flex;
            flex-direction: column;
            row-gap: var(--spacing-1);
            padding: var(--spacing-2) var(--spacing-3);
        }

        dt.attribute-name {
            color: var(--grey-4);
            font-weight: 600;
        }
    
    /*=====  End of Attributes  ======*/
    
    

    .tcee-controls-bar {
        grid-column: 1 / span 2;
        height: 12cqh;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        column-gap: var(--spacing-1);
    }

    .tcee-controls-bar button {
        height: max-content;
    }
</style>
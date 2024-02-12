<script>
    import { TxyContentEntry } from "@models/txy_content";

    
    /*=============================================
    =            properties            =
    =============================================*/
    
        /**
         * The content entry to be edited
         * @type {TxyContentEntry}
         */
        export let content_entry;

        
        /*----------  Editor  ----------*/
        
            let editing_instructions = false;
    
    /*=====  End of properties  ======*/
    
    
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
            {:else} 
                 {#if editing_instructions}
                        <textarea name="" id="" cols="30" rows="10" class="tcee-editor"></textarea>
                 {:else}
                    <div class="edit-instructions-wrapper">
                        <button class="button-1 button-thin">
                            Añadir instrucciones
                        </button>
                    </div>
                 {/if}
            {/if}
        </div>
        <div class="tcee-editor-wrapper">
            <textarea class="tcee-editor"></textarea>
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
                    <input type="text" class="attribute-editor" >
                </dd>
            </dl>
        </details>
    </div>
    <div class="tcee-controls-bar">
        <button class="button-2 button-thin">Guardar</button>
        <button class="button-1 button-thin">Cancelar</button>
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
            background: var(--grey-1);
            border: 2px solid var(--main-dark);
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
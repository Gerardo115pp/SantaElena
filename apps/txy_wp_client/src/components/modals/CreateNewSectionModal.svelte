<script>
    import { getModalStore, ModalStore, ModalSettings } from "@skeletonlabs/skeleton";
    import { selected_page_content_hash, selected_page_id } from "@stores/txy_content";
    import { createNewSection } from "@models/txy_sections";
    
    /*=============================================
    =            Properties            =
    =============================================*/
    
        /**
         * @type {ModalStore}
         */
        const modal_store = getModalStore();

        /**
         * The name of the new section
         * @type {string}
         */
        let section_name = "";

        /**
         * The id of the new section
         * @type {string}
         */
        let section_id = "";

    
    /*=====  End of Properties  ======*/
    
    
    /*=============================================
    =            Methods            =
    =============================================*/

        /**
         * Creates a new section 
         * @param {MouseEvent} e
         */
        const handleCreateNewSection = async e => {
            e.preventDefault();
            
            let page_new_content_hash = await createNewSection(section_id, section_name, $selected_page_id);

            if (page_new_content_hash !== "") {
                selected_page_content_hash.set(page_new_content_hash);
            }

            closeModal();
        }

        /**
         * Closes the current modal
        */
        const closeModal = () => {
            modal_store.close();
        }
    
    /*=====  End of Methods  ======*/
    
    
    
</script>

<div id="create-new-section-modal">
    <header id="cnsm-header">
        <h1 id="cnsm-headline">
            Use this action to create a new section
        </h1>
        <p id="cnsm-instructions">
            This will create a new section in the current selected page. Sections work kind of like groups of content inside elements. <strong>If you are not a developer, keep in mind that sections must be manually implemented on the coded website.</strong>
            if you need additional sections for your website, please contact your libery labs developer. 
        </p>
    </header>
    <form action="" id="cnsm-form">
        <fieldset id="cnsm-section-data-field">
            <label class="label">
                <span>
                    Section name
                </span>
                <input bind:value={section_name} type="text" class="input border-color-main-1">
            </label>
            <label class="label">
                <span>
                    Section id
                </span>
                <input bind:value={section_id} type="text" class="input border-color-main-1">
            </label>
        </fieldset>
        <div id="cnsm-form-controls" role="group" class="flex-row-reverse">
            <button class="button-1" on:click={closeModal} type="reset">
                Cancel
            </button>
            <button on:click={handleCreateNewSection} class="button-2" type="button">
                Create
            </button>
        </div>
    </form>
</div>

<style>
    
    #create-new-section-modal {
        width: 50dvw;
        container-type: inline-size;
        background: var(--grey-9);
        display: flex;
        flex-direction: column;
        row-gap: var(--spacing-3);
        padding: var(--spacing-3);
        border-radius: var(--border-radius);
        border: 1px solid var(--main-8);
    }

    #cnsm-header {
        display: flex;
        flex-direction: column;
        row-gap: var(--spacing-2);
    }

    #cnsm-headline {
        font-size: var(--font-size-h5);
        line-height: 1;
    }

    #cnsm-instructions {
        font-size: var(--font-size-p-small);
        line-height: 1.3;
        font-weight: 300;
    }

    #cnsm-form {
        display: flex;
        flex-direction: column;
        row-gap: var(--spacing-3);
    }

    #cnsm-form fieldset {
        display: flex;
        flex-direction: column;
        row-gap: var(--spacing-1);
    }

    #cnsm-form-controls {
        display: flex;
        column-gap: var(--spacing-1);
        justify-content: flex-end;
    }
</style>
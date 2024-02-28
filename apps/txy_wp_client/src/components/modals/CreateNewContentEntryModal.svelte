<script>
    import { getModalStore, ModalStore, ModalSettings } from "@skeletonlabs/skeleton";
    import { selected_page_content_hash, selected_page_id } from "@stores/txy_content";
    import { application_information } from "@stores/txy_content";
    import { createNewContentEntry } from "@models/txy_content";
    import { onMount } from "svelte";

    
    
    
    /*=============================================
    =            Properties            =
    =============================================*/
    
        /**
         * @type {ModalStore}
         */
        const modal_store = getModalStore();


        /**
         * The action title of the modal
         * @type {string}
         */
        let action_title = "Create a new content entry";

        /**
         * The id of the section where the new content entry will be created
         * @type {string}
         */
        let section_id = "";

        /**
         * The name of the new_content_entry_id
         * @type {string}
         */
        let new_content_entry_id = "";

        /**
         * The Content name
         * @type {string}
         */
        let content_name = "";

        /**
         * The Content type
         * @type {string}
         */
        let content_type = application_information.content_types.Text;

    
    /*=====  End of Properties  ======*/

    onMount(() => {
        // CRITICAL: Retrieve the section id from the modal settings. if it's not there, close the modal
        section_id = $modal_store[0].section_id;
        if (section_id === undefined) {
            console.error("The section id is undefined");
            closeModal();
        }

        // Retrieve the action title from the modal settings
        action_title = $modal_store[0].title;
    })
    
    
    /*=============================================
    =            Methods            =
    =============================================*/

        /**
         * Creates a new content entry
         * @param {MouseEvent} e
         */
        const handleCreateContentEntry = async e => {
            e.preventDefault();
            
            if (new_content_entry_id === "" || content_name === "" || content_type === "" || section_id === "" || $selected_page_id === "") {
                return;
            }

            /**
             * @type {import("@models/txy_content").NewContentEntryParams}
             */
            const content_entry_params = {
                entry_id: new_content_entry_id,
                name: content_name,
                content_type: content_type,
                section_id: section_id,
                page_id: $selected_page_id
            }

            let new_page_content_hash = await createNewContentEntry(content_entry_params);

            if (new_page_content_hash !== $selected_page_content_hash) {
                selected_page_content_hash.set(new_page_content_hash);
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

<div id="create-content-entry-modal">
    <header id="ccem-header">
        <h1 id="ccem-headline">
            {action_title}
        </h1>
        <p id="ccem-instructions">
            Use this action to create a new content entry on the clicked section id and selected page id(the one you'r viewing right now).
        </p>
    </header>
    <form action="" id="ccem-form">
        <fieldset id="ccem-section-data-field">
            <label class="label">
                <span>
                    Content Entry ID
                </span>
                <input bind:value={new_content_entry_id} type="text" class="input border-color-main-1">
            </label>
            <div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
                <div class="input-group-shim">
                    Content Name
                </div>
                <input bind:value={content_name} type="text" class="input">
                <select bind:value={content_type} type="text">
                    {#each Object.keys(application_information.content_types) as content_type, h}
                        <option data-index="{h}" selected={h === 0} value={application_information.content_types[content_type]}>
                            {content_type}
                        </option>
                    {/each}
                </select>
            </div>
        </fieldset>
        <div id="ccem-form-controls" role="group" class="flex-row-reverse">
            <button class="button-1" on:click={closeModal} type="reset">
                Cancel
            </button>
            <button on:click={handleCreateContentEntry} class="button-2" type="button">
                Create
            </button>
        </div>
    </form>
</div>

<style>
    
    #create-content-entry-modal {
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

    #ccem-header {
        display: flex;
        flex-direction: column;
        row-gap: var(--spacing-2);
    }

    #ccem-headline {
        font-size: var(--font-size-h5);
        line-height: 1;
    }

    #ccem-instructions {
        font-size: var(--font-size-p-small);
        line-height: 1.3;
        font-weight: 300;
    }

    #ccem-form {
        display: flex;
        flex-direction: column;
        row-gap: var(--spacing-3);
    }

    #ccem-form fieldset {
        display: flex;
        flex-direction: column;
        row-gap: var(--spacing-2);
    }

    #ccem-form-controls {
        display: flex;
        column-gap: var(--spacing-1);
        justify-content: flex-end;
    }
</style>
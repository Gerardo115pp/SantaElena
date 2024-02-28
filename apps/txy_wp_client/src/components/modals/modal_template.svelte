<!-- 
    Use this file as a template to create new modals. don't use it directly.
 -->
<script>
    import { getModalStore, ModalStore, ModalSettings } from "@skeletonlabs/skeleton";
    import { selected_page_content_hash, selected_page_id } from "@stores/txy_content";
    import { createNewSection } from "@models/txy_sections";

    
    /*=============================================
    =            Setup            =
    =============================================*/
    
    
    /*=====  End of Setup  ======*/
    
    
    
    /*=============================================
    =            Properties            =
    =============================================*/
    
        /**
         * @type {ModalStore}
         */
        const modal_store = getModalStore();

        /**
         * The name of the GENERIC_PROPERTY
         * @type {string}
         */
        let GENERIC_PROPERTY = "";

    
    /*=====  End of Properties  ======*/
    
    
    /*=============================================
    =            Methods            =
    =============================================*/

        /**
         * CHANGE THIS FUNCTION TO HANDLE THE MAIN ACTION OF THE MODAL
         * @param {MouseEvent} e
         */
        const handlePrimaryAction = async e => {
            e.preventDefault();
            
            // YOUR ACTION CODE...

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

<div id="GENERIC-MODAL-ID">
    <header id="GENERIC-ACRO-PREFIX-header">
        <h1 id="GENERIC-ACRO-PREFIX-headline">
            TEMPLATE ACTION MODAL
        </h1>
        <p id="GENERIC-ACRO-PREFIX-instructions">
            TEMPLATE ACTION INSTRUCTIONS
        </p>
    </header>
    <form action="" id="GENERIC-ACRO-PREFIX-form">
        <fieldset id="GENERIC-ACRO-PREFIX-section-data-field">
            <label class="label">
                <span>
                    YOU ACTION PROPERTY 1
                </span>
                <input bind:value={GENERIC_PROPERTY} type="text" class="input border-color-main-1">
            </label>
        </fieldset>
        <div id="GENERIC-ACRO-PREFIX-form-controls" role="group" class="flex-row-reverse">
            <button class="button-1" on:click={closeModal} type="reset">
                Cancel
            </button>
            <button on:click={handlePrimaryAction} class="button-2" type="button">
                ACTION NAME
            </button>
        </div>
    </form>
</div>

<style>
    
    #GENERIC-MODAL-ID {
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

    #GENERIC-ACRO-PREFIX-header {
        display: flex;
        flex-direction: column;
        row-gap: var(--spacing-2);
    }

    #GENERIC-ACRO-PREFIX-headline {
        font-size: var(--font-size-h5);
        line-height: 1;
    }

    #GENERIC-ACRO-PREFIX-instructions {
        font-size: var(--font-size-p-small);
        line-height: 1.3;
        font-weight: 300;
    }

    #GENERIC-ACRO-PREFIX-form {
        display: flex;
        flex-direction: column;
        row-gap: var(--spacing-3);
    }

    #GENERIC-ACRO-PREFIX-form fieldset {
        display: flex;
        flex-direction: column;
        row-gap: var(--spacing-1);
    }

    #GENERIC-ACRO-PREFIX-form-controls {
        display: flex;
        column-gap: var(--spacing-1);
        justify-content: flex-end;
    }
</style>
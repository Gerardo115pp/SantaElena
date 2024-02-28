<script>
    import { getModalStore, ModalStore, ModalSettings } from "@skeletonlabs/skeleton";
    import { createNewLocale } from "@models/txy_content";
    import { existing_locales } from "@stores/txy_content";
    
    
    /*=============================================
    =            Properties            =
    =============================================*/
    
        /**
         * @type {ModalStore}
         */
        const modal_store = getModalStore();

        /**
         * The new locale code
         * @type {string}
         */
        let new_locale = "";

    
    /*=====  End of Properties  ======*/
    
    
    /*=============================================
    =            Methods            =
    =============================================*/

        /**
         * Creates a locale
         * @param {MouseEvent} e
         */
        const handleCreateNewLocale = async e => {
            e.preventDefault();
            
            let created = await createNewLocale(new_locale);

            if (created) {
                let local_loaded_locales = $existing_locales;
    
                existing_locales.set([...local_loaded_locales, new_locale]);
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

<div id="create-new-locale-modal">
    <header id="cnlm-header">
        <h1 id="cnlm-headline">
            Use this action to create a new locale
        </h1>
        <p id="cnlm-instructions">
            This will create a new locale that your website will support. A locale is just the language code in this case. we do not consider the region code. so for example, <i>es-MX</i> which
            is the locale for Spanish in Mexico, will be considered as <i>es</i>.
            <br/>
            <br/>
            Adding a new locale will <strong>automatically create a copy of all the content</strong> of the site in the new locale(meaning pages, sections, and content entries) so you can start translating the content.
        </p>
    </header>
    <form action="" id="cnlm-form">
        <fieldset id="cnlm-section-data-field">
            <label class="label">
                <span>
                    The new locale code(e.g. es, en, fr, etc.)
                </span>
                <input bind:value={new_locale} type="text" class="input border-color-main-1">
            </label>
        </fieldset>
        <div id="cnlm-form-controls" role="group" class="flex-row-reverse">
            <button class="button-1" on:click={closeModal} type="reset">
                Cancel
            </button>
            <button on:click={handleCreateNewLocale} class="button-2" type="button">
                Create
            </button>
        </div>
    </form>
</div>

<style>
    
    #create-new-locale-modal {
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

    #cnlm-header {
        display: flex;
        flex-direction: column;
        row-gap: var(--spacing-2);
    }

    #cnlm-headline {
        font-size: var(--font-size-h5);
        line-height: 1;
    }

    #cnlm-instructions {
        font-size: var(--font-size-p-small);
        line-height: 1.3;
        font-weight: 300;
    }

    #cnlm-form {
        display: flex;
        flex-direction: column;
        row-gap: var(--spacing-3);
    }

    #cnlm-form fieldset {
        display: flex;
        flex-direction: column;
        row-gap: var(--spacing-1);
    }

    #cnlm-form-controls {
        display: flex;
        column-gap: var(--spacing-1);
        justify-content: flex-end;
    }
</style>
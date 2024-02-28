<script>
    import { getModalStore, ModalStore, ModalSettings } from "@skeletonlabs/skeleton";
    import { PageMetadata } from "@models/txy_pages";
    import { createNewPage } from "@models/txy_pages";
    import { existing_pages_metadata } from "@stores/txy_content";

    
    /*=============================================
    =            Properties            =
    =============================================*/
    
        /**
         * @type {ModalStore}
         */
        const modal_store = getModalStore();

        /**
         * The name of the new page
         */
        let page_name = "";

        /**
         * The id of the new page
         */
        let page_id = "";

    
    /*=====  End of Properties  ======*/
    
    
    /*=============================================
    =            Methods            =
    =============================================*/

        /**
         * Creates a new page
         * @param {MouseEvent} e
         */
        const handelCreateNewPage = async e => {
            e.preventDefault();
            
            if (page_name === "" || page_id === "") {
                closeModal();
                return;
            }

            let created = await createNewPage(page_name, page_id);

            if (!created) {
                closeModal();
            }

            /** @type {PageMetadata} */
            let new_page = {
                name: page_name,
                page_id: page_id
            }

            let pages_metadata = $existing_pages_metadata;
            existing_pages_metadata.set([...pages_metadata, new_page]);

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

<div id="create-new-page-modal">
    <header id="cnpm-header">
        <h1 id="cnpm-headline">
            Use this action to create a new page
        </h1>
        <p id="cnpm-instructions">
            New pages in txy could be used for more then just webpages. a common use case for example, would be to group all the entries of a website's navbar in a txy page. Keep in mind, if you are not a developer, this will not be useful for you, since txy pages must be integrated manually in the website. Use the pages your developer created for you. If you need a new page, ask your developer to create it for you.
        </p>
    </header>
    <form action="" id="cnpm-form">
        <fieldset id="cnpm-page-data-field">
            <label class="label">
                <span>
                    Page name
                </span>
                <input bind:value={page_name} type="text" class="input border-color-main-1">
            </label>
            <label class="label">
                <span>
                    Page id
                </span>
                <input bind:value={page_id} type="text" class="input border-color-main-1">
            </label>
        </fieldset>
        <div id="cnpm-form-controls" role="group" class="flex-row-reverse">
            <button class="button-1" on:click={closeModal} type="reset">
                Cancel
            </button>
            <button on:click={handelCreateNewPage} class="button-2" type="button">
                Create
            </button>
        </div>
    </form>
</div>

<style>
    
    #create-new-page-modal {
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

    #cnpm-header {
        display: flex;
        flex-direction: column;
        row-gap: var(--spacing-2);
    }

    #cnpm-headline {
        font-size: var(--font-size-h5);
        line-height: 1;
    }

    #cnpm-instructions {
        font-size: var(--font-size-p-small);
        line-height: 1.3;
        font-weight: 300;
    }

    #cnpm-form {
        display: flex;
        flex-direction: column;
        row-gap: var(--spacing-3);
    }

    #cnpm-form fieldset {
        display: flex;
        flex-direction: column;
        row-gap: var(--spacing-1);
    }

    #cnpm-form-controls {
        display: flex;
        column-gap: var(--spacing-1);
        justify-content: flex-end;
    }
</style>
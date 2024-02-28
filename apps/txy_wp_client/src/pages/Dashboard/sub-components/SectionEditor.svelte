<script>
    import { TxyPageSection } from "@models/txy_sections";
    import { getModalStore, ModalStore, ModalSettings } from "@skeletonlabs/skeleton";
    import { calculateContextMenuPosition } from "@components/contextmenu/txy_context_menu_controllers";
    import TxyContextMenu from "@components/contextmenu/TxyContextMenu.svelte";
    import ContentEditor from "./ContentEditor.svelte";

    
    /*=============================================
    =            Properties            =
    =============================================*/
    
        /** 
         * @type {TxyPageSection} 
         */
        export let page_section;

        /**
         * @typedef {Object} Point
         * @property {number} x
         * @property {number} y
        */

        /**
         * The position where to show the context menu
         * @type {Point}
         */
         let context_menu_position = null;
        // let context_menu_position = { x: 0, y: 0 }; // STYLING: Use this to automatically show the context menu so it's easier to style it

        /**
         * The sections to pass to the context menu
         * @type {import("@components/contextmenu/txy_context_menu_params").ContextMenuSection[]}
        */
        let context_menu_section_actions = [
            {
                title: "website actions",
                items: [
                    {
                        title: "Add Content Entry",
                        action: handleAddContentEntry
                    }
                ]
            }
        ]

        /**
         * Use this store to trigger modals
         * @type {ModalStore}
         */
        const modal_store = getModalStore();

        /**
         * The section element
         * @type {HTMLElement}
         */
        let section_element;
    
    /*=====  End of Properties  ======*/

    
    /*=============================================
    =            Methods            =
    =============================================*/

        /**
         * Closes the context menu
         */
        const closeContextMenu = () => {
            context_menu_position = null;
        }

        /**
         * Opens the modal to create a new content entry on the current section
         */
        function handleAddContentEntry() {
            /** @type {ModalSettings} */
            const create_content_entry_modal_settings = {
                title: `New content entry for '${page_section.section_id}'`,
                content: "Create a new content entry on the current section",
                type: "component",
                component: "CreateNewContentEntryModal",
                section_id: page_section.section_id 
            }

            modal_store.trigger(create_content_entry_modal_settings);

            closeContextMenu();
        }

        /**
         * Handles the context menu event
         * @param {MouseEvent} e
         */
        const handleContextMenu = e => {
            e.preventDefault();
            
            if (context_menu_position !== null) {
                return closeContextMenu();                
            }

            context_menu_position = calculateContextMenuPosition(section_element, { x: e.clientX, y: e.clientY });
        }
    
    /*=====  End of Methods  ======*/
    
    
    
</script>

<section bind:this={section_element} class="txy-page-section-editor" on:contextmenu|preventDefault|stopPropagation={handleContextMenu} role="form">
    <TxyContextMenu position={context_menu_position} menu_sections={context_menu_section_actions}/>
    <h3 class="section-name">
        {page_section.name}
    </h3>
    <ul class="content-entries">
        {#each page_section.content as content_entry}
            <ContentEditor content_entry={content_entry}/>
        {/each}
    </ul>
</section>

<style>
    .section-name {
        line-height: 1;
        color: var(--grey-2);
        font-size: var(--font-size-h4);
    }
</style>
<script>
    
    /*=============================================
    =            Properties            =
    =============================================*/
    
        /**
         * @typedef {Object} Point
         * @property {number} x
         * @property {number} y
         */

        /** 
         * The position where to show the context menu
         * @type {Point}
         */
        export let position = null;
        // export let position = { x: 0, y: 0 };
    
    /*=====  End of Properties  ======*/
    

    
    /*=============================================
    =            Methods            =
    =============================================*/

        const closeContextMenu = () => {
            position = null;
        }

        const handleAddPage = () => {
            console.debug("Adding page");
            closeContextMenu();
        }
    
    /*=====  End of Methods  ======*/
    
    
    
</script>

{#if position !== null}
    <menu 
        id="txy-content-ctx-menu"
        style:left="{position.x}px"
        style:top="{position.y}px"
    >
        <li class="tccm-entry">
            <button on:click={handleAddPage} class="tccm-entry-button">
                Add Page
            </button>
        </li>
        <li class="tccm-entry">
            <button class="tccm-entry-button">
                Add Locale
            </button>
        </li>
        <li class="tccm-entry">
            <button class="tccm-entry-button">
                Add Section
            </button>
        </li>
    </menu>
{/if}

<style>
    :global(:has(#txy-content-ctx-menu)) {
        position: relative;
    }

    #txy-content-ctx-menu {
        height: 300px;
        width: 200px;
        background: var(--grey);
        position: absolute;
        z-index: var(--z-index-t-5);
        border: 1px solid var(--grey-8);
        box-shadow: var(--boxes-shadow);
    }

    .tccm-entry {
        padding: var(--spacing-1);
        border-bottom: 1px solid var(--main-8);
        transition: all 200ms ease-in-out;
        margin: 0;
    }

    .tccm-entry-button {
        background: transparent;
        color: var(--main);
    }

    .tccm-entry:hover {
        background: var(--main-dark-transparent);
    }
</style>
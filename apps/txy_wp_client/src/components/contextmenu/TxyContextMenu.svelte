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

        /**
         * The menu sections to display
         * @type {import("./txy_context_menu_params").ContextMenuSection[]}
         */
        export let menu_sections = [];
        

    
    /*=====  End of Properties  ======*/

    
    /*=============================================
    =            Methods            =
    =============================================*/

        const closeContextMenu = () => {
            position = null;
        }
    
    /*=====  End of Methods  ======*/
    
    
    
</script>

{#if position !== null}
    <menu 
        id="txy-content-ctx-menu"
        style:left="{position.x}px"
        style:top="{position.y}px"
    >
        {#each menu_sections as menu_section}
            <fieldset class="tccm-menu-section">
                <legend>{menu_section.title}</legend>
                {#each menu_section.items as menu_item}
                    <li class="tccm-entry" on:click={menu_item.action} role="button">
                        <button class="tccm-entry-button">
                            {menu_item.title}
                        </button>
                    </li>
                {/each}
            </fieldset>
        {/each}
    </menu>
{/if}

<style>
    :global(:has(> #txy-content-ctx-menu)) {
        position: relative;
    }

    #txy-content-ctx-menu {
        height: 300px;
        width: 200px;
        background: var(--grey);
        position: absolute;
        box-shadow: var(--boxes-shadow);
        border: 1px solid var(--grey-8);
        z-index: var(--z-index-t-8);
        border-radius: var(--border-radius);
    }

    .tccm-menu-section legend {
        width: 100%;
        font-size: var(--font-size-1);
        color: var(--main-dark);
        padding: calc(var(--spacing-1) * 0.5) var(--spacing-1);
        background: color-mix(in oklab, var(--grey-9) 98%, var(--grey-3));
    }

    .tccm-entry {
        padding: 0 var(--spacing-1);
        border-bottom: 1px solid var(--main-9);
        transition: all 200ms ease-in-out;
        margin: 0;
    }

    .tccm-entry:last-child {
        border-bottom: none;
    }

    .tccm-entry-button {
        background: transparent;
        color: var(--main-5);
        font-size: var(--font-size-1);
        font-weight: 600;
        text-transform: lowercase;
    }

    .tccm-entry:hover {
        background: var(--main-dark-transparent);
    }
</style>
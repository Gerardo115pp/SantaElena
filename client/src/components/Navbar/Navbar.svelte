<script>
    import BurgerBtn from "@components/UI/BurgerBTN.svelte";
    import { getSVGResource } from "@libs/Services/media_loaders";
    import { navbar_transparent, layout_properties } from "@stores/layout";
    import { onMount } from "svelte";
    import { Writable, writable } from "svelte/store";
    import DropMenu from "./sub-components/DropMenu.svelte";

    
    /*=============================================
    =            Properties            =
    =============================================*/
    
        /**
         * The santa elena logo svg
         * @type {string}
         */
        let santa_elena_logo_svg;

        /**
         * @typedef {Object} NavbarSections
         * @property {string} name
         * @property {string} href
         * @property {NavbarSections[]} options 
        */

        /** @type {NavbarSections[]} */
        const dropdown_sections = [
            {
                name: "About",
                href: "/",
                options: []
            },
            {
                name: "Services",
                href: "/services",
                options: []
            },
            {
                name: "Contact",
                href: "/contact",
                options: []
            }
        ]

        /**
         * Controls whether or not the mobile menu is opened
         * @type {Writable<boolean>}
         */
        let is_mobile_menu_opened = writable(false);

    /*=====  End of Properties  ======*/

    onMount(() => {
        loadSantaElenaLogo();
    })
    
    
    /*=============================================
    =            Methods            =
    =============================================*/
    
        /**
         * Loads the santa elena logo svg
         * @return {Promise<void>}
         */
        const loadSantaElenaLogo = async () => {
            santa_elena_logo_svg = await getSVGResource("santa_elena_logo.svg");
        }

        /**
         * Toggles the mobile menu
         */
        const toggleMobileMenu = () => {
            is_mobile_menu_opened.set(!$is_mobile_menu_opened);
        }
    
    /*=====  End of Methods  ======*/
    
    
    
</script>

<nav id="santa-elena-navbar" class:glass-navbar={!$navbar_transparent && !$is_mobile_menu_opened} class:solid-navbar={$is_mobile_menu_opened}>
    <div id="sen-left-content">
        {#if !$layout_properties.IS_MOBILE}
            <div id="sen-santa-elena-logo" class="sen-icon-wrapper">
                {#if santa_elena_logo_svg !== undefined}
                    {@html santa_elena_logo_svg}
                {/if}
            </div>
        {:else}
            <div id="sen-burger-menu-btn" class="sen-icon-wrapper">
                <BurgerBtn on:click={toggleMobileMenu} is_opened={is_mobile_menu_opened}/>
            </div>
        {/if}
    </div>
    <div id="sen-right-content">
        {#if !$layout_properties.IS_MOBILE}
            <menu id="sen-nav-options">
                {#each dropdown_sections as dropdown_section}
                    <li class="sen-nav-option">
                        <a href="{dropdown_section.href}">
                            {dropdown_section.name}
                        </a>
                    </li>
                {/each}
            </menu>
            <div id="sen-nav-controls">
                <button class="button-2 button-thin">
                    Atencion inmediata
                </button>
            </div>
        {/if}
    </div>
    {#if $is_mobile_menu_opened}
        <DropMenu sections={dropdown_sections} visible={is_mobile_menu_opened}/>
    {/if}
</nav>

<style>
    #santa-elena-navbar {
        position: fixed;
        display: flex;
        width: 100dvw;
        height: var(--navbar-height);
        background: transparent;
        backdrop-filter: none;
        container-type: inline-size;
        top: 0;
        left: 0;
        justify-content: space-between;
        align-items: center;
        padding: 0 var(--spacing-4);
        z-index: var(--z-index-t-5);
        transition: all 0.3s ease-in-out;
    }

    @keyframes glassify {
        0% {
            background: hsl(from var(--shade-light-1) h s l / 0.1);
        }
        30% {
            background: hsl(from var(--shade-light-1) h s l / 0.3);
            backdrop-filter: blur(1px);
        }
        50% {
            background: hsl(from var(--shade-light-1) h s l / 0.5);
            backdrop-filter: blur(3px);
        }
        70% {
            background: var(--glass-gradient);
            backdrop-filter: blur(5px);
        }
        100% {
            background: var(--glass-gradient);
            backdrop-filter: blur(10px);
        }
    }
    
    #santa-elena-navbar.glass-navbar {
        /* background: var(--glass-gradient);
        backdrop-filter: blur(10px); */
        animation-duration: 0.3s;
        animation-fill-mode: forwards;
        animation-iteration-count: 1;
        animation-name: glassify;
        border-bottom: 1px solid var(--color-1);
    }

    #santa-elena-navbar.solid-navbar {
        background: var(--dark-7);
        backdrop-filter: none;
        border-bottom: 3px solid var(--color-light-3);
    }

    #sen-left-content {
        display: grid;
        place-items: center;
    }


    .sen-icon-wrapper {
        width: 65px;
    }

    #sen-burger-menu-btn {
        width: 16cqw;
    }

    :global(#sen-santa-elena-logo svg) {
        fill: var(--color-light-3);
    }

    :global(#santa-elena-navbar.glass-navbar #sen-icon-wrapper svg) {
        fill: var(--color-light-7);
    }

    #sen-right-content {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        column-gap: var(--spacing-3);
    }

    #sen-nav-options {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        list-style: none;
        padding: 0;
        column-gap: var(--spacing-2);
    }

    #sen-nav-options .sen-nav-option a {
        color: var(--shade-1);
        font-size: var(--font-size-2);
        font-weight: 500;
        text-decoration: none;
    }

    #santa-elena-navbar.glass-navbar #sen-nav-options .sen-nav-option a {
        color: var(--dark);
    }

    #sen-nav-option .sen-nav-option a:hover {
        color: var(--shade-2);
    }
</style>
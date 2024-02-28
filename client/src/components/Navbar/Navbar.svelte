<script>
    import BurgerBtn from "@components/UI/BurgerBTN.svelte";
    import { getSVGResource } from "@libs/Services/media_loaders";
    import { navbar_transparent, layout_properties, navbar_solid } from "@stores/layout";
    import { onMount } from "svelte";
    import { Writable, writable } from "svelte/store";
    import DropMenu from "./sub-components/DropMenu.svelte";
    import { link } from "svelte-spa-router";
    import txy_repository from "@app_modules/TxyClient/txy_repository";
    import TxyContentEntry from "@app_modules/TxyClient/models/content_entry";

    
    /*=============================================
    =            Properties            =
    =============================================*/

        /**
         * The id of the txy page where the navigation information is stored
         * @type {string}
         */
        const navigation_page_id = "santa-elena-navigation-options";

        /**
         * Navoptions section id
         * @type {string}
         */
        const navoptions_section_id = "seno-navbar-options";
    
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
        let dropdown_sections = [
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

        getNavigationOptions();
    });
    
    
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
         * Retrieves the navigation options from the txy page
         * @return {Promise<NavbarSections[]>}
         */
        const getNavigationOptions = async () => {
            if (!txy_repository.pageExists(navigation_page_id)) {
                await txy_repository.refreshExistingPages();
                if (!txy_repository.pageExists(navigation_page_id)) {
                    console.error(`The navigation page with id '${navigation_page_id}' does not exist`);
                    return [];
                }
            }
            const current_locale = txy_repository.CurrentLocale;
            const navigation_page = await txy_repository.getPage(navigation_page_id);
            const sections = navigation_page.locales_content[current_locale];

            // Get nav options part

            const navoptions_section = sections.find(section => section.SectionId === navoptions_section_id);

            const nav_options = parseContentEntries(navoptions_section.ContentEntries);
            
            if (nav_options.length > 0) {
                dropdown_sections = nav_options;
            }
        }

        /**
         * Parses txy content entries into navbar sections
         * @param {TxyContentEntry[]} content_entries
         * @return {NavbarSections[]}
         */
        const parseContentEntries = content_entries => {
            return content_entries.map(content_entry => {
                return {
                    name: content_entry.Text !== "" ? content_entry.Text : content_entry.name,
                    href: content_entry.Href ?? "#",
                }
            });
        }
        

        /**
         * Toggles the mobile menu
         */
        const toggleMobileMenu = () => {
            is_mobile_menu_opened.set(!$is_mobile_menu_opened);
        }
    
    /*=====  End of Methods  ======*/
    
    
</script>

<nav id="santa-elena-navbar" class:glass-navbar={!$navbar_transparent && !$is_mobile_menu_opened && !$navbar_solid} class:solid-navbar={$is_mobile_menu_opened || $navbar_solid }>
    <div id="sen-left-content">
        {#if !$layout_properties.IS_MOBILE}
            <a href="/" id="sen-santa-elena-logo" class="sen-icon-wrapper" use:link>
                {#if santa_elena_logo_svg !== undefined}
                    {@html santa_elena_logo_svg}
                {/if}
            </a>
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
                <button class="button-thin" class:button-1={!$navbar_transparent && !$navbar_solid} class:button-2={$navbar_transparent} class:button-3={$navbar_solid}>
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

    #santa-elena-navbar.glass-navbar.solid-navbar, #santa-elena-navbar.solid-navbar {
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
        text-transform: capitalize;
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
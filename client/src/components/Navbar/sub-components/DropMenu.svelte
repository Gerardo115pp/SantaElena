<script>
    import { Writable } from "svelte/store";
    // import { scrollToSection } from "@pages/Home/sections";
    import { slide } from "svelte/transition";

    /**
     * @typedef {Object} Section
     * @property {string} name
     * @property {string} href
    */
   
    /** @type {Section[]} */
   export let sections = [];

    /** @type {Writable<boolean>}*/
   export let visible;

   const appearance_animation_duration = 600;
   const appearance_animation_delay = 150;

    /**
     * @description Handles the click event on the anchor tags of the submenu items.
     * @param {MouseEvent} e
    */
    const clickAnchorHandler = e => {
        e.preventDefault();

        visible.set(false);

        // scrollToSection(e.currentTarget.getAttribute("href"));
    }
</script>

<div id="submenu-wrapper" style:animation-duration="{appearance_animation_duration}ms" style:animation-delay="{appearance_animation_delay}ms">
    <ul id="submenu">
        {#each sections as s, h}
             <li in:slide|global={{axis: 'y', delay: (appearance_animation_delay+appearance_animation_duration) + (100*h), duration: 300}} class="submenu-item">
                <a on:click={clickAnchorHandler} href="{s.href}">
                    {s.name}
                </a>
            </li>
        {/each}
    </ul>
</div>

<style>
    @keyframes DropMenuAppears {
        0% {
            transform: translateX(-90%);
        }
        39% {
            transform: translateX(0);
            background-color: var(--color-light-3);
        }
        100% {
            background: var(--dark-7);
            transform: translateX(0);
        }
    }

    #submenu-wrapper {
        position: fixed;
        display: grid;
        top: var(--navbar-height);
        left: 0;
        width: 100%;
        height: calc(100vh - var(--navbar-height));
        background: var(--color-light-3);
        place-items: center;
        transform: translateX(-100%);
        z-index: var(--z-index-t-4);

        animation-name: DropMenuAppears;
        animation-fill-mode: forwards;
    }

    #submenu {
        display: flex;
        flex-direction: column;
        align-items: center;
        row-gap: var(--spacing-3);
        list-style: none;
    }

    .submenu-item {
        transform-origin: center center;
        transition: all .2s ease-in;
    }

    .submenu-item:hover {
        transform: translate(0, -2px) scale(1.1);
    }

    .submenu-item a {
        font-family: var(--font-read);
        cursor: pointer;
        text-decoration: none;
        color: var(--color-light-3);
        font-size: calc(var(--font-size-h1) * .75);
        line-height: 1;
        transition: all .3s ease-in-out;
    }

    .submenu-item a:hover {
        color: var(--color-light);
        transform: translate(0, -5px) scale(1.1);
    }
</style>
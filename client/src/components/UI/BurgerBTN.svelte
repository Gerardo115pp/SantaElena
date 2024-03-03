<script>
    import { createEventDispatcher } from "svelte";
    import { Writable } from "svelte/store";

    export let aria_label = "Navigation menu";

    const dispatch = createEventDispatcher();

    /** @type {Writable<boolean>} */
    export let is_opened;

    const click_handler = () => {
        dispatch('click');
    }


</script>

<svg class="libery-burger-btn" class:opened={$is_opened} on:click={click_handler} role="button" tabindex="0" aria-label="{aria_label}" viewBox="0 0 50 35" fill="none">
    <!-- <path class:x-diagonal={$is_opened} d="M53.424 6.918H1.912C0.846667 6.918 0.314001 6.60467 0.314001 5.978C0.314001 5.47667 0.690001 4.81867 1.442 4.004C2.25667 3.12667 3.00867 2.688 3.698 2.688H55.116C56.1813 2.688 56.714 2.97 56.714 3.534C56.714 4.16067 56.338 4.85 55.586 5.602C54.8967 6.354 54.176 6.79267 53.424 6.918Z"/> -->
    <path class:x-diagonal={$is_opened} d="M3 3H32.9"/>
    <path class:into-oblivion={$is_opened} d="M3 17.5H47"/>
    <path class:x-diagonal-inverse={$is_opened} d="M14.1 32H47"/>
</svg>

<style>
    .libery-burger-btn {
        width: 100%;
        outline: none !important;
        overflow: visible;
    }
    
    .libery-burger-btn path {
        --btn-x-translate: 50%;

        stroke: var(--on-color);
        stroke-width: 2;
        stroke-linecap: round;
        transition: all .2s ease-in-out;
        transform-box: fill-box;
        transform-origin: left top;
    }

    .opened.libery-burger-btn path {
        stroke: var(--on-color-active);
    }
    
    .libery-burger-btn .into-oblivion {
        transition: all .2s ease-in;
    }

    .libery-burger-btn .x-diagonal {
        transform: translate(var(--btn-x-translate), 0);
        transition: all .2s ease-in;
    }
    
    .libery-burger-btn .x-diagonal-inverse {
        transform: translate(calc(var(--btn-x-translate) * -0.7), 0);
        transition: all .2s ease-in;
    }
</style>
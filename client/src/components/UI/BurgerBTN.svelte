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

<svg class="libery-burger-btn" class:opened={$is_opened} on:click={click_handler} role="button" tabindex="0" aria-label="{aria_label}" viewBox="0 0 57 43" fill="none">
    <path class:x-diagonal={$is_opened} d="M53.424 6.918H1.912C0.846667 6.918 0.314001 6.60467 0.314001 5.978C0.314001 5.47667 0.690001 4.81867 1.442 4.004C2.25667 3.12667 3.00867 2.688 3.698 2.688H55.116C56.1813 2.688 56.714 2.97 56.714 3.534C56.714 4.16067 56.338 4.85 55.586 5.602C54.8967 6.354 54.176 6.79267 53.424 6.918Z"/>
    <path class:into-oblivion={$is_opened} d="M53.424 23.918H1.912C0.846667 23.918 0.314001 23.6047 0.314001 22.978C0.314001 22.4767 0.690001 21.8187 1.442 21.004C2.25667 20.1267 3.00867 19.688 3.698 19.688H55.116C56.1813 19.688 56.714 19.97 56.714 20.534C56.714 21.1607 56.338 21.85 55.586 22.602C54.8967 23.354 54.176 23.7927 53.424 23.918Z"/>
    <path class:x-diagonal-inverse={$is_opened} d="M53.424 40.918H1.912C0.846667 40.918 0.314001 40.6047 0.314001 39.978C0.314001 39.4767 0.690001 38.8187 1.442 38.004C2.25667 37.1267 3.00867 36.688 3.698 36.688H55.116C56.1813 36.688 56.714 36.97 56.714 37.534C56.714 38.1607 56.338 38.85 55.586 39.602C54.8967 40.354 54.176 40.7927 53.424 40.918Z"/>
</svg>

<style>
    @keyframes IntoOblivion {
        0% {
            transform: translateY(0);
            opacity: 1;
        }
        70% {
            transform: translateY(45%);
            opacity: 0;
        }
        100% {
            transform: translateY(100%);
            opacity: 0;
        }
    }

    .libery-burger-btn {
        width: 100%;
        outline: none !important;
        overflow: visible;
    }
    
    .libery-burger-btn path {
        --btn-x-rotation: 47deg;  
        --btn-x-translate: -95%;

        fill: var(--clear-1);
        transition: all .2s ease-in-out;
        transform-box: fill-box;
        transform-origin: left top;
    }

    .opened.libery-burger-btn path {
        fill: var(--color-light-6);
    }
    
    .libery-burger-btn .into-oblivion {
        transform-origin: center;
        animation-name: IntoOblivion;
        animation-duration: .5s;
        animation-fill-mode: forwards;
    }

    .libery-burger-btn .x-diagonal {
        transform: translate(calc(-0.069416 * var(--btn-x-translate)), calc(0.65 * var(--btn-x-translate))) rotate(var(--btn-x-rotation)) ;
        transition: all .2s ease-in;
    }
    
    .libery-burger-btn .x-diagonal-inverse {
        transform: translate(calc(-0.031416 * var(--btn-x-translate)), calc(-1 * var(--btn-x-translate))) rotate(calc(var(--btn-x-rotation) * -1));
        transition: all .2s ease-in;
    }
</style>
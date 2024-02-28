<script>
    import modal_registry from "@components/modals/modal_registery";
    import { application_information } from "@stores/txy_content";
    import { onMount } from "svelte";
    import Dashboard from "@pages/Dashboard/Dashboard.svelte";
    import { getAvailableAttributes } from "@models/txy_content";
    import { initializeStores } from '@skeletonlabs/skeleton';
    import { Modal } from "@skeletonlabs/skeleton";
    import "bytemd/dist/index.css";
    
    
    /*=============================================
    =            Setup            =
    =============================================*/
    
        initializeStores();
    
    /*=====  End of Setup  ======*/
    
    

    /*=============================================
    =            Properties            =
    =============================================*/
    
        const app_name = APP_NAME; // Replaced by webpack

        let application_loaded = false;

    /*=====  End of Properties  ======*/

    onMount(() => {
        loadApplicationInformation();        
    });

    
    /*=============================================
    =            Methods            =
    =============================================*/
    
        const loadApplicationInformation = async () => {
            let content_attributes = await getAvailableAttributes();

            application_information.content_attributes = content_attributes;

            application_loaded = true;
        }    
    
    /*=====  End of Methods  ======*/
    
    

</script>

<svelte:head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=La+Belle+Aurore&family=Permanent+Marker&family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;1,100;1,200;1,300;1,400;1,500;1,600&display=swap" rel="stylesheet">
</svelte:head>
<Modal 
    components={modal_registry}
/>
<main id="txy-wp-plugin" >
    {#if application_loaded}
        <Dashboard />
    {/if}
</main>

<style>
    :root {
        /* Color palette */
            /* Main */
                --main: hsla(30, 100%, 50%,1);
                --main-9: hsla(29, 100%, 12.5%, 1);
                --main-8: hsla(30, 100%, 24.9%, 1);
                --main-7: hsla(30, 100%, 37.5%, 1);
                --main-6: hsla(30, 100%, 49.8%, 1);
                --main-5: hsla(33, 100%, 60%, 1);
                --main-4: hsla(29, 100%, 70%, 1);
                --main-3: hsla(29, 100%, 70%, 1);
                --main-2: hsla(36, 100%, 80%, 1);
                --main-1: hsla(26, 100%, 88.6%, 1);
            /* Dark */
                --main-dark: hsla(19, 100%, 49%, 1);
                --main-dark-color-9: hsla(19, 100%, 12.4%, 1);
                --main-dark-color-8: hsla(20, 100%, 24.5%, 1);
                --main-dark-color-7: hsla(19, 100%, 36.9%, 1);
                --main-dark-color-6: hsla(23, 100%, 49.8%, 1);
                --main-dark-color-5: hsla(26, 100%, 50%, 1);
                --main-dark-color-4: hsla(26, 100%, 60%, 1);
                --main-dark-color-3: hsla(23, 98.7%, 69.8%, 1);
                --main-dark-color-2: hsla(20, 96.2%, 79.6%, 1);
                --main-dark-color-1: hsla(4, 85.5%, 89.2%, 1);
                --main-dark-transparent: hsla(19, 100%, 49%, .3);
            /* Accent */
                --accent: hsla(211, 100%, 52.5%, 1);
                --accent-9: hsla(212, 88%, 3%, 1);
                --accent-8: hsla(210, 91%, 13.1%, 1);
                --accent-7: hsla(211, 90.1%, 19.8%, 1);
                --accent-6: hsla(211, 89.6%, 26.5%, 1);
                --accent-5: hsla(211, 90.7%, 29.4%, 1);
                --accent-4: hsla(211, 90%, 39.4%, 1);
                --accent-3: hsla(211, 58.7%, 51.6%, 1);
                --accent-2: hsla(211, 100%, 71.6%, 1);
                --accent-1: hsla(211, 100%, 81%, 1);
            /* Grey */
                --grey: hsla(0, 0%, 5.9%, 1);
                --grey-9: hsla(0, 0%, 7.5%, 1);
                --grey-8: hsla(0, 0%, 13.7%, 1);
                --grey-7: hsla(0, 0%, 14.9%, 1);
                --grey-6: hsla(0, 0%, 22.4%, 1);
                --grey-5: hsla(0, 0%, 20%, 1);
                --grey-4: hsla(0, 0%, 27.5%, 1);
                --grey-3: hsla(0, 0%, 54.9%, 1);
                --grey-2: hsla(0, 0%, 72.9%, 1);
                --grey-1: hsla(0, 0%, 91%, 1);

                --grey-t: hsla(0, 0%, 5.9%, .6);
            /* Success */
                --success: hsla(81, 100%, 51.2%, 1);
                --success-9: hsla(91, 100%, 12.5%, 1);
                --success-8: hsla(91, 100%, 25.1%, 1);
                --success-7: hsla(98, 100%, 37.5%, 1);
                --success-6: hsla(104, 100%, 50%, 1);
                --success-5: hsla(107, 100%, 60%, 1);
                --success-4: hsla(107, 100%, 60%, 1);
                --success-3: hsla(120, 100%, 70%, 1);
                --success-2: hsla(132, 100%, 80%, 1);
                --success-1: hsla(80, 100%, 80.4%, 1);

                --success-t: hsla(81, 100%, 51.2%, .7);
            /* Warning */
                --warning: hsla(49, 100%, 49.6%, 1);
                --warning-9: hsla(52, 100%, 2.9%, 1);
                --warning-8: hsla(50, 100%, 9.2%, 1);
                --warning-7: hsla(49, 100%, 12.4%, 1);
                --warning-6: hsla(49, 100%, 24.9%, 1);
                --warning-5: hsla(49, 100%, 27.8%, 1);
                --warning-4: hsla(49, 100%, 37.1%, 1);
                --warning-3: hsla(49, 59.7%, 49.6%, 1);
                --warning-2: hsla(49, 59.4%, 62.4%, 1);
                --warning-1: hsla(49, 98.1%, 79.8%, 1);
            /* Danger */
                --danger: hsla(3, 100%, 44.9%, 1);
                --danger-9: hsla(3, 100%, 11.2%, 1);
                --danger-8: hsla(4, 100%, 22.9%, 1);
                --danger-7: hsla(3, 100%, 34.5%, 1);
                --danger-6: hsla(10, 100%, 49.6%, 1);
                --danger-5: hsla(10, 99%, 59.8%, 1);
                --danger-4: hsla(10, 98.7%, 69.8%, 1);
                --danger-3: hsla(7, 94.3%, 79.4%, 1);
                --danger-2: hsla(4, 85.5%, 89.2%, 1);
                --danger-1: hsla(4, 85.5%, 89.2%, 1);

            /* Gradients */
                --glass-gradient: linear-gradient(90deg, var(--grey) 0%, var(--grey) 9%, hsla(0, 0%, 5%, .1) 29%, var(--grey) 80%);

        /* Elements */
            --html-tag-color: var(--grey-8);

        /* Spacing */
            --spacing-base:8px;
            --spacing-scale: 1;

            --spacing-1: calc(var(--spacing-base) * var(--spacing-scale)); /* 8px */
            --spacing-2: calc(var(--spacing-1) * 2); /* 16px */
            --spacing-3: calc(var(--spacing-2) * 2); /* 32px */
            --spacing-4: calc(var(--spacing-3) * 2); /* 64px */
            --spacing-5: calc(var(--spacing-4) * 2); /* 128px */
            --spacing-6: calc(var(--spacing-5) * 2); /* 256px */
            --spacing-7: calc(var(--spacing-6) * 2); /* 512px */
            --spacing-8: calc(var(--spacing-7) * 2); /* 1024px */
            --spacing-9: calc(var(--spacing-8) * 2); /* 2048px */
            
        /* Fonts */
            --font-size-1: 16px; /* 16px */
            --font-size-2: calc(var(--font-size-1) * 1.1875); /* 19px */
            --font-size-3: calc(var(--font-size-1) * 1.3225); /* 21px */
            --font-size-4: calc(var(--font-size-1) * 1.5); /* 23px */

            --font-size-p: var(--font-size-2);
            --font-size-p-small: var(--font-size-1);
            --font-size-fineprint: calc(var(--font-size-1) * 0.7);

            --font-size-h1: calc(112px); /* 112px */
            --font-size-h2: calc(0.67142 * var(--font-size-h1)); /* 64px */
            --font-size-h3: calc(var(--font-size-h2) * 0.71875); /* 46px */
            --font-size-h4: calc(var(--font-size-h3) * 0.71875); /* 33px */
            --font-size-h5: calc(var(--font-size-h4) * 0.71875); /* 24px */
            --font-size-h6: calc(var(--font-size-h5) * 0.71875); /* 17px */

            --font-size-CTA-1: calc(var(--font-size-h2) * 0.5625);

            --font-titles: 'Permanent Marker';
            --font-read: 'Raleway';
            --font-decorative: 'La Belle Aurore';

            font-size: var(--font-size-p) !important;
        /* Z-INDEX */

            /* Use these -b- suffix for background elements */
            --z-index-b-1: -1; /* B stands for bottom, not base */
            --z-index-b-2: -2;
            --z-index-b-3: -3;
            --z-index-b-4: -4;
            --z-index-b-5: -5;
            --z-index-b-6: -6;
            --z-index-b-7: -7;
            --z-index-b-8: -8;
            --z-index-b-9: -9;

            /* Regular elements */
            --z-index-1: 1;
            --z-index-2: 2;
            --z-index-3: 3;
            --z-index-4: 4;
            --z-index-5: 5;
            --z-index-6: 6;
            --z-index-7: 7;
            --z-index-8: 8;
            --z-index-9: 9;

            /* Use these -t- suffix for top elements like modals */
            --z-index-t-1: 11; /* T stands for top */
            --z-index-t-2: 12;
            --z-index-t-3: 13;
            --z-index-t-4: 14;
            --z-index-t-5: 15;
            --z-index-t-6: 16;
            --z-index-t-7: 17;
            --z-index-t-8: 18;
            --z-index-t-9: 19;


        /* Layout */

            --desktop-grid: 12;
            --tablet-grid: 8;
            --mobile-grid: 4;

            --default-grid: var(--desktop-grid);
            --full-width: 1 / -1;



        /* Misc */

            /* Buttons */
            --buttons-font-size: var(--font-size-1);
            --buttons-padding: calc(var(--buttons-font-size) * .3) calc(var(--buttons-font-size) * 1);
            --buttons-padding-thin: calc(var(--buttons-font-size) * .6) calc(var(--buttons-font-size) * 1.6)

            --navbar-height: calc(var(--spacing-5) * 0.96875);
            --border-radius: 4px;
            --border-radius-2: 19px;
            --page-content-width: 90.41%;
            --page-lateral-spacing: calc(calc(100vw - var(--page-content-width)) / 2);
            --boxes-shadow: 0px 0px 10px 0px hsla(0, 0%, 0%, .3);
    }

/*=============================================
=            Normalize            =
=============================================*/

    :global(*) {
        box-sizing: border-box;
    }

    :global(body::-webkit-scrollbar) {
        display: none;
    }

    :root::-webkit-scrollbar {
        display: none;
    }

    :global(.grecaptcha-badge) {
        visibility: hidden !important;
    }

    :global(body) {
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;  /* Firefox */
    }

    :global(body) {
        --body-bg-color: var(--grey-9);
        --body-text-color: var(--grey-1);

        margin: 0;
        padding: 0;
        font-family: var(--font-read);
        font-size: var(--font-size-1);
        color: var(--body-text-color);
        background: var(--body-bg-color);
    }

    :global(ul#adminmenu > li.current > a.current:after) {
        border-right-color: var(--grey-9) !important;
    }

    :global(h1, h2, h3, h4, h5, h6) {
        font-family: var(--font-titles);
        color: var(--grey-1);
        font-weight: normal;
        margin: 0;
        line-height: 1;
    }

    :global(h1) {
        font-size: var(--font-size-h1);
    }

    :global(h2) {
        font-size: var(--font-size-h2);
    }

    :global(h3) {
        font-size: var(--font-size-h3);
    }

    :global(h4) {
        font-size: var(--font-size-h4);
    }

    :global(h5) {
        font-size: var(--font-size-h5);
    }

    :global(h6) {
        font-size: var(--font-size-h6);
    }

    :global(p) {
        margin: 0;
        font-size: var(--font-size-p);
    }

    :global(small) {
        font-size: var(--font-size-p-small);
    }

    :global(ul, ol, menu) {
        list-style: none;
        padding: 0;
        margin: 0;
    }


/*=============================================
=            Layout            =
=============================================*/

    #txy-wp-plugin {
        container-type: inline-size;
        container-name: txy-wp-plugin;
        position: relative;
    }

    :global(.section-content-layout) {
        display: grid;
        width: var(--page-content-width);
        grid-template-columns: repeat(12, 1fr);
        column-gap: var(--page-gutter);
    }

    :global(.container-inline-wrapper) {
        container-type: inline-size;
    }

    :global(.container-size-wrapper) {
        container-type: size;
    }

    :global(.bg-wrapper) {
        position: absolute;
        z-index: var(--z-index-b-1);
    }

    /* #router-wrapper {
        margin-top: var(--navbar-height);
    } */

    /* .navbarless #router-wrapper {
        margin-top: 0px;
    } */

    :global(ul.page-nav-menu) {
        display: flex;
        list-style: none;
        align-items: center;
        margin: 0;
        padding: 0;
    }

    :global(.libery-scroll::-webkit-scrollbar) {
        color: var(--dark-5);
        width: var(--spacing-1);
        opacity: .1 !important;
    }
    
    :global(.libery-scroll::-webkit-scrollbar-thumb) {
        background: var(--dark-5);
        border-radius: calc(.27777 * var(--border-radius-2));
        opacity: .1;
    }
    
    :global(.libery-scroll::-webkit-scrollbar-track) {
        background: transparent;
        margin-right: var(--spacing-1);
        padding: var(--spacing-1);
    }

    @media only screen and (min-width: 900px) {
        :global(.mobile-only) {
            display: none !important;
        }
    }

    @media only screen and (max-width: 900px) {
        :global(.desktop-only) {
            display: none !important;
        }
    }

    :global(.santa-elena-image) {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
        border-radius: var(--border-radius);
        border: 1px solid var(--color-light-7);
        box-shadow: var(--box-shadow);
    }

    :global(.html-tag) {
        color: var(--html-tag-color);
        font-family: var(--font-decorative);
        font-size: var(--font-size-4);
        line-height: .6;
        user-select: none;
    }


/*=============================================
=            ByteMD            =
=============================================*/

    :global(#txy-wp-plugin .bytemd.bytemd-split) {
        font-family: var(--font-read);
        background: var(--grey-8) !important;
        border: .5px solid var(--main-dark);
        border-radius: var(--border-radius);
        color: var(--main);
    }

    :global(#txy-wp-plugin .bytemd-toolbar) {
        background: var(--grey-8);
        border: none;
    }

    :global(#txy-wp-plugin .CodeMirror) {
        font-family: var(--font-read);
        background: var(--grey-4) !important;
        border: none;
        color: var(--main);
    }

    :global(#txy-wp-plugin .bytemd-split .bytemd-preview) {
        border-left: none;
    }

    :global(#txy-wp-plugin .bytemd-status) {
        border-top: none;
        background: var(--grey-1);
        height: max-content;
    }

    :global(#txy-wp-plugin .bytemd p) {
        margin: var(--spacing-1) 0;
    }

/*=====  End of ByteMD  ======*/



/*=============================================
=            Text Styles            =
=============================================*/

    :global(.headline-2) {
        font-family: var(--font-titles);
        color: var(--main);
        font-size: var(--font-size-h3);
        font-weight: 300;
    }

/*=============================================
=            Buttons            =
=============================================*/

    :global(button, .button-1, .button-2) {
        font-family: var(--font-read);
        border-radius: var(--border-radius);
        border: none;
        padding: var(--buttons-padding);
        font-size: var(--buttons-font-size);
        font-weight: 300;
        transition: all .4s ease-in-out;
        box-shadow: var(--box-shadow);
    }

    :global(.button-thin) {
        width: max-content;
    }

    :global(.button-secondary) {
        filter: saturate(.3) brightness(1.1);
        padding: var(--buttons-padding-thin);
    }
    
    :global(.button-1) {
        background: var(--main);
        color: var(--grey-1);
    }

    :global(.button-2) {
        background: var(--main-dark);
        color: var(--grey-1);
    }

    @media (pointer: fine) {
        :global(button:hover, .button-1:hover, .button-2:hover) {
            filter: saturate(1) brightness(1.1);
        }

        :global(button.button-secondary:hover) {
            filter: saturate(.7) brightness(1.1);
        }
    }

/*=====  End of Buttons  ======*/
/*=============================================
=            Mobile            =
=============================================*/

    :global(.hide) {
        display: none !important;
    }

    @media only screen and (max-width: 765px) {
        :root {
            --spacing-scale: .714583;

            --font-size-h1: 48px; /* 112px */
            --font-size-1: 14px; /* 16px */
            

            --default-grid: var(--mobile-grid);
            --html-tag-color: var(--grey-6);
        }

        :global(.hide-on-mobile) {
            display: none !important;
        }

        :global(.section-content-layout) {
            display: flex;
            width: var(--page-content-width);
            flex-direction: column;
            column-gap: var(--spacing-3);
        } 
    
        :global(body){
            width: 100vw;
        }
    }

/*=====  End of Mobile  ======*/
/*=============================================
=            Debug            =
=============================================*/

:global(.debug) {
        border: 1px solid red;
    }
    
    :global(.adebug) {
        border: 1px solid rgb(255, 72, 72);
    }

    :global(.debug > *) {
        border: 1px solid red;
    }

    :global(.adebug *) {
        border: 1px solid rgb(107, 107, 255);
    }

    :global(.dtwo) {
        border: 1px solid blue !important;
    }

    :global(.dthree) {
        border: 1px solid green !important;
    }

    :global(.dfour) {
        border: 1px solid yellow !important;
    }



/*=====  End of Debug  ======*/
</style>
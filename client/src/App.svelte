<script>
    import Router from 'svelte-spa-router';
    import { routes } from './routes';
    import NotificationsPopup from '@components/Popups/NotificationsPopup.svelte';
    import Navbar from '@components/Navbar/Navbar.svelte';
    import { onMount } from 'svelte';
    import { defineLayout, layout_properties, hasChangedLayout } from '@stores/layout';
    
    
    const ENABLE_DEBUG_ON_MOBILE = false;
    if (ENABLE_DEBUG_ON_MOBILE && $layout_properties.IS_MOBILE) {
        debugOnMobile();
    }

    onMount(() => {
        defineLayout();
    })

    function debugOnMobile() { 
        let script = document.createElement('script');
        script.src="https://cdn.jsdelivr.net/npm/eruda"; 
        document.body.append(script); 
        script.onload = () => eruda.init();
    }

    const handleLayoutResize = () => {
        if (hasChangedLayout()) {
            defineLayout();
        }
    }

</script>

<svelte:window 
    on:resize={handleLayoutResize}
/>

<svelte:head>
    <link rel="stylesheet" href="https://use.typekit.net/tpf7knz.css">
</svelte:head>
<div id="libery-website-wrapper">
    <Navbar />
    <!-- <NotificationsPopup /> -->
    <div id="router-wrapper">
        <Router {routes}/>
    </div>
</div>

<style global>
    :root {
        /* Color palette */
            
            /* Clear */
            --clear: hsl(31, 51%, 84%);
            --clear-1: hsl(0, 0%, 100%);
            --clear-2: hsl(30, 50%, 96%);
            --clear-3: hsl(31, 51%, 92%);
            --clear-4: hsl(31, 51%, 92%);
            /* Color */
            --color: hsl(28, 91%, 50%);
            --color-1: hsl(28, 83%, 91%);
            --color-2: hsl(28, 66%, 84%);
            --color-3: hsl(28, 76%, 77%);
            --color-4: hsl(28, 72%, 71%);
            --color-5: hsl(28, 69%, 63%);
            --color-6: hsl(29, 63%, 53%);
            --color-7: hsl(29, 74%, 42%);
            --color-8: hsl(28, 78%, 36%);
            --color-9: hsl(28, 94%, 26%);
            /* Color Accent */
            --color-accent: hsl(76, 97%, 54%);
            --color-accent-1: hsl(76, 83%, 91%);
            --color-accent-2: hsl(76, 66%, 84%);
            --color-accent-3: hsl(76, 72%, 71%);
            --color-accent-4: hsl(76, 69%, 63%);
            --color-accent-6: hsl(76, 63%, 53%);
            --color-accent-7: hsl(76, 74%, 42%);
            --color-accent-8: hsl(76, 78%, 36%);
            --color-accent-9: hsl(76, 94%, 26%);
            /* Color Light */
            --color-light: hsl(45, 91%, 50%);
            --color-light-1: hsl(44, 83%, 91%);
            --color-light-2: hsl(46, 66%, 84%);
            --color-light-3: hsl(45, 76%, 77%);
            --color-light-4: hsl(45, 72%, 71%);
            --color-light-5: hsl(45, 69%, 63%);
            --color-light-6: hsl(45, 63%, 53%);
            --color-light-7: hsl(45, 74%, 42%);
            --color-light-8: hsl(45, 78%, 36%);
            --color-light-9: hsl(45, 94%, 26%);
            /* Dark color */
            --dark: hsl(0, 0%, 13%);
            --dark-1: hsl(0, 0%, 52%);
            --dark-2: hsl(0, 0%, 48%);
            --dark-3: hsl(0, 0%, 44%);
            --dark-4: hsl(0, 0%, 40%);
            --dark-5: hsl(0, 0%, 36%);
            --dark-6: hsl(0, 0%, 32%);
            --dark-7: hsl(0, 0%, 28%);
            --dark-8: hsl(0, 0%, 24%);
            --dark-9: hsl(0, 0%, 20%);
            /* Shade */
            --shade-1: hsl(28, 37%, 80%);
            --shade-2: hsl(28, 37%, 76%);
            --shade-3: hsl(28, 37%, 72%);
            --shade-4: hsl(28, 37%, 68%);
            --shade-6: hsl(28, 37%, 56%);
            --shade-7: hsl(28, 37%, 48%);
            --shade-8: hsl(28, 37%, 40%);
            --shade-9: hsl(28, 37%, 28%);
            /* Shade Light */
            --shade-light-1: hsl(30, 70%, 96%);
            --shade-light-2: hsl(31, 66%, 92%);
            --shade-light-3: hsl(31, 67%, 87%);
            --shade-light-4: hsl(31, 68%, 84%);
            --shade-light-6: hsl(31, 66%, 72%);
            --shade-light-7: hsl(31, 66%, 64%);
            --shade-light-8: hsl(31, 66%, 52%);
            --shade-light-9: hsl(31, 66%, 44%);
            --shade-light: hsl(31, 67%, 80%);
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
            --warning: rgb(240, 196, 2);
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
            --glass-gradient: linear-gradient(90deg, var(--shade-light-1) 0%, var(--shade-light-1) 9%, hsla(30, 70%, 96%, .1) 29%, var(--shade-light-1) 80%);

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

            --font-titles: 'ivymode';
            --font-read: 'commuters-sans';

            font-size: var(--font-size-p) !important;

        /* Buttons */
            --buttons-font-size: var(--font-size-2);
            --buttons-padding: calc(var(--buttons-font-size) * .6) calc(var(--buttons-font-size) * 2.6);
            --buttons-padding-thin: calc(var(--buttons-font-size) * .6) calc(var(--buttons-font-size) * 1.6);

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

        --page-lateral-spacing: 4.6875vw;
        --page-gutter: 36px;
        --page-content-width: calc(100vw - (var(--page-lateral-spacing) * 2));

        /* Misc */

        --navbar-height: calc(var(--spacing-5) * 0.96875);
        --border-radius: 2px;
        --border-radius-2: 19px;
        --box-shadow: 4px 10px 12px 0px rgba(0,0,0,0.09);
        /* --box-shadow: 4px 10px 12px 0px rgba(0,0,0,0.0); */

        --mobile-breakpoint: 765px;
        --tablet-breakpoint: 1024px;
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
        --body-bg-color: var(--clear-4);
        --body-text-color: var(--grey);

        margin: 0;
        padding: 0;
        font-family: var(--font-read);
        font-size: var(--font-size-1);
        color: var(--body-text-color);
        background: var(--body-bg-color);
    }

    :global(h1, h2, h3, h4, h5, h6) {
        font-family: var(--font-titles);
        color: var(--grey-1);
        font-weight: normal;
        margin: 0;
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

    :global(ul, ol) {
        list-style: none;
        padding: 0;
        margin: 0;
    }


/*=============================================
=            Layout            =
=============================================*/

    #libery-website-wrapper {
        border-top: .1px solid var(--grey);
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

/*=============================================
=            Text Styles            =
=============================================*/

    :global(.headline-2) {
        font-family: var(--font-titles);
        color: var(--shade-light-9);
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
        background: var(--color-4);
        color: var(--dark-7);
    }

    :global(.button-2) {
        background: var(--dark-7);
        color: var(--color-light-2);
    }

    @media (pointer: fine) {
        :global(button:hover, .button-1:hover, .button-2:hover) {
            filter: saturate(1) brightness(1.1);
        }

        :global(button.button-secondary:hover) {
            filter: saturate(.7) brightness(1.1);
        }
    }


/*=============================================
=            Misc Elements            =
=============================================*/

    :global(ul.decorated-list-item) {
        padding: 0 0 0 var(--spacing-1);
    }

    :global(ul.decorated-list-item li) {
        font-family: var(--font-read);
        color: var(--grey-5);
        font-size: var(--font-size-p);
        font-weight: normal;
    }

    :global(ul.decorated-list-item li::before) {
        content: '•';
        margin-right: var(--spacing-1);
        color: var(--shade-light-8);
    }

/*=============================================
=            Interactions            =
=============================================*/
    @media(pointer: fine) {

        :global(.image-interact) {
            transition: all .4s cubic-bezier(0.075, 0.82, 0.165, 1);
        }

        :global(.image-interact:hover) {
            filter: brightness(1.3) saturate(1.5) hue-rotate(2deg);
        }

    }



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


/*=============================================
=            Animations            =
=============================================*/



/*=====  End of Animations  ======*/
/*=============================================
=            Mobile            =
=============================================*/

    :global(.hide-on-mobile) {
        display: none !important;
    }

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
</style>


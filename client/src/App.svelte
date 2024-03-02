<script>
    import Router from 'svelte-spa-router';
    import { routes } from './routes';
    import txy_repository from "@app_modules/TxyClient/txy_repository";
    import NotificationsPopup from '@components/Popups/NotificationsPopup.svelte';
    import Navbar from '@components/Navbar/Navbar.svelte';
    import { onMount } from 'svelte';
    import { defineLayout, layout_properties, hasChangedLayout } from '@stores/layout';

    
    /*=============================================
    =            Properties            =
    =============================================*/
    
        const ENABLE_DEBUG_ON_MOBILE = false;
        
        /*----------  Init logic  ----------*/
    
            if (ENABLE_DEBUG_ON_MOBILE && $layout_properties.IS_MOBILE) {
                debugOnMobile();
            }
    
    
    /*=====  End of Properties  ======*/

    onMount(async () => {
        defineLayout();

        txy_repository.boot();
    })

    
    /*=============================================
    =            Methods            =
    =============================================*/
    
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
    
    /*=====  End of Methods  ======*/
    
    


</script>

<svelte:window 
    on:resize={handleLayoutResize}
/>

<svelte:head>
    <link rel="stylesheet" href="https://use.typekit.net/tpf7knz.css">
</svelte:head>
<div id="libery-website-wrapper" data-theme="santa-elena-theme">
    <Navbar />
    <!-- <NotificationsPopup /> -->
    <div id="router-wrapper">
        <Router {routes}/>
    </div>
</div>

<style global lang="postcss">

/*=============================================
=            Normalize            =
=============================================*/

    :global(*) {
        box-sizing: border-box;
    }

    :global(body::-webkit-scrollbar) {
        display: none;
    }

    :global(:root::-webkit-scrollbar) {
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
        line-height: 1;
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

    :global(strong) {
        font-weight: 500;
        color: var(--color-5);
    }

    :global(ul, ol) {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    :global(a) {
        text-decoration: none;
        color: var(--color-7);
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

    :global(.headline-3) {
        font-family: var(--font-titles);
        color: var(--shade-light-7);
        font-size: var(--font-size-h4);
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

    :global(.button-3) {
        background: var(--color-4);
        color: var(--dark-7);
    }

    :global(.button-purchase) {
        background: var(--success-7);
        color: var(--clear-1);
        white-space: nowrap;
    }

    :global(.stripe-button) {
        background: var(--stripe);
        color: var(--clear-1);
        font-weight: 500;
    }

    :global(button:disabled) {
        filter: grayscale(0.9);
        cursor: not-allowed;
        pointer-events: none;
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
=            Forms            =
=============================================*/

    :global(input.input) {
        padding: var(--spacing-1);
        outline: none;
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


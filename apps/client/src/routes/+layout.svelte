<script>
    import '@app/app.css'
    import Footer from '@components/Footer/Footer.svelte';
    import Navbar from "@components/Navbar/Navbar.svelte";
    import { page } from '$app/stores';
    import { defineLayout, hasChangedLayout } from '@stores/layout';
    import { onMount } from 'svelte';
    import { browser } from '$app/environment';
    /**
     * @typedef {import("@models/Services").ServiceArchiveItem} ServiceArchiveItem
     */

    
    /*=============================================
    =            Properties            =
    =============================================*/
    
        /**
         * Santa elena services archive (name and id of each service)
         * @type {ServiceArchiveItem[]}
         */
         let services_archive = $page.data.se_services_archive;
    
    /*=====  End of Properties  ======*/
    
    onMount(() => {
        defineLayout();
    });
    
    
    /*=============================================
    =            Methods            =
    =============================================*/
    
        /**
         * Handles the layout resize event
         * @param {UIEvent} event
         */
        const handleLayoutResize = e => {
            if (!browser) return;

            if (hasChangedLayout()) {
                defineLayout();
            }
        }
                
    
    /*=====  End of Methods  ======*/
    
    

</script>

<svelte:head>
    <meta name="author" content="https://libery-labs.com">
</svelte:head>
<svelte:window 
    on:resize|passive={handleLayoutResize}
/>
<Navbar />
<slot></slot>
<Footer services={services_archive} />
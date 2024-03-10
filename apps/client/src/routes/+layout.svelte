<script>
    import '@app/app.css'
    import Footer from '@components/Footer/Footer.svelte';
    import Navbar from "@components/Navbar/Navbar.svelte";
    import { page } from '$app/stores';
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
    
    

</script>

<Navbar />
<slot></slot>
<Footer services={services_archive} />
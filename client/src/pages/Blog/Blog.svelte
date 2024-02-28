<script>
    import txy_repository from "@app_modules/TxyClient/txy_repository";
    import { navbar_solid } from "@stores/layout";
    import { user_locale } from "@stores/layout";
    import { txy_ready } from "@stores/txy";
    import BlogHeader from "./sections/BlogHeader.svelte";
    import BlogArchive from "./sections/BlogArchive.svelte";
    import { onMount } from "svelte";


    
    
    /*=============================================
    =            Setup            =
    =============================================*/
    
        navbar_solid.set(true);

        
    
    /*=====  End of Setup  ======*/
    
    
    
    /*=============================================
    =            Properties            =
    =============================================*/
    
        /**
         * The id of the txy page where the blog information is stored
         * @type {string}
         */
        const blog_page_id = "santa-elena-blog-page";

        /**
         * Whether the blog page is ready
         * @type {boolean}
         */
        let blog_ready = checkBlogReady();
    
    /*=====  End of Properties  ======*/

    onMount(async () => {
        let had_to_load = !blog_ready;

        if (had_to_load) {
            await requestBlogPage();
        } else {

        }
    })

    
    /*=============================================
    =            Methods            =
    =============================================*/
    
        /**
         * Checks if the blog page is ready and if needed sets the current page and locale
         * @returns {boolean}
         */
        function checkBlogReady() {
            return txy_repository.CurrentPageID === blog_page_id;
        }
            

        /**
         * Requests the blog page
         */
        const requestBlogPage = async () => {
            console.debug("Requesting blog page");
            if (!blog_ready) {
                txy_repository.refreshExistingPages();
            }

            let err = await txy_repository.setCurrentPageAndLocale(blog_page_id, user_locale);
            if (err != null) {
                console.error("Error setting current page and locale: ", err);
                return;
            }

            blog_ready = true;
        }

    /*=====  End of Methods  ======*/
    
    

    
    
</script>

<main id="santa-elena-blog-page">
    {#if blog_ready}
        <BlogHeader />
        <BlogArchive />
    {:else}
        <p>Loading...</p>
    {/if}
</main>

<style>
    #santa-elena-blog-page {
        display: flex;
        padding: calc(var(--navbar-height) + var(--spacing-5)) var(--spacing-4) var(--spacing-4) var(--spacing-4);
        flex-direction: column;
        row-gap: var(--spacing-4);
    }
</style>
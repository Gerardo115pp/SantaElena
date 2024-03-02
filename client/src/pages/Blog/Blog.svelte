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
</script>
    
<main id="santa-elena-blog-page">
	<BlogHeader />
	<BlogArchive />
</main>

<style>
    #santa-elena-blog-page {
        display: flex;
        padding: calc(var(--navbar-height) + var(--spacing-5)) var(--spacing-4) var(--spacing-4) var(--spacing-4);
        flex-direction: column;
        row-gap: var(--spacing-4);
    }
</style>
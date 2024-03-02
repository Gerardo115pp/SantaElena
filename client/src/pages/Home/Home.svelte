<script>
    import Hero from "@pages/Home/sections/Hero.svelte";
    import About from "@pages/Home/sections/About.svelte";
    import ParallaxDivider from "@components/UI/ParallaxDivider.svelte";
    import Services from "@pages/Home/sections/Services.svelte";
    import Footer from "@components/Footer/Footer.svelte";
    import { navbar_solid, navbar_transparent } from "@stores/layout";
    import TxyContentEntry from "@app_modules/TxyClient/models/content_entry";
    import txy_repository from "@app_modules/TxyClient/txy_repository";
    import { get_content_entries_params } from "@stores/txy";
    import { onMount } from "svelte";

    
    /*=============================================
    =            Setup            =
    =============================================*/
    
        navbar_solid.set(false);
        navbar_transparent.set(true);
    
    /*=====  End of Setup  ======*/

    
    /*=============================================
    =            Properties            =
    =============================================*/
    
        
        /*----------  Txy  ----------*/
        
            /** 
             * The content entry of the parallax divider section
             * @type {TxyContentEntry}
             */
            let parallax_divider_content_entry = txy_repository.getContentEntrySync(get_content_entries_params.HOME_PARALLAX_HEADLINE);

    
    /*=====  End of Properties  ======*/

    onMount(() => {
        updateContentEntry();
    });

    
    /*=============================================
    =            Methods            =
    =============================================*/
    
        /** 
         * Updates the parallax divider content entry
         * @returns {Promise<void>}
         */
        const updateContentEntry = async () => {
            let new_parallax_divider_content_entry = await parallax_divider_content_entry.GetFreshCopy();

            if (new_parallax_divider_content_entry !== null) {
                parallax_divider_content_entry = new_parallax_divider_content_entry;
            }
        }
    
    /*=====  End of Methods  ======*/
    
    
    
    
    
    

</script>

<main id="libery-santa-elena-home-page">
    <div id="home-page-section-wrapper" class="page-section-wrapper">
        <Hero />
    </div>
    <div id="about-page-section-wrapper" class="page-section-wrapper">
        <About />
    </div>
    <div id="parallax-divider-wrapper" class="page-section-wrapper">
        <ParallaxDivider catch_phrase_content={parallax_divider_content_entry.Text} />
    </div>
    <div id="services-page-section-wrapper" class="page-section-wrapper">
        <Services />
    </div>
</main>
<Footer />

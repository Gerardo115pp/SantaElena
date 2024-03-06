<script>
    import Hero from "@pages/Home/sections/Hero.svelte";
    import About from "@pages/Home/sections/About.svelte";
    import ParallaxDivider from "@components/UI/ParallaxDivider.svelte";
    import Services from "@pages/Home/sections/Services.svelte";
    import Footer from "@components/Footer/Footer.svelte";
    import TxyContentEntry from "@libs/TxyClient/models/content_entry";
    import txy_repository from "@libs/TxyClient/txy_repository";
    import { get_content_entries_params } from "@stores/txy";
    import { onDestroy, onMount } from "svelte";
    import createColoSchema, {
        supported_components,
        watchCollisions,
    } from "@libs/ColorSchema";
    import { browser } from "$app/environment";


    
    /*=============================================
    =            Setup            =
    =============================================*/
    
        if (browser) {
            window.scrollTo(0, 0);
        }
    
    /*=====  End of Setup  ======*/

    
    /*=============================================
    =            Properties            =
    =============================================*/

        /**
         * The sections that will change the color schema on collision
         */
        let page_sections = {
            HERO: {
                ord: 0,
                section_id: "hero-section-wrapper",
                ref: null,
                color_schema: createColoSchema({
                    color: "transparent",
                    contrast: "var(--clear-4)",
                    theme: "default"
                }, supported_components.NAVBAR)
            },
            ABOUT: {
                ord: 1,
                section_id: "about-page-section-wrapper",
                ref: null,
                color_schema: createColoSchema({
                    color: "var(--dark-7)",
                    contrast: "var(--color-light-4)",
                    theme: "glass-navbar"
                }, supported_components.NAVBAR)
            },
            PARALLAX: {
                ord: 2,
                section_id: "parallax-divider-wrapper",
                ref: null,
                color_schema: createColoSchema({
                    color: "var(--clear-4)",
                    contrast: "var(--dark-7)",
                    theme: "solid-dark"
                }, supported_components.NAVBAR)
            },
            SERVICES: {
                ord: 3,
                section_id: "services-page-section-wrapper",
                ref: null,
                color_schema: createColoSchema({
                    color: "var(--dark-7)",
                    contrast: "var(--color-light-4)",
                    theme: "solid-dark"
                }, supported_components.NAVBAR)
            },
            FOOTER: {
                ord: 4,
                section_id: "footer-section-wrapper",
                ref: null,
                color_schema: createColoSchema({
                    color: "var(--clear-4)",
                    contrast: "var(--dark-7)",
                    theme: "solid-dark"
                }, supported_components.NAVBAR)
            }
        };
    
        
        /*----------  Txy  ----------*/
        
            /** 
             * The content entry of the parallax divider section
             * @type {TxyContentEntry}
             */
            let parallax_divider_content_entry = txy_repository.getContentEntrySync(get_content_entries_params.HOME_PARALLAX_HEADLINE);

        let section_collision_listener_unsubscriber;

    /*=====  End of Properties  ======*/

    onMount(() => {
        page_sections.HERO.color_schema.define();

        section_collision_listener_unsubscriber = watchCollisions(page_sections);

        updateContentEntry();
    });

    onDestroy(() => {
        if (browser) {
            section_collision_listener_unsubscriber();
        }
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
    <div id="{page_sections.HERO.section_id}" class="page-section-wrapper" bind:this={page_sections.HERO.ref}>
        <Hero />
    </div>
    {#if browser}
        <div id="{page_sections.ABOUT.section_id}" class="page-section-wrapper" bind:this={page_sections.ABOUT.ref}>
            <About />
        </div>
        <div id="{page_sections.PARALLAX.section_id}" class="page-section-wrapper" bind:this={page_sections.PARALLAX.ref}>
            <ParallaxDivider catch_phrase_content={parallax_divider_content_entry.Text} />
        </div>
        <div id="{page_sections.SERVICES.section_id}" class="page-section-wrapper" bind:this={page_sections.SERVICES.ref}>
            <Services />
        </div>
    {/if}
</main>
<div id="{page_sections.FOOTER.section_id}" class="page-section-wrapper" bind:this={page_sections.FOOTER.ref}>
    <Footer />
</div>

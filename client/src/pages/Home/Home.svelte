<script>
    import Hero from "@pages/Home/sections/Hero.svelte";
    import About from "@pages/Home/sections/About.svelte";
    import ParallaxDivider from "@components/UI/ParallaxDivider.svelte";
    import Services from "@pages/Home/sections/Services.svelte";
    import Footer from "@components/Footer/Footer.svelte";
    import { navbar_solid, navbar_transparent } from "@stores/layout";

    
    /*=============================================
    =            Setup            =
    =============================================*/
    
        navbar_solid.set(false);
        navbar_transparent.set(true);
    
    /*=====  End of Setup  ======*/
    
    

</script>

<main id="libery-santa-elena-home-page">
    <div id="home-page-section-wrapper" class="page-section-wrapper">
        <Hero />
    </div>
    <div id="about-page-section-wrapper" class="page-section-wrapper">
        <About />
    </div>
    <div id="parallax-divider-wrapper" class="page-section-wrapper">
        <ParallaxDivider />
    </div>
    <div id="services-page-section-wrapper" class="page-section-wrapper">
        <Services />
    </div>
</main>
<Footer />

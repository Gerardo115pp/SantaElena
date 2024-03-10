<script>
    import { defineNavbarDarkColorSchema } from "@themes/component_themes";
    import ParallaxDivider from "@components/UI/ParallaxDivider.svelte";
    import { browser } from "$app/environment";
    import { onMount } from "svelte";

    onMount(() => {
        defineNavbarDarkColorSchema();
    });
    
    
</script>

<main id="santa-elena-about-us-page">
    <ParallaxDivider 
        catch_phrase_content="Nosotros"
        height="300"
        overlay_color="color-mix(in oklab, var(--color-light) 42%, var(--color-7))"
        particles_color="var(--color)"
        show_top_border={false}
        overlay_blend_mode="color"
        show_bottom_border
    >
        <h1 class="subpage-title" slot="catch-phrase">
            Nosotros
        </h1>
    </ParallaxDivider>
    <p>
        Trabajo en progreso...
    </p>
</main>

<style>
    #santa-elena-about-us-page {
        display: flex;
        padding: calc(var(--navbar-height)) 0 var(--spacing-4) 0;
        min-height: 100vh;
        flex-direction: column;
        row-gap: var(--spacing-4);
    }
</style>
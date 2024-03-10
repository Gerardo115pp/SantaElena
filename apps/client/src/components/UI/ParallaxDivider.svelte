<script>
    import ImageMultiStage from "@components/Images/ImageMultiStage.svelte";
    import { ImageResource } from "@models/MediaResources";
    import ParticleDecoration from "@components/Animations/ParticleDecoration.svelte";
    import TxyContentEntry from "@libs/TxyClient/models/content_entry";
    import viewport from "@components/viewport_actions/useViewportActions";
    import txy_repository from "@libs/TxyClient/txy_repository";
    import { writable } from "svelte/store";
    import { layout_images } from "@stores/layout";
    import { onDestroy, onMount } from "svelte";
    import { blur } from "svelte/transition";
    import { browser } from "$app/environment";

    
    /*=============================================
    =            Properties            =
    =============================================*/
        /**
         * The image resource to be used as background
         * @type {ImageResource}
         * @group ParallaxEffect
         */
        export let image_resource = layout_images.CHURCH_IMAGE;

        /**
         * The alt text for the parallax background image
         * @type {string}
         */
        export let alt_text = "Idyllic white church with bright yellow lights";

        /**
         * The height of the parallax divider in pixels
         * @type {number}
         * @default 546
        */
        export let height = 546;

        /**
         * Whether to show the top border
         * @type {boolean}
         * @default true
        */
        export let show_top_border = true;

        /**
         * Whether to show the bottom border
         * @type {boolean}
         * @default false
        */
        export let show_bottom_border = false;

        /**
         * Overlay color
         * @type {string}
         * @default "color-mix(in oklab, var(--color) 50%, var(--color-light))"
        */
        export let overlay_color = "color-mix(in oklab, var(--color) 50%, var(--color-light))";

        /**
         * The blend mode for the color overlay. Probably shouldn't be changed
         * @type {string}
         * @default "soft-light"
         */
        export let overlay_blend_mode = "soft-light";

        /**
         * The opacity of the color overlay
         * @type {number}
         * @default 1
         */
        export let overlay_opacity = 1;

        /**
         * The color of the particles
         * @type {string}
         * @default "var(--color-light)"
         */
        export let particles_color = "var(--color-light)";

        /**
         * The position of the parallax image
         * @type {number}
         * @default 0
         * @group ParallaxEffect
         */
        let parallax_position = 0;

        /**
         * The maximum position of the parallax image
         * @type {number}
         * @default 20
         * @group ParallaxEffect
         */
        const parallax_position_max = 100;

        /**
         * Whether or not the parallax images is on the viewport
         * we don't modify the 
         * @type {Writable<boolean>}
         * @default false
         */
        let is_on_viewport = writable(false);

        /**
         * The parallax divider element
         * @type {HTMLDivElement}
         */
        let parallax_divider_element;

        /**
         * The content to display in the parallax divider
         * @type {string}
         */
        export let catch_phrase_content = "Today, Tomorrow,<br/>And Beyond";

        
    /*=====  End of Properties  ======*/

    onMount(() => {
        if(browser) {
            document.addEventListener("scroll", updateParallaxPosition);
        }
    });

    onDestroy(() => {
        if(browser) {
            document.removeEventListener("scroll", updateParallaxPosition);
        }
    });
    
    /*=============================================
    =            Methods            =
    =============================================*/

        const handleOnViewport = () => {
            is_on_viewport.set(!$is_on_viewport);

            if ($is_on_viewport) {
                parallax_position = 0;
                monitorScroll();
            } else {
                stopMonitoringScroll();
            }
            
        }

        const monitorScroll = () => {
            document.addEventListener("scroll", updateParallaxPosition, {passive: true});
        }
    
        const stopMonitoringScroll = () => {
            document.removeEventListener("scroll", updateParallaxPosition, {passive: true});
        }

        /**
         * Updates the parallax position if the image is on the viewport. It calculates the distance between the top of the box of section.parallax-divider and the top of the viewport
         * gets the percentage that distance represents of the height of the viewport and sets the parallax position to that percentage but of the maximum parallax position
         * @returns {void}
         */
        const updateParallaxPosition = () => {
            if (!is_on_viewport || parallax_position >= parallax_position_max) return;
            const parallax_divider_element_box = parallax_divider_element.getBoundingClientRect();
            const viewport_height = window.innerHeight;

            const distance_from_top = parallax_divider_element_box.top;

            const percentage = distance_from_top / viewport_height;

            parallax_position = Math.max(0, Math.min(parallax_position_max, percentage * parallax_position_max));

        }

    
    /*=====  End of Methods  ======*/
    
    
    
</script>

<section 
    bind:this={parallax_divider_element}
    class="parallax-divider"
    on:viewportEnter={handleOnViewport}
    on:viewportLeave={handleOnViewport}
    style:height={height + "px"}
    style:border-top={show_top_border ? "2px solid var(--color-4)" : "none"}
    style:border-bottom={show_bottom_border ? "2px solid var(--color-4)" : "none"}
    style:--background-color={overlay_color}
use:viewport>
    <div class="bg-wrapper parallax-image" style:top="-{parallax_position}%">
        <ImageMultiStage image_percentage={1.3} {alt_text} {image_resource} />
    </div>
    <div class="bg-wrapper color-overlay" 
        style:mix-blend-mode={overlay_blend_mode}
        style:opacity={overlay_opacity}
    ></div>
    {#if $is_on_viewport}
        <div class="center-section-wrapper" in:blur={{delay: 100, duration:1400}}>
            <ParticleDecoration 
                particles_color={particles_color}
                mouse_tracking_factor={7}
                particles_min_opacity={0.2}
                particles_max_opacity={0.7}
                particles_min_size={20}
                particles_max_size={25}
                particles_min_population={5}
                particles_max_population={9}
                particles_repulsion={5}
            />
            <slot name="catch-phrase">
                <h2 class="default-catch-phrase">
                    <!-- Today, Tomorrow,<br/>And Beyond -->
                    {@html catch_phrase_content}
                </h2>
            </slot>
        </div>
    {/if}
</section>

<style>
    .parallax-divider {
        position: relative;
        container-type: size;
        container-name: parallax-divider;
        overflow-y: hidden;
        width: 100%;
        height: 546px;
    }
    
    .parallax-divider .bg-wrapper.parallax-image {
        position: absolute;
        min-width: 100%;
        height: 200%;
        z-index: var(--z-index-b-2);
        transition: top 0.005s cubic-bezier(0.075, 0.82, 0.165, 1);
    }
    
    .parallax-divider .bg-wrapper.color-overlay {

        position: absolute;
        background: var(--background-color);
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        /* mix-blend-mode: soft-light; */
        /* opacity: 0.9; */
        z-index: var(--z-index-b-1);
        backdrop-filter: blur(10px);
    }

    .parallax-divider .center-section-wrapper {
        position: absolute;
        display: flex;
        width: 100%;
        height: 100%;
        justify-content: center;
        align-items: center;
    }

    .parallax-divider .center-section-wrapper h2.default-catch-phrase {
        font-family: var(--font-titles);
        font-weight: 300;
        font-size: var(--font-size-h1);
        color: var(--shade-9);
        text-align: center;
    }
</style>
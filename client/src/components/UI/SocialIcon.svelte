<script>
    import { getSVGResource } from "@libs/Services/media_loaders";
    import { onMount } from "svelte";

    
    /*=============================================
    =            Properties            =
    =============================================*/

        /**
         * The name of the social media svg icon
         * @type {string}
         */
        export let icon_name;

        /**
         * The href of the social media
         * @type {string}
         */
        export let href;


        /**
         * The text to use on the aria-label attribute
         * @type {string}
         */
        export let aria_label_text;

        /**
         * The svg content
         * @type {string}
         */
        let svg_content;

        /**
         * The color to use as fill or stroke on the svg
        */
        export let color = "var(--color-light-2)";


        /**
         * Whether or not the svg should be filled
         * @type {boolean}
         */
        export let use_fill = true;

        /**
         * Whether or not the svg should be stroked
         * @type {boolean}
         */
        export let use_stroke = false;
    
    
    /*=====  End of Properties  ======*/
    
    onMount(() => {
        loadSvgContent();
    });

    
    /*=============================================
    =            Methods            =
    =============================================*/
    
        const loadSvgContent = async () => {
            let loaded_svg_content = await getSVGResource(icon_name);

            if (loaded_svg_content === null) {
                console.error(`SocialIcon.svelte: svg_content is null`);
                return
            }
            
            svg_content = loaded_svg_content;
        }
    
    /*=====  End of Methods  ======*/
    
    

</script>

<a 
    aria-label="{aria_label_text}" 
    href="{href}" 
    class="social-media-icon"
    target="_blank"
    rel="noopener noreferrer"
    style:--svg-fill="{use_fill ? color : 'none'}"
    style:--svg-stroke="{use_stroke ? color : 'none'}"
>
    {#if svg_content !== "" || svg_content !== null}
        {@html svg_content}
    {/if}
</a>

<style>
    a.social-media-icon {
        width: 100%;
        height: 100%;
    }

    :global(a.social-media-icon svg) {
        width: 100%;
        height: 100%;
    }

    :global(a.social-media-icon svg path) {
        fill: var(--svg-fill);
        stroke: var(--svg-stroke);
    }
</style>
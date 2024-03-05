<script>
    import ImageLazyLoader from "@components/Images/ImageLazyLoader.svelte";
    import { ImageResource } from "@models/MediaResources";
    import { layout_properties } from "@stores/layout";

    
    /*=============================================
    =            Properties            =
    =============================================*/
        
            /**
             * The image resource to be loaded on the text wrapper if no image slot is provided
             * @type {ImageResource}
            */
            export let image_resource;
        
            /**
             * The alt text for the image resource
             * @type {string}
             * @default "from santa elena"
             */
            export let alt_text = "from santa elena";
        
            
            
            /*----------  Styling  ----------*/

                let default_vertical_padding = "var(--spacing-5)";
                let default_horizontal_padding = $layout_properties.IS_MOBILE ? "var(--spacing-4)" : "var(--spacing-5)";
            
                /**
                 * The color of the background for this section
                 * @type {string}
                 * @default "var(--clear-3)"
                 */
                export let background_color = "var(--clear-3)";

                /**
                 * The padding top for this section
                 * @type {string}
                 * @default "var(--spacing-5)"
                 */
                export let padding_top = default_vertical_padding;

                /**
                 * The padding bottom for this section
                 * @type {string}
                 * @default "var(--spacing-5)"
                 */
                export let padding_bottom = default_vertical_padding;

                /**
                 * The padding left for this section
                 * @type {string}
                 * @default "var(--spacing-6)"
                 */ 
                export let padding_left = default_horizontal_padding;


                /**
                 * The padding right for this section
                 * @type {string}
                 * @default "var(--spacing-6)"
                 */
                export let padding_right = default_horizontal_padding;
            
                /**
                 * If true the image and the text will be reversed
                 * @type {boolean}
                 * @default false
                 */
                export let reverse = false;
                
    
    /*=====  End of Properties  ======*/
    
    
</script>

<div class="container-inline-wrapper">
    <article class="two-column-image-text-wrapper"
        style:background-color={background_color}
        style:--padding-top={padding_top}
        style:--padding-bottom={padding_bottom}
        style:--padding-left={padding_left}
        style:--padding-right={padding_right}
    >
        <div class="tcit-columns-wrapper" style:flex-direction={!reverse ? 'row' : 'row-reverse'}>
            <div class="tcit-image-wrapper">
                {#if $$slots.image_resource}
                    <slot name="image_resource" />
                {:else if image_resource !== undefined}
                    <ImageLazyLoader className="tcit-lazy-loader" image_url={image_resource.getUrl(0.4)}>
                        <img class="santa-elena-image" slot="lazy-wrapper-image" let:image_src src="{image_src}" alt="{alt_text}">
                    </ImageLazyLoader>
                {:else}
                    <p class="tcit-missing-image">
                       No image resource provided 
                    </p>
                {/if}
            </div>
            <div class="tcit-text-wrapper">
                <slot name="text_content" />
            </div>
        </div>
    </article>
</div>

<style>
    .two-column-image-text-wrapper {
        width: 100%;
        display: grid;
        container-type: inline-size;
        container-name: tcitw-container;
        place-items: center;
        padding: var(--padding-top) var(--padding-right) var(--padding-bottom) var(--padding-left);
    }  

    .tcit-columns-wrapper {
        width: min(100%, 1664px);
        display: flex;
        height: 40cqw;
        container-type: size;
        justify-content: space-between;
        align-items: center;
    }

    .tcit-image-wrapper {
        width: 40%;
        max-width: 656px;
        min-height: 40cqw;
        max-height: 656px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    :global(.tcit-image-wrapper:has(.tcit-lazy-loader:empty)) {
        height: 40cqw;
    }

    .tcit-text-wrapper {
        width: 50%;
        display: grid;
        place-items: center;
    }

    @container tcitw-container (width <= 1200px) {
        .tcit-columns-wrapper {
            height: max-content;
            container-type: inline-size;
        }
    }

    @container tcitw-container (max-width: 768px) {
        .two-column-image-text-wrapper .tcit-columns-wrapper {
            flex-direction: column !important;
            row-gap: var(--spacing-4);
        }

        .two-column-image-text-wrapper .tcit-image-wrapper {
            width: 100%;
        }

        .two-column-image-text-wrapper .tcit-text-wrapper {
            width: 100%;
        }
    }
</style>
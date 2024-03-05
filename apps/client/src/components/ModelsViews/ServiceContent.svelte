<script>
    import TwoColumnImageText from "@components/UI/Layout/TwoColumnImageText.svelte";
    import ImageMultiStage from "@components/Images/ImageMultiStage.svelte";
    import { ServiceData } from "@models/Services";
    import { layout_images } from "@stores/layout";
    import { createEventDispatcher } from "svelte";
    import HtmlRenderer from "@libs/LiberyHTMLpreprocessor/components/HtmlRenderer.svelte";
    import { wordpress_posts_rules } from "@themes/markup_styles/wordpress_posts";

    
    /*=============================================
    =            Properties            =
    =============================================*/
    
        /**
         * The service that's going to be rendered
         * @type {ServiceData}
         */
        export let service_data;

        /**
         * The price formater
         * @type {Intl.NumberFormat}
         */
        let price_formater = new Intl.NumberFormat(window.navigator.language, {
            style: "currency",
            currency: "MXN"
        });

        /**
         * The rules for the preprocessor of the services content that's fetched from the wordpress API
         * @type {NodesPreprocessRule[]}
         */
        const wordpress_posts_rules_extended = [...wordpress_posts_rules, {
                tag_name: "p",
                classes: ["service-description-paragraph"],
                attributes: [],
                event_handlers: []
            }
        ]

        const dispatcher = createEventDispatcher();
    
    /*=====  End of Properties  ======*/

   
    /*=============================================
    =            Methods            =
    =============================================*/

        /**
         * Handles the user's request to go back to the services list
         */
        const handleBack = () => {
            dispatcher("service-unselected");
        }

    /*=====  End of Methods  ======*/
    
    
</script>

<article class="service-content-display">
    <TwoColumnImageText
    >
        <div class="service-description-wrapper scd-content-column libery-scroll" slot="text_content">
            <HtmlRenderer the_rules={wordpress_posts_rules_extended} the_content={service_data.DescriptionText} wrapper_class="service-description"/>
        </div>
        <aside class="article-details scd-content-column" slot="image_resource">
            <div class="scd-image-wrapper">
                {#if service_data.hasImage()}
                    <img class="santa-elena-image" src="{service_data.Image.LargeUrl}" alt="{service_data.title}">
                {:else}
                    <ImageMultiStage image_resource={layout_images.WHITE_ROSES_IMAGE} image_percentage={0.4} alt_text="{service_data.title}"/>
                {/if}
            </div>
            <details open class="scd-service-details">
                <summary class="headline-2">
                    {service_data.title}    
                </summary>
                <p class="service-summary">
                    {service_data.brief_description}
                </p>
            </details>
            <div role="group" class="scd-controls">
                <button on:click={handleBack} class="button-1 button-thin button-secondary">
                    regresar
                </button>
                {#if service_data.Price === undefined}
                    <button class="button-1 button-thin">
                        Contactanos
                    </button>
                {:else}
                    <a href="/service-checkout/{service_data.Id}">
                        <button class="button-1 button-thin button-purchase">
                            Contratar: {price_formater.format(service_data.Price)}
                        </button>
                    </a>
                {/if}
            </div>
        </aside>
    </TwoColumnImageText>
</article>

<style>
    .scd-content-column {
        height: 800px;
    }

    /*=============================================
    =            Service description            =
    =============================================*/

        :global(.service-description-wrapper .service-description) {
            overflow: auto;
            display: flex;
            flex-direction: column;
            row-gap: var(--spacing-2);
        }

        :global(.service-content-display .service-description-wrapper .service-description p) {
            font-size: var(--font-size-p);
            font-weight: lighter;
        }

    /*=====  End of Service description  ======*/


    .article-details {
        container-type: inline-size;
        display: flex;
        flex-direction: column;
        width: 100%;
        row-gap: var(--spacing-4);
        align-items: center;
    }

    .article-details .scd-image-wrapper {
        display: flex;
        width: 100%;
        max-height: 40cqh;
        justify-content: center;
    }

    :global(.article-details .scd-image-wrapper img) {
        width: max-content;
        height: 100%;
        object-fit: cover;
        object-position: center;
    }

    .scd-service-details {
        width: 40cqh;
    }

    .scd-service-details > summary {
        display: block;
        list-style: none;
        font-size: var(--font-size-h4);
        margin-bottom: var(--spacing-1);
    }

    .scd-controls {
        width: 40cqh;
        display: flex;
        column-gap: var(--spacing-2);
    }

    .scd-controls:has(.button-purchase) {
        flex-direction: column;
        row-gap: var(--spacing-2);
    }

</style>
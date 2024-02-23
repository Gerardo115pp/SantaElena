<script>
    import TwoColumnImageText from "@components/UI/Layout/TwoColumnImageText.svelte";
    import ImageMultiStage from "@components/Images/ImageMultiStage.svelte";
    import { ServiceData } from "@models/Services";
    import { layout_images } from "@stores/layout";
    import { createEventDispatcher, onMount } from "svelte";
    import { LiberyHTMLPreprocessor, NodesPreprocessRule } from "@app_modules/LiberyHTMLpreprocessor/html_preprocessor";
    import { link } from "svelte-spa-router";

    
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
         * The description mount element
         * @type {HTMLDivElement}
         */
        let description_mount;

        /**
         * The rules for the preprocessor of the services content that's fetched from the wordpress API
         * @type {NodesPreprocessRule[]}
         */
        const service_content_preprocessor_rules = [
            {
                tag_name: "headline",
                classes: ["headline-2"],
                attributes: [],
                event_handlers: []
            },
            {
                tag_name: "p",
                classes: ["service-description-paragraph"],
                attributes: [],
                event_handlers: []
            },
            {
                tag_name: "ul",
                classes: ["decorated-list-item"],
            }
        ]

        /**
         * The preprocessor for the service content
         * @type {LiberyHTMLPreprocessor}
         */
        const service_content_preprocessor = new LiberyHTMLPreprocessor();

        const dispatcher = createEventDispatcher();
    
    /*=====  End of Properties  ======*/

    onMount(() => {
        updateServiceContentPreprocessorRules(service_content_preprocessor_rules);

        renderServiceDescription(service_data);
    });
    
    /*=============================================
    =            Methods            =
    =============================================*/

        /**
         * Handles the user's request to go back to the services list
         */
        const handleBack = () => {
            dispatcher("service-unselected");
        }

        /**
         * Renders the service description
         * @param {ServiceData} service_data 
         */
        const renderServiceDescription = (service_data) => {
            if (description_mount === undefined) return;

            /**
             * @type {HTMLCollection}
             */
            const service_description = service_data.Description;

            const nodes = Array.from(service_description);
            const processed_nodes = service_content_preprocessor.processNodes(nodes);

            description_mount.replaceChildren(...processed_nodes);
        }

        /**
         * Updates the rules of the service content preprocessor
         * @param {NodesPreprocessRule[]} rules
         */
        const updateServiceContentPreprocessorRules = (rules) => {
            service_content_preprocessor.setRules(rules);
        }

    /*=====  End of Methods  ======*/
    
    
</script>

<article class="service-content-display">
    <TwoColumnImageText
    >
        <div bind:this={description_mount} class="service-description-wrapper scd-content-column libery-scroll" slot="text_content"></div>
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
                    <a href="/service-checkout/{service_data.Id}" use:link>
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

        .service-description-wrapper {
            overflow: auto;
            display: flex;
            flex-direction: column;
            row-gap: var(--spacing-2);
        }

        :global(.service-content-display .service-description-wrapper > p) {
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
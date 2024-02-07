<script>
    import TwoColumnImageText from "@components/UI/Layout/TwoColumnImageText.svelte";
    import ImageMultiStage from "@components/Images/ImageMultiStage.svelte";
    import { ServiceData } from "@models/Services";
    import { layout_images } from "@stores/layout";
    import { createEventDispatcher, onMount } from "svelte";

    
    /*=============================================
    =            Properties            =
    =============================================*/
    
        /**
         * The service that's going to be rendered
         * @type {ServiceData}
         */
        export let service_data;

        /**
         * The description mount element
         * @type {HTMLDivElement}
         */
        let description_mount;

        const dispatcher = createEventDispatcher();
    
    /*=====  End of Properties  ======*/

    onMount(() => {
        renderServiceDescription(service_data);
    });
    
    /*=============================================
    =            Methods            =
    =============================================*/
    
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

            description_mount.replaceChildren(...nodes);
        }

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
        padding_bottom="0"
    >
        <div bind:this={description_mount} class="service-description-wrapper scd-content-column" slot="text_content"></div>
        <aside class="article-details scd-content-column" slot="image_resource">
            <div class="scd-image-wrapper">
                {#if service_data.image}
                    <img class="santa-elena-image" src="{service_data.image}" alt="{service_data.title}">
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
                <button class="button-1 button-thin">
                    Contactanos
                </button>
            </div>
        </aside>
    </TwoColumnImageText>
</article>

<style>
    .scd-content-column {
        height: 40rlh;
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

</style>
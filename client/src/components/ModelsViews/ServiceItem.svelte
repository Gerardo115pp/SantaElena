<script>
    import ImageMultiStage from "@components/Images/ImageMultiStage.svelte";
    import { ImageResource } from "@models/MediaResources";
    import { layout_images } from "@stores/layout";
    import { ServiceData } from "@models/Services";

    /**
     * The service that this Card element represents
     * @type {ServiceData}
     */
    export let service_data;
</script>

<li class="santa-elena-service-card">
    <div class="image-wrapper">
        {#if service_data.image}
            <img class="santa-elena-image" src="{service_data.image}" alt="{service_data.title}">
        {:else}
            <ImageMultiStage image_resource={layout_images.WHITE_ROSES_IMAGE} image_percentage={0.2} alt_text="{service_data.title}"/>
        {/if}
    </div>
    <div class="service-about-wrapper">
        <h3 class="service-title headline-2">{service_data.title}</h3>
        <p class="service-description">{service_data.brief_description}</p>
    </div>
    <button class="button-1">
        Saber más
    </button>
</li>

<style>
    .santa-elena-service-card {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        background: var(--clear);
        padding: var(--spacing-4);
        container-type: inline-size;
        align-items: center;
        border-radius: var(--border-radius);
        row-gap: var(--spacing-2);
        box-shadow: var(--box-shadow);
    }

    .santa-elena-service-card .image-wrapper {
        display: grid;
        width: 60%;
        place-items: center;
    }

    .santa-elena-service-card .service-about-wrapper {
        display: flex;
        flex-direction: column;
        row-gap: var(--spacing-1);
    }

    .santa-elena-service-card .service-title {
        font-size: var(--font-size-h5);
    }

    .santa-elena-service-card .service-description {
        font-size: var(--font-size-p-small);
        font-weight: lighter;
    }

    .santa-elena-service-card .button-1 {
        --buttons-padding: calc(var(--buttons-font-size) * .4) calc(var(--buttons-font-size) * 1.6);
        font-size: var(--font-size-1);
    }

    @media only screen and (max-width: 768px)  {
        .santa-elena-service-card .service-title {
            font-size: var(--font-size-h3);
            white-space: nowrap;
        }
    }
</style>
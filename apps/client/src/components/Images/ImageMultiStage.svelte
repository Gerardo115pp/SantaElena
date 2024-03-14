<script>
    import { browser } from "$app/environment";
    import { ImageResource } from "@models/MediaResources";
    import { onMount } from "svelte";

    
    /*=============================================
    =            Properties            =
    =============================================*/
    
        /**
         * @type {ImageResource}
         */
        export let image_resource;

        /**
         * Image percentage to be loaded
         * @type {number}
         * @default 1
         */
        export let image_percentage = 1;

        /**
         * The alt text for the image
         * @type {string}
         */
        export let alt_text = "this is a multi stage";

        /**
         * The image element
         * @type {HTMLImageElement}
         */
        let image_element;

        /**
         * The ratio of the width of the parent element to the width the viewport
         * @type {number}
         */
        let parent_width_ratio = 1;

        /**
         * Whether or not the image has been loaded
         */
        let is_loaded = false;

        /**
         * Blur unloaded image
         * @type {boolean}
         */
        export let blur_unloaded = true;
    
    
    /*=====  End of Properties  ======*/
    
    onMount(() => {
        if (!browser) return;

        if (image_resource === undefined) {
            console.error("ImageMultiStage.svelte: image_resource is undefined");
            return;
        }

        parent_width_ratio = getParentElementViewportRatio();

        const image_holder = document.createElement("img");

        image_holder.onload = () => handleHDImageLoad(image_holder);
        image_holder.src = image_resource.getUrl(image_percentage);
    });
    
    /*=============================================
    =            Methods            =
    =============================================*/
    
        const getParentWidth = () => {
            if (image_element === undefined) return 0;

            return image_element.parentElement.clientWidth;
        }

        const getParentElementViewportRatio = () => {
            const parent_width = getParentWidth();

            if (parent_width === 0) return 0;

            return parent_width / window.innerWidth;
        }

        /**
         * @param {HTMLImageElement} image_holder
         */
        const handleHDImageLoad = image_holder => {
            is_loaded = true;
            image_element.src = image_holder.src;
        }
    
    /*=====  End of Methods  ======*/

</script>

{#if image_resource !== undefined}
    <img bind:this={image_element} src="{image_resource.getUrl(0.2)}" alt="{alt_text}" class="multi-stage-image" class:blur-unloaded={blur_unloaded} class:multi-image-loaded={is_loaded}>
{/if}

<style>
    .multi-stage-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
        transition: filter 1.5s ease-in-out;
    }

    .multi-stage-image.blur-unloaded {
        filter: blur(2px);
    }

    .multi-image-loaded.blur-unloaded {
        filter: blur(0);
    }
</style>
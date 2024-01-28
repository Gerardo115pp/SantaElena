<script>
    import ImageMultiStage from "@components/Images/ImageMultiStage.svelte";
    import MainLogo from "@components/UI/MainLogo.svelte";
    import { layout_images, layout_properties } from "@stores/layout";
</script>

<section id="lse-hp-hero-section">
    <div class="bg-wrapper">
        <ImageMultiStage
            image_resource={layout_images.HERO_BACKGROUND}
            alt_text="santa elena hero"
        />
    </div>
    <div id="lse-hp-hs-overlay" class="section-content-layout">
        <div id="lse-hp-hs-center-content">
            <div class="" id="lse-hp-hs-cc-logo-wrapper">
                <MainLogo />
            </div>
            <div id="lse-hp--hs-cc-hero-headline">
                <p>Lorem ipsum dolor sit amet consectetur. Pharetra in odio sed quisque semper nibh. Volutpat id vehicula tincidunt facilisi neque amet. Ullamcorper fermentum arcu quisque nunc nunc lacus nec blandit.</p>
            </div>
            <div id="lse-hp-hs-cc-hero-cta-controls">
                <button class="button-1">
                    Contactanos
                </button>
            </div>
        </div>
    </div>
</section>

<style>
    #lse-hp-hero-section {
        position: relative;
        container-type: size;
        container-name: hero-section;
        width: 100dvw;
        height: 100vh;
    }

    #lse-hp-hero-section .bg-wrapper {
        position: absolute;
        width: 100cqw;
        height: 100cqh;
    }

    :global(#lse-hp-hero-section .bg-wrapper img.multi-image-loaded) {
        filter: contrast(1.4) saturate(1.8) sepia(0.1) brightness(0.7) hue-rotate(1deg);    
        /* mix-blend-mode: soft-light; */
    }

    #lse-hp-hs-overlay {
        
        width: 100cqw;
        height: 100cqh;
        border-bottom: 6px solid var(--color-light-7, #BB931C);
        background: linear-gradient(90deg, rgba(133, 133, 133, 0.59) 17.1%, rgba(245, 235, 224, 0.41) 50%);
    }

    #lse-hp-hs-center-content {
        grid-column: 4 / span 5;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        row-gap: var(--spacing-3);
    }

    #lse-hp--hs-cc-hero-headline {
        font-size: var(--font-size-2);
        font-weight: 300;
        color: var(--clear-3);
        text-align: center;
    }

    #lse-hp-hs-cc-logo-wrapper {
        width: 100%;
    }

    @media only screen and (max-width: 768px)  {
        #lse-hp-hs-center-content {
            grid-column: 1 / -1;
            height: 100%;
            padding: var(--spacing-3);
        }
    }

</style>
<script>
    import ImageMultiStage from "@components/Images/ImageMultiStage.svelte";
    import MainLogo from "@components/UI/MainLogo.svelte";
    import { layout_images, layout_properties, navbar_transparent } from "@stores/layout";
    import viewport from "@components/viewport_actions/useViewportActions";
    import txy_repository from "@app_modules/TxyClient/txy_repository";
    import { get_content_entries_params, GetContentEntriesParams } from "@stores/txy";
    import TxyContentEntry from "@app_modules/TxyClient/models/content_entry";
    import { onMount } from "svelte";

    
    /*=============================================
    =            Properties            =
    =============================================*/
    
        
        /*----------  Txy  ----------*/
        
            /**
             * The content entry of the hero section
             * @type {TxyContentEntry}
             */
            let content_entry = txy_repository.getContentEntrySync(get_content_entries_params.HOME_HERO_SUBHEADLINE);
    
    /*=====  End of Properties  ======*/
    
    onMount(() => {
        updateContentEntry();
    });
    
    
    /*=============================================
    =            Methods            =
    =============================================*/
    
        const handleViewportEnter = e => {
            navbar_transparent.set(true);
        }

        const updateContentEntry = async () => {
            let new_content_entry = await content_entry.GetFreshCopy();

            if (new_content_entry !== null) {
                content_entry = new_content_entry;
            }
        }
    
    /*=====  End of Methods  ======*/
    
    
</script>

<section id="lse-hp-hero-section">
    <div class="bg-wrapper">
        <ImageMultiStage
            image_percentage={$layout_properties.IS_MOBILE ? 4.5 : 1}
            image_resource={layout_images.HERO_BACKGROUND}
            alt_text="santa elena hero"
        />
    </div>
    <div id="lse-hp-hs-overlay" class="section-content-layout">
        <div id="lse-hp-hs-center-content">
            <div class="" id="lse-hp-hs-cc-logo-wrapper">
                <MainLogo
                    headline_color="var(--dark)"
                    subheadline_color="var(--color-light-8)"
                    swallow_color="var(--warning)"
                />
            </div>
            <div id="lse-hp--hs-cc-hero-headline">
                <p>
                    {content_entry.Text}
                </p>
            </div>
            <div id="lse-hp-hs-cc-hero-cta-controls">
                <button class="button-1" on:viewportEnter={handleViewportEnter} use:viewport>
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
        width: 100svw;
        overflow: hidden;
        height: 104vh;
    }

    #lse-hp-hero-section .bg-wrapper {
        position: absolute;
        width: 100cqw;
        height: 100cqh;
    }

    /* :global(#lse-hp-hero-section .bg-wrapper img.multi-image-loaded) {
        filter: contrast(1.4) saturate(1.8) sepia(0.1) brightness(0.7) hue-rotate(1deg);
        filter: brightness(0.7);    
        mix-blend-mode: soft-light;
    } */

    #lse-hp-hs-overlay {
        
        width: 100cqw;
        height: 100cqh;
        border-bottom: 6px solid var(--color-light-7, #BB931C);
        background: linear-gradient(90deg, hsla(28, 100%, 92%, 0.3) 0%, hsla(28, 100%, 92%, .50) 20%, hsla(28, 100%, 92%, .50) 50%, hsla(28, 100%, 92%, .45) 80%, hsla(28, 100%, 92%, 0.3) 100%);
        /* background: hsl(from var(--color-8) h 30% 100% / 0.2); */
        /* background: hsla(28, 100%, 92%, 0.8); */
        /* background: hsl(from var(--dark-9) h s l / 0.5); */
        /* background: hsla(34, 66%, 15%, 0.404); */
    }

    #lse-hp-hs-center-content {
        grid-column: 5 / span 4;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        row-gap: var(--spacing-3);
    }

    #lse-hp--hs-cc-hero-headline {
        font-size: var(--font-size-2);
        font-weight: 500;
        color: var(--dark);
        text-align: center;
    }

    #lse-hp-hs-cc-logo-wrapper {
        width: min(616px, 100%);
    }

    @media only screen and (max-width: 768px)  {
        #lse-hp-hs-center-content {
            grid-column: 1 / -1;
            height: 100%;
            padding: var(--spacing-3);
        }
    }

</style>
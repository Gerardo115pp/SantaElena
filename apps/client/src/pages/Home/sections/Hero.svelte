<script>
    import ImageMultiStage from "@components/Images/ImageMultiStage.svelte";
    import MainLogo from "@components/UI/MainLogo.svelte";
    import { layout_images, layout_properties, navbar_transparent } from "@stores/layout";
    import viewport from "@components/viewport_actions/useViewportActions";
    import txy_repository from "@libs/TxyClient/txy_repository";
    import { get_content_entries_params } from "@stores/txy";
    import TxyContentEntry from "@libs/TxyClient/models/content_entry";
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
                <figure>
                    <MainLogo
                        headline_color="var(--dark)"
                        subheadline_color="var(--color-light-8)"
                        swallow_color="var(--warning)"
                    />
                    <figcaption>
                        <h1>
                            Santa Elena - Funerarias
                        </h1>
                    </figcaption>
                </figure>
            </div>
            <div id="lse-hp--hs-cc-hero-headline">
                <p>
                    {content_entry.Text}
                </p>
            </div>
            <div id="lse-hp-hs-cc-hero-cta-controls">
                <a href="https://wa.me/5213313045999" target="_blank" rel="noopener noreferrer">
                    <button class="button-1" on:viewportEnter={handleViewportEnter} use:viewport>
                        Contactanos
                    </button>
                </a>
            </div>
        </div>
    </div>
</section>

<style>
    
    /*=============================================
    =            Animations            =
    =============================================*/
    
        @keyframes breathing-float {
            0% {
                transform: translate(-5px,0) scale(1);
            }
            25% {
                transform: translate(5px, 0) scale(1.01);
            }
            50% {
                transform: translate(-5px, 0) scale(1.01);
            }
            75% {
                transform: translate(5px, 0) scale(1.01);
            }
            100% {
                transform: translate(-5px,0) scale(1);
            }
        }

        @keyframes unblur {
            from {
                backdrop-filter: blur(15px);
            }
            to {
                backdrop-filter: blur(0px);
            }
        }

        @keyframes logo-fly-away {
            0% {
                transform: translateY(0);
                opacity: 1;
            }
            20% {
                transform: translateY(-40%);
                opacity: 0;
            }
            100% {
                transform: translateY(-100%);
                opacity: 0;
            }
        }

        @keyframes logarithmic-fly-away {
            0% {
                transform: translateY(0);
            }
            100% {
                transform: translateY(100px);
            }
        }
    
    /*=====  End of Animations  ======*/
    
    #lse-hp-hero-section {
        position: relative;
        container-type: size;
        container-name: hero-section;
        width: 100svw;
        overflow: hidden;
        height: 100vh;
    }

    #lse-hp-hero-section .bg-wrapper {
        position: absolute;
        width: 110cqw;
        height: 110cqh;
        animation-name: breathing-float;
        animation-duration: 20s;
        animation-iteration-count: infinite;
        animation-timing-function: ease-in-out;
        animation-direction: alternate;
        animation-fill-mode: both;
        animation-play-state: running;
        animation-delay: 300ms;
    }

    #lse-hp-hs-overlay {
        width: 100cqw;
        height: 100cqh;
        border-bottom: 6px solid var(--color-light-7, #BB931C);
        background: linear-gradient(90deg, hsla(28, 100%, 92%, 0.3) 0%, hsla(28, 100%, 92%, .50) 20%, hsla(28, 100%, 92%, .50) 50%, hsla(28, 100%, 92%, .45) 80%, hsla(28, 100%, 92%, 0.3) 100%);
        backdrop-filter: blur(15px);
        animation-name: unblur;
        animation-duration: 1s;
        animation-fill-mode: both;
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

    #lse-hp-hs-cc-logo-wrapper figure figcaption {
        height: 0;
        width: 0;
        opacity: 0;
    }


    
    /*=============================================
    =            Media Queries            =
    =============================================*/
    
        @supports (animation-timeline: scroll()) {
            #lse-hp-hs-overlay {
                animation-timeline: scroll(root);
                animation-duration: 3ms;
                animation-timing-function: linear;
                animation-fill-mode: forwards;
                animation-range: 0% 3%;
            }

            :global(#lse-hp-hero-section .bg-wrapper img) {
                animation-timeline: scroll(root);
                animation-name: logarithmic-fly-away;
                animation-duration: 3ms;
                animation-timing-function: linear;
                animation-fill-mode: forwards;
                animation-range: 0% 10%;
            }

            #lse-hp-hs-center-content {
                animation-timeline: scroll(root);
                animation-name: logo-fly-away;
                animation-duration: 3ms;
                animation-timing-function: ease-in;
                animation-fill-mode: forwards;
                animation-range: 0% 50%;
            }
        }

        @media prefers-reduced-motion {
            #lse-hp-hero-section .bg-wrapper {
                animation: none;
            }
        }

        @media only screen and (max-width: 800px) {
            @keyframes breathing-float {
                0% {
                    transform: translate(-2px,0) scale(1);
                }
                25% {
                    transform: translate(2px, 0) scale(1.01);
                }
                50% {
                    transform: translate(-2px, 0) scale(1.01);
                }
                75% {
                    transform: translate(2px, 0) scale(1.01);
                }
                100% {
                    transform: translate(-2px,0) scale(1);
                }
            }

            #lse-hp-hero-section .bg-wrapper {
                width: 150cqw;
                height: 100cqh;
            }
        }
    
        @media only screen and (max-width: 768px)  {
            #lse-hp-hs-center-content {
                grid-column: 1 / -1;
                height: 100%;
                padding: var(--spacing-3);
            }
        }
    /*=====  End of Media Queries  ======*/
    
    


</style>
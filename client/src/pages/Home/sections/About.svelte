<script>
    import SectionHeader from "@components/UI/SectionHeader.svelte";
    import TwoColumnImageText from "@components/UI/Layout/TwoColumnImageText.svelte";
    import { layout_images } from "@stores/layout";

    layout_images.IDYLLICISM_IMAGE
</script>

<section id="lse-hp-about-section">
    <SectionHeader section_name="Sobre Nosotros"/>
    <TwoColumnImageText image_resource={layout_images.WHITE_EAGLE_IMAGE} padding_bottom="var(--spacing-4)">
        <div id="our-vision-wrapper" class="about-text-content" slot="text_content">
            <div class="a-tc-description">
                <h3 class="headline-2">
                    Nuestra Visión
                </h3>
                <div class="paragraphs-wrapper">
                    <p class="ov-paragraph">
                        En Santa Elena, celebramos la vida.
                    </p>
                    <p class="ov-paragraph">
                        Con profundo respeto y cariño, ofrecemos servicios personalizados para honrar y recordar a sus seres queridos. 
                    </p>
                    <p class="ov-paragraph">
                        Desde Guadalajara, Jalisco, nos dedicamos a crear momentos de paz y recuerdo, enfatizando la alegría y el legado de cada vida.
                    </p>
                </div>
            </div>
            <button class="button-2 button-thin">
                Saber más
            </button>
        </div>
    </TwoColumnImageText>
    <TwoColumnImageText image_resource={layout_images.IDYLLICISM_IMAGE} background_color="var(--shade-light-1)" reverse padding_top="var(--spacing-4)">
        <div id="our-process-wrapper" class="about-text-content" slot="text_content">
            <div class="a-tc-description">
                <h3 class="headline-2">
                    Nuestro Proceso
                </h3>
                <div class="paragraphs-wrapper">
                    <p class="ov-paragraph">
                        En Santa Elena, celebramos la vida.
                    </p>
                    <p class="ov-paragraph">
                        Con profundo respeto y cariño, ofrecemos servicios personalizados para honrar y recordar a sus seres queridos. 
                    </p>
                    <p class="ov-paragraph">
                        Desde Guadalajara, Jalisco, nos dedicamos a crear momentos de paz y recuerdo, enfatizando la alegría y el legado de cada vida.
                    </p>
                </div>
            </div>
            <button class="button-2 button-thin">
                Saber más
            </button>
        </div>
    </TwoColumnImageText>
</section>

<style>
    .about-text-content {
        display: flex;
        flex-direction: column;
        row-gap: var(--spacing-3);
    }

    .a-tc-description {
        display: flex;
        flex-direction: column;
        row-gap: var(--spacing-2);
    }

    .paragraphs-wrapper {
        display: flex;
        flex-direction: column;
        row-gap: var(--spacing-1);
    }

    .ov-paragraph {
        font-size: var(--font-size-p);
        font-weight: 300;
        color: var(--grey-7);
    }

    @container (width <= 768px) {
        .about-text-content {
            row-gap: var(--spacing-4);
            align-items: center;
        }

        .a-tc-description {
            row-gap: var(--spacing-3);
        }

        /* .a-tc-description h3 {
            text-align: center;
        } */

        .paragraphs-wrapper {
            row-gap: var(--spacing-2);
        }

        /* .ov-paragraph {
            text-align: center;
        } */
    }


</style>
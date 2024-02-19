<script>
    import { NodesPreprocessRule } from "@app_modules/LiberyHTMLpreprocessor/html_preprocessor";
    import TwoColumnImageText from "@components/UI/Layout/TwoColumnImageText.svelte";
    import TxyMarkup from "@app_modules/TxyClient/components/TxyMarkup.svelte";
    import TxyContentEntry from "@app_modules/TxyClient/models/content_entry";
    import viewport from "@components/viewport_actions/useViewportActions";
    import { layout_images, navbar_transparent } from "@stores/layout";
    import txy_repository from "@app_modules/TxyClient/txy_repository";
    import SectionHeader from "@components/UI/SectionHeader.svelte";
    import { onMount } from "svelte";

    
    /*=============================================
    =            Properties            =
    =============================================*/

        
        /*----------  Txy  ----------*/
        
            

            const content_ids = {
                TITLE_ONE: "stehp-as-card-one-title",
                CONTENT_ONE: "stehp-as-card-one-content",
                TITLE_TWO: "stehp-as-card-two-title",
                CONTENT_TWO: "stehp-as-card-two-content"
            }

            /**
             * The content entry for the title of the first section in the about section
             * @type {TxyContentEntry} 
             */
            let title_one = txy_repository.getContentEntry(content_ids.TITLE_ONE);

            /**
             * The content entry for the content of the first section in the about section
             * @type {TxyContentEntry} 
             */
            let content_one = txy_repository.getContentEntry(content_ids.CONTENT_ONE);


            /**
             * The content entry for the title of the second section in the about section
             * @type {TxyContentEntry} 
             */
            let title_two = txy_repository.getContentEntry(content_ids.TITLE_TWO);

            /**
             * The content entry for the content of the second section in the about section
             * @type {TxyContentEntry} 
             */
            let content_two = txy_repository.getContentEntry(content_ids.CONTENT_TWO);

            /**
             * The preprocess rules to apply to the content
             * @type {NodesPreprocessRule[]}
             */
            const about_card_content_preprocess_rules = [
                {
                    tag_name: "p",
                    classes: ["ov-paragraph"],
                    attributes: [],
                    event_handlers: []
                },
                {
                    tag_name: "ul",
                    classes: ["decorated-list-item"]
                }
            ]
        
    /*=====  End of Properties  ======*/
    
    onMount(() => {
        updateContentEntries();
    });
    
    /*=============================================
    =            Methods            =
    =============================================*/
    
        const handleViewportEnter = e => {
            navbar_transparent.set(false);
        }

        const updateContentEntries = async () => {
            let new_title_one = await title_one.GetFreshCopy();
            let new_content_one = await content_one.GetFreshCopy();
            let new_title_two = await title_two.GetFreshCopy();
            let new_content_two = await content_two.GetFreshCopy();

            console.debug("Content one: ", new_content_one);

            title_one = new_title_one !== null ? new_title_one : title_one;
            content_one = new_content_one !== null ? new_content_one : content_one;
            title_two = new_title_two !== null ? new_title_two : title_two;
            content_two = new_content_two !== null ? new_content_two : content_two;

            console.debug("Content one: ", content_one);
        }
    
    /*=====  End of Methods  ======*/
    
    
</script>

<section id="lse-hp-about-section">
    <SectionHeader section_name="Sobre Nosotros"/>
    <TwoColumnImageText image_resource={layout_images.WHITE_EAGLE_IMAGE} padding_bottom="var(--spacing-4)">
        <div id="our-vision-wrapper" class="about-text-content" slot="text_content">
            <div class="a-tc-description">
                <h3 class="headline-2">
                    {title_one.Text}
                </h3>
                <div class="paragraphs-wrapper libery-scroll">
                    {#key content_one}
                        <TxyMarkup content_entry={content_one} wrapper_class="markdown-paragraphs" rules={about_card_content_preprocess_rules}/>
                    {/key}
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
                <h3 class="headline-2" on:viewportEnter={handleViewportEnter} use:viewport>
                    {title_two.Text}
                </h3>
                <div class="paragraphs-wrapper">
                    {#key content_two}
                        <TxyMarkup content_entry={content_two} wrapper_class="markdown-paragraphs" rules={about_card_content_preprocess_rules}/>
                    {/key}
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
        overflow-y: auto;
        max-height: 70cqh;
    }

    :global(.paragraphs-wrapper .markdown-paragraphs){
        display: flex;
        flex-direction: column;
        row-gap: var(--spacing-1);
    }

    :global(.ov-paragraph) {
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
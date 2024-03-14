<script>
    import HtmlRenderer from "@libs/LiberyHTMLpreprocessor/components/HtmlRenderer.svelte";
    import { WordpressPage } from "@models/Wordpress/pages";
    import { wordpress_posts_rules } from "@themes/markup_styles/wordpress_posts";
    import { defineNavbarDarkColorSchema } from "@themes/component_themes";
    import { onMount } from "svelte";

    
    /*=============================================
    =            Properties            =
    =============================================*/
    
        /** 
         * The privacy policy page data
         * @typedef {Object} PrivacyPolicyPageData
         * @property {WordpressPage} page - The selected post
         */

        /** @type {PrivacyPolicyPageData} */
        export let data

        /** 
         * The wordpress post/page id
         * @type {number}
         */
        let the_post_id = 3;

        /** 
         * The post to display
         * @type {WordpressPage}
         */
        let the_page = data.page;
    
    /*=====  End of Properties  ======*/

    onMount(() => {
        defineNavbarDarkColorSchema();
    })
    
    
</script>

<svelte:head>
    <link rel="stylesheet" href="https://dev-santa-elena.mx/wordpress/wp-includes/css/dist/block-library/style.min.css?ver=6.4.3" />    
</svelte:head>
<main id="privacy-policy-page">
    <div class="ppp-content-wrapper">
        <header>
            <h1>
                Privacy Policy
            </h1>
        </header>
        <article id="privacy-policy-wrapper">
            {#if the_page != null}
                <HtmlRenderer the_rules={wordpress_posts_rules} the_content={the_page.Content} optimize_seo={false} wrapper_class="wp-post-content"/>
            {/if}
        </article>
    </div>
</main>

<style>
    #privacy-policy-page {
        display: grid;
        place-items: center;
        padding: calc(var(--navbar-height) + var(--spacing-4)) var(--spacing-4) var(--spacing-4) var(--spacing-4);
    }

    #privacy-policy-page .ppp-content-wrapper {
        max-width: 1300px;
    }

    #privacy-policy-page header {
        margin-bottom: var(--spacing-4);
    }

    #privacy-policy-page header h1 {
        font-size: var(--font-size-h1);
        color: var(--dark-9);
    }

    #privacy-policy-page article {
        display: flex;
        flex-direction: column;
        row-gap: var(--spacing-4);
    }

    :global(.wp-post-content) {
        display: flex;
        flex-direction: column;
        row-gap: var(--spacing-3);
    }

    /*=============================================
    =            Nested Spacing            =
    =============================================*/
    
    :global(.wp-post-content .wp-block-group:not(.is-layout-flex)) {
            display: flex;
            flex-direction: column;
            row-gap: var(--spacing-3);
        }

        :global(.wp-post-content .wp-block-group .wp-block-group:not(.is-layout-flex)) {
            row-gap: var(--spacing-2);
        }

        :global(.wp-post-content .wp-block-group .wp-block-group .wp-block-group:not(.is-layout-flex)) {
            row-gap: var(--spacing-1);
        }
    
    /*=====  End of Nested Spacing  ======*/
</style>
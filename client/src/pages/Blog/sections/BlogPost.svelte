<script>
    import { WordpressPost } from "@models/Wordpress/posts";
    import HtmlRenderer from "@app_modules/LiberyHTMLpreprocessor/components/HtmlRenderer.svelte";
    import { wordpress_posts_rules } from "@themes/markup_styles/wordpress_posts";

    
    /*=============================================
    =            Properties            =
    =============================================*/
    
        /** 
         * The post to display
         * @type {WordpressPost}
         */
        export let the_post;
        console.debug("the_post", the_post);
    
    /*=====  End of Properties  ======*/
    
    
</script>

<svelte:head>
    <link rel="stylesheet" href="https://dev-santa-elena.mx/wordpress/wp-includes/css/dist/block-library/style.min.css?ver=6.4.3" />    
</svelte:head>
<article class="santa-elena-post">
    <div class="sep-the-content">
        <h1>{the_post.Title}</h1>
        <HtmlRenderer the_rules={wordpress_posts_rules} the_content={the_post.Content} wrapper_class="wp-post-content"/>
    </div>
</article>

<style>
    .santa-elena-post {
        display: grid;
        container-type: inline-size;
        place-items: center;
    }

    .santa-elena-post .sep-the-content h1 {
        font-size: var(--font-size-h3);
        color: var(--dark-8);
        white-space: nowrap;
    }
    
    .sep-the-content {
        width: 50cqw;
        display: flex;
        flex-direction: column;
        row-gap: var(--spacing-4);
    }

    :global(.wp-post-content) {
        display: flex;
        flex-direction: column;
        row-gap: var(--spacing-3);
    }

    :global(.wp-post-content p) {
        word-break: normal;
        hyphens: auto;
        hyphenate-character: "-";
        /* text-align: justify; */
        /* overflow-wrap: break-word; */
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
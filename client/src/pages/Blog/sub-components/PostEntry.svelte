<script>
    import { WordpressPost } from "@models/Wordpress/posts";

    
    /*=============================================
    =            Properties            =
    =============================================*/
    
        /** 
         * The post to display
         * @type {WordpressPost}
         */
        export let the_post;
    
    /*=====  End of Properties  ======*/
    
    
</script>

<article class="santa-elena-post-entry">
    <h2>{the_post.Title}</h2>
    <div class="excerpt-wrapper">
        {@html the_post.Excerpt}
    </div>
    <p class="post-date">
        <small>
            {the_post.Date}
        </small>
    </p>
</article>

<style>
    .santa-elena-post-entry {
        box-sizing: border-box;
        display: flex;
        min-height: 300px;
        width: 100%;
        background: var(--dark-5);
        flex-direction: column;
        row-gap: var(--spacing-2);
        padding: var(--spacing-3);
    }

    .santa-elena-post-entry h2 {
        font-size: var(--font-size-h4);
        color: var(--color-light-5);
    }

    .excerpt-wrapper {
        display: flex;
        flex-direction: column;
        row-gap: var(--spacing-2);
        color: var(--clear-3);
        font-weight: 300;
    }

    .post-date {
        font-size: var(--font-size-fineprint);
        color: var(--color-light-2);
    }
</style>
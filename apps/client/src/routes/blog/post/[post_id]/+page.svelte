<script>
    import { defineNavbarDarkColorSchema } from "@themes/component_themes";
    import BlogPost from "@pages/Blog/sections/BlogPost.svelte";
    import { WordpressPost } from "@models/Wordpress/posts";
    import { browser } from "$app/environment";
    import { onMount } from "svelte";



    
    /*=============================================
    =            Setup            =
    =============================================*/
    
        /**
         * @typedef {Object} BlogPostPageData
         * @property {WordpressPost} post - The selected post
         */
        
        /** @type {BlogPostPageData} */
        export let data;

        if (browser) {
            window.scrollTo(0, 0);
        }
    
    /*=====  End of Setup  ======*/

    onMount(() => {
        defineNavbarDarkColorSchema();
    });
    
    /*=============================================
    =            Properties            =
    =============================================*/
    
        /** 
         * The selected blog post
         * @type {WordpressPost}
         */
        export let selected_post = null;


        if (selected_post === null) {
            selected_post = data.post;
        }
    
    /*=====  End of Properties  ======*/
    
    
</script>

<menu id="blog-controls">
    <ol class="breadcrumb">
        <li class="crumb">
            <a href="/blog">Blog</a>
        </li>
        <li class="crumb-separator" aria-hidden>/</li>
        <li class="crumb">{selected_post.Title}</li>
    </ol>
</menu>
<BlogPost the_post={selected_post}/>
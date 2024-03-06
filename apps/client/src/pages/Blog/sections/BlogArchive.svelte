<script>
    import { WordpressPost } from "@models/Wordpress/posts";
    import { getAllPosts } from "@models/Wordpress/posts";
    import { createEventDispatcher, onMount } from "svelte";
    import PostEntry from "../sub-components/PostEntry.svelte";

    
    /*=============================================
    =            Properties            =
    =============================================*/
    
            
        /** 
         * The posts to display
         * @type {WordpressPost[]}
         */
        export let posts = [];

        const dispatch = createEventDispatcher();
    
    /*=====  End of Properties  ======*/

    onMount(async () => {
        if (posts.length === 0) {
            posts = await getAllPosts();
        }

        // handlePostSelection(posts[0]); // STYLING: Use this to style the post component
    });

    
    /*=============================================
    =            Methods            =
    =============================================*/
    
    /*=====  End of Methods  ======*/
    
    

</script>

<section id="posts-archive">
    {#each posts as post}
        <a href="/blog/post/{post.Id}">
            <PostEntry the_post={post}/>
        </a>
    {/each}
</section>

<style>
    #posts-archive {
        display: flex;
        flex-direction: column;
        row-gap: var(--spacing-3);
    }
</style>
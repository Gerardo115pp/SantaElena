<script>
    import { WordpressPost } from "@models/Wordpress/posts";
    import { getAllPosts } from "@models/Wordpress/posts";
    import { onMount } from "svelte";
    import PostEntry from "../sub-components/PostEntry.svelte";

    
    /*=============================================
    =            Properties            =
    =============================================*/
    
            
        /** 
         * The posts to display
         * @type {WordpressPost[]}
         */
        let posts = [];
    
    /*=====  End of Properties  ======*/

    onMount(async () => {
        posts = await getAllPosts();
    });
    
</script>

<section id="posts-archive">
    {#each posts as post}
        <PostEntry the_post={post}/>
    {/each}
</section>

<style>
    #posts-archive {
        display: flex;
        flex-direction: column;
        row-gap: var(--spacing-3);
    }
</style>
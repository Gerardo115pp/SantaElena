<script>
	import { WordpressPost } from "@models/Wordpress/posts";
    import BlogHeader from "./sections/BlogHeader.svelte";
    import BlogArchive from "./sections/BlogArchive.svelte";
	import BlogPost from "./sections/BlogPost.svelte";
    import { navbar_solid } from "@stores/layout";
    import Footer from "@components/Footer/Footer.svelte";


    
    
    /*=============================================
    =            Setup            =
    =============================================*/
    
        navbar_solid.set(true);

        
    
    /*=====  End of Setup  ======*/

	
	/*=============================================
	=            Properties            =
	=============================================*/
	
		/** 
		 * The selected blog post
		 * @type {WordpressPost}
		 */
		let selected_post = null;
	
	/*=====  End of Properties  ======*/
	
	
	
	/*=============================================
	=            Methods            =
	=============================================*/
	
		/** 
		 * Handles the post selection
		 * @param {MouseEvent} e - The click event
		 */
		const handlePostSelection = e => {
			selected_post = e.detail?.post;
		}
	
	/*=====  End of Methods  ======*/
	
	
	
</script>
    
<main id="santa-elena-blog-page">
	{#if selected_post != null}
		<menu id="blog-controls">
			<ol class="breadcrumb">
				<li class="crumb">
					<a href="/#" on:click|preventDefault={handlePostSelection}>Blog</a>
				</li>
				<li class="crumb-separator" aria-hidden>/</li>
				<li class="crumb">{selected_post.Title}</li>
			</ol>
		</menu>
		<BlogPost the_post={selected_post}/>
	{:else}
		<BlogHeader />
		<BlogArchive on:post-selected={handlePostSelection} />
	{/if}
</main>
<Footer />

<style>
    #santa-elena-blog-page {
        display: flex;
        padding: calc(var(--navbar-height) + var(--spacing-5)) var(--spacing-4) var(--spacing-4) var(--spacing-4);
        flex-direction: column;
        row-gap: var(--spacing-4);
    }
</style>
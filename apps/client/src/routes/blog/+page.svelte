<script>
	import { WordpressPost } from "@models/Wordpress/posts";
    import BlogHeader from "@pages/Blog/sections/BlogHeader.svelte";
    import BlogArchive from "@pages/Blog/sections/BlogArchive.svelte";
	import BlogPost from "@pages/Blog/sections/BlogPost.svelte";
	import { defineNavbarDarkColorSchema } from "@themes/component_themes";
    import Footer from "@components/Footer/Footer.svelte";
    import { onMount } from "svelte";
    import { browser } from "$app/environment";


    
    
    /*=============================================
    =            Setup            =
    =============================================*/
		/**
		 * @typedef {Object} BlogPageData
		 * @property {WordpressPost[]} posts - All of the posts prefetched from the server
		 */

		/** @type {BlogPageData} */
		export let data;

		if (browser) {
			window.scrollTo(0, 0);
		}
    
    /*=====  End of Setup  ======*/

	
	/*=============================================
	=            Properties            =
	=============================================*/

		/**
		 * All of the posts prefetched from the server
		 * @type {WordpressPost[]}
		 */
		export let posts = data.posts;

		console.log("Posts: ", posts);
	
		/** 
		 * The selected blog post
		 * @type {WordpressPost}
		 */
		let selected_post = null;
	
	/*=====  End of Properties  ======*/
	
	onMount(() => {
		console.log("Selected post: ", selected_post)
		defineNavbarDarkColorSchema();
	})
	
	/*=============================================
	=            Methods            =
	=============================================*/
	

	/*=====  End of Methods  ======*/
	
</script>
    
<BlogHeader />
<BlogArchive {posts} />



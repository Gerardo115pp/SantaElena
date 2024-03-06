import { getAllPosts } from "@models/Wordpress/posts";

export const load = async ({ params }) => {
    let posts = await getAllPosts();

    return {
        posts: posts
    }
}
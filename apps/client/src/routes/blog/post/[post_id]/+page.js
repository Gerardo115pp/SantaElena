import { getPostById } from "@models/Wordpress/posts";
import { error } from "@sveltejs/kit";

export const load = async ({ params }) => {
    let post_id = params.post_id;
    let post = await getPostById(post_id);

    if (post === null) {
        return error(404, "Post not found");
    }

    return {
        post: post
    }
}
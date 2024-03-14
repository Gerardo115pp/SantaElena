import { WordpressPage, getPageById } from "@models/Wordpress/pages";
import { error } from "@sveltejs/kit";

export async function load({ params }) {
    let privacy_page_id = 3;

    let page = await getPageById(privacy_page_id);

    if (page === null) {
        return error(404, "Page not found");
    }

    return {
        page: page
    }
}
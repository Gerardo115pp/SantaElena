import { error } from "@sveltejs/kit";

export function load({ params }) {
    let service_id = params.service_id;
    return {
        service_id
    }
}
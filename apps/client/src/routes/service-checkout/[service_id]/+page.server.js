import { error } from "@sveltejs/kit";
import { getSantaElenaServices } from "@models/Services";
import { ServiceData } from "@models/Services";
import { get } from "svelte/store";
import { selected_service } from "@stores/services";

export async function load({ params }) {
    let service_id = params.service_id;

    let service = get(selected_service);

    if (service === null) {
        /**
         * @type {ServiceData[]}
         */
        const services = await getSantaElenaServices();
        console.log("Services", services);
    
        service = services.find((service) => service.Id === service_id);
    }

    return {
        service_id,
        service
    }
}
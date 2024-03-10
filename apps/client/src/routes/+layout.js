import { getSantaElenaServicesArchive } from "@models/Services";


/** @type {import("@sveltejs/kit").PageLoad} */
export const load = async ({ params }) => {
    let services = await getSantaElenaServicesArchive();

    return {
        se_services_archive: services
    }
}
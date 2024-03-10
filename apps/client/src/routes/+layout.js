import { getSantaElenaServicesArchive } from "@models/Services";

export const load = async ({ params }) => {
    let services = await getSantaElenaServicesArchive();

    return {
        se_services_archive: services
    }
}
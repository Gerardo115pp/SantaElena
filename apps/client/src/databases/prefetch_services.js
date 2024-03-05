import { ServiceData } from "@models/Services";

let boundle_services_data = SERVICES_FALLBACKS;

/**
 * The services data
 * @type {ServiceData[]}
 */
export const services_fallbacks = boundle_services_data.map(service => new ServiceData(service));
import { GetProductsRequest } from "@libs/Services/HttpRequests";
import { parseHtmlText } from "@libs/utils";

export class ServiceData {
    /**
     * The unique identifier of the Service
     * @type {string}
     * @readonly
     */
    #id;

    /**
     * Is the price of the Service, is not set, it will be -1
     * @type {number}
     */
    #price;

    /**
     * The instructions to follow after the purchase of the Service
     * @type {string}
     * @readonly
     */
    #next_steps;

    /**
     * The raw html text of the Service description content
     * @type {string}
     */
    #description;

    constructor({slug, image, name, price, price_range, short_description, content, next_steps}) {
        this.id = slug;
        this.title = name;
        this.brief_description = short_description;
        this.image = image;
        this.#price = price;
        this.price_range = price_range;
        this.#next_steps = next_steps;
        this.#description = content;
    }

    /**
     * Get the price of the Service
     * @returns {number|undefined}
     */
    get Price() {
        return this.#price > 0 ? this.#price : undefined;
    }

    /**
     * The Unique identifier of the Service
     * @returns {string}
     * @readonly
     */
    get Id() {
        return this.#id;
    }

    /**
     * The html content of the Service description
     * @returns {HTMLCollection}
     * @readonly
     */
    get Description() {
        return parseHtmlText(this.#description);
    }

    /**
     * Whether the Service can generate a stripe checkout session
     * @returns {boolean}
     */
    hasCheckoutAvailable() {
        return this.Price !== undefined && this.#next_steps !== "";
    }


}

export const getSantaElenaServices = async () => {
    const request = new GetProductsRequest();

    const response = await request.do();

    if (!response.Ok) {
        console.warn("Error fetching services. no services found or there was an error fetching the services: ", response);
        return [];
    }

    return response.data.map(service => new ServiceData(service));
};
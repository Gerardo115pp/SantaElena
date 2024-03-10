import { GetProductsRequest, GetProductArchiveRequest } from "@libs/Services/HttpRequests";
import { parseHtmlText } from "@libs/utils";
import { WordpressMedia, getWordpressMediaById } from "@models/Wordpress/media";

export class ServiceData {
    /**
     * The unique identifier of the Service
     * @type {number}
     * @readonly
     */
    #id;

    /**
     * Is the price of the Service, is not set, it will be -1
     * @type {number}
     */
    #price;

    /**
     * The id of the image of the Service
     * @type {string}
     * @readonly
     */
    #image;

    /**
     * The data representation of the Service image
     * @type {WordpressMedia}
     * @readonly
     */
    #image_data;

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

    constructor({id, slug, image, name, price, price_range, short_description, content, next_steps}) {
        this.#id = id;
        this.slug = slug;
        this.title = name;
        this.brief_description = short_description;
        this.#image = image;
        this.#image_data = null;
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
     * The Data representation of the Service image
     * @returns {WordpressMedia}
     * @readonly
     */
    get Image() {
        return this.#image_data;
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
     * Returns the html content of the Service description as text
     * @returns {string}
     * @readonly
     */
    get DescriptionText() {
        return this.#description;
    }

    /**
     * The Html content of the Service next steps instructions
     * @returns {HTMLCollection}
     * @readonly
     */
    get NextSteps() {
        return parseHtmlText(this.#next_steps);
    }

    /**
     * Returns the html content of the Service next steps instructions as text
     * @returns {string}
     * @readonly
     */
    get NextStepsText() {
        return this.#next_steps;
    }

    /**
     * Returns true if the Service has an available image associated with it. it verify this by checking if the image id is not an empty string
     * @returns {boolean}
     */
    hasImage() {
        return this.#image !== "";
    } 

    /**
     * Whether the Service can generate a stripe checkout session
     * @returns {boolean}
     */
    hasCheckoutAvailable() {
        return this.Price !== undefined && this.#next_steps !== "";
    }

    /**
     * loads the service image
     * @returns {Promise<WordpressMedia>}
     */
    async loadImage() {
        if (this.#image_data === null) {
            this.#image_data = await getWordpressMediaById(this.#image);
        }

        return this.#image_data;
    }

}

export class ServiceArchiveItem {
    /**
     * @type {number}
     */
    #id

    /**
     * @type {string}
     */
    #name


    constructor({id, name}) {
        this.#id = id;
        this.#name = name;
    }

    get Id() {
        return this.#id;
    }

    get Name() {
        return this.#name;
    }
}

/**
 * Fetches all the services from the wordpress server
 * @async
 * @returns {Promise<ServiceData[]>}
 */
export const getSantaElenaServices = async () => {
    const request = new GetProductsRequest();

    const response = await request.do();

    if (!response.Ok) {
        console.warn("Error fetching services. no services found or there was an error fetching the services: ", response);
        return [];
    }

    let promises = response.data.map(async (service) => {
        let new_service = new ServiceData(service);
        
        if (new_service.hasImage()) {
            await new_service.loadImage();
        }

        return new_service;
    });

    let result = await Promise.allSettled(promises);

    return result.map((promise) => promise.status === "fulfilled" ? promise.value : null).filter((service) => service !== null);
};

/**
 * Fetches all in a compact form including only the id and name of the services
 * @async
 * @returns {Promise<ServiceArchiveItem[]>}
 */
export const getSantaElenaServicesArchive = async () => {
    let products_archive = [];

    const request = new GetProductArchiveRequest();

    const response = await request.do();

    if (response.Ok) {
        products_archive = response.data.map((product) => new ServiceArchiveItem(product));
    }

    return products_archive;
};
import { attributesToJson, HttpResponse } from "./base";
import { SVG_PREFIX, WORDPRESS_REST_API, TXY_SERVICE, PAYMENTS_SERVICE } from "./addresses";


/*=============================================
=            Wordpress            =
=============================================*/


    /*----------  Products  ----------*/
        export class GetProductsRequest {
            constructor () {}

            toJson = attributesToJson.bind(this);

            /**
             * Returns all the post with the type of 'santa-elena-product' from the wordpress server
             * @async
             * @returns {Promise<HttpResponse>}
             */
            do = async () => {
                const response = await fetch(`${WORDPRESS_REST_API}/santa-elena/v1/products`)
                let data = null;

                if (response.status >= 200 && response.status < 300) {
                    data = await response.json();
                }

                return new HttpResponse(response, data);
            }
        }

        export class GetProductArchiveRequest {
            constructor() {}

            toJson = attributesToJson.bind(this);

            /**
             * @typedef {Object} ProductArchiveItem
             * @property {number} id
             * @property {string} name
             */

            /**
             * Returns all the post with the type of 'santa-elena-product' from the wordpress server in a compact format, ideal for displaying in a list
             * It only includes the post id and the title
             * @async
             * @returns {Promise<HttpResponse<ProductArchiveItem[]>>}
             */
            do = async () => {
                const response = await fetch(`${WORDPRESS_REST_API}/santa-elena/v1/products/archive`);

                let data = null;

                if (response.status >= 200 && response.status < 300) {
                    data = await response.json();
                }

                return new HttpResponse(response, data);
            }
        }

    /*----------  Wordpress Assets  ----------*/
        export class GetWordpressMediaByIdRequest {
            constructor(id) {
                this.id = id;
            }

            toJson = attributesToJson.bind(this);

            /**
             * Sends a request to the get a wordpress media by its id
             * @async
             * @returns {Promise<HttpResponse>}
             */
            do = async () => {
                const response = await fetch(`${WORDPRESS_REST_API}/wp/v2/media/${this.id}`);
                let data = null;

                if (response.status >= 200 && response.status < 300) {
                    data = await response.json();
                }

                return new HttpResponse(response, data);
            }
        }

    /*----------  Posts  ----------*/

        export class GetAllPostsRequest {
            constructor() {}

            toJson = attributesToJson.bind(this);

            /**
             * Sends a request to the server to get all the posts
             * @return {Promise<HttpResponse>}
             */
            do = async () => {
                const response = await fetch(`${WORDPRESS_REST_API}/wp/v2/posts`);
                let data = null;

                if (response.status >= 200 && response.status < 300) {
                    data = await response.json();
                }

                return new HttpResponse(response, data);
            }
        }

        export class GetPostByIdRequest {
            constructor(id) {
                this.id = id;
            }

            toJson = attributesToJson.bind(this);

            /**
             * Sends a request to the server to get a post by its id
             * @async
             * @returns {Promise<HttpResponse>}
             */
            do = async () => {
                const response = await fetch(`${WORDPRESS_REST_API}/wp/v2/posts/${this.id}`);
                let data = null;

                if (response.status >= 200 && response.status < 300) {
                    data = await response.json();
                }

                return new HttpResponse(response, data);
            }
        }
/*=====  End of Wordpress  ======*/



/*=============================================
=            Txy            =
=============================================*/

        /**
         * Sends a request to the server to get the locales for a page
         * @deprecated in favor of GetLocalesRequest, which returns all the locales available for the site, which is better because all pages most have the same locales available.
         */
        export class GetPageLocalesRequest {
            constructor(page_id) {
                this.page_id = page_id;
            }

            toJson = attributesToJson.bind(this);

            /**
             * Sends a request to the server to get the locales for a page
             * @async
             * @returns {Promise<HttpResponse>}
             */
            do = async () => {
                const response = await fetch(`${TXY_SERVICE}/locales/pages?page_id=${this.page_id}`);

                let data = null;

                if (response.status >= 200 && response.status < 300) {
                    data = await response.json();
                }

                return new HttpResponse(response, data);
            }
        }

        export class GetLocalesRequest {
            constructor() {}

            toJson = attributesToJson.bind(this);

            /**
             * Sends a request to the server to get the locales for the site
             * @async
             * @returns {Promise<HttpResponse>}
             */
            do = async () => {
                const response = await fetch(`${TXY_SERVICE}/locales/available`);

                let data = null;

                if (response.status >= 200 && response.status < 300) {
                    data = await response.json();
                }

                return new HttpResponse(response, data);
            }
        }

        export class GetExistingPagesRequest {
            constructor() {}

            toJson = attributesToJson.bind(this);

            /**
             * Sends a request to the server to get the existing pages
             * @async
             * @returns {Promise<HttpResponse>}
             */
            do = async () => {
                const response = await fetch(`${TXY_SERVICE}/pages`);

                let data = null;

                if (response.status >= 200 && response.status < 300) {
                    data = await response.json();
                }

                return new HttpResponse(response, data);
            }
        }

        export class GetPageContentRequest {
            constructor(page_id, locale) {
                this.page_id = page_id;
                this.locale = locale;
            }

            toJson = attributesToJson.bind(this);

            /**
             * Sends a request to the server to get the content of a page
             * @async
             * @returns {Promise<HttpResponse>}
             */
            do = async () => {
                const response = await fetch(`${TXY_SERVICE}/pages-content?page_id=${this.page_id}&locale=${this.locale}`);

                let data = null;

                if (response.status >= 200 && response.status < 300) {
                    data = await response.json();
                }

                return new HttpResponse(response, data);
            }
        }

        export class GetFreshContentEntryRequest {
            constructor(entry_id, locale, content_hash) {
                this.entry_id = entry_id;
                this.locale = locale;
                this.content_hash = content_hash;
            }

            toJson = attributesToJson.bind(this);

            /**
             * Sends get request to retrieve a content entry. if a content hash is provided, it will be matched against the server's content hash of the requested entry. 
             * If the hashes match, the server will return a 304 status code, and the data will be null. If the hashes do not match, the server will return a
             * 200 status code and the data will be the content entry.
             * @async
             * @returns {Promise<HttpResponse>}
             */
            do = async () => {
                const response = await fetch(`${TXY_SERVICE}/pages-content/entry?entry_id=${this.entry_id}&locale=${this.locale}&content_hash=${this.content_hash}`);

                let data = null;

                if (response.status === 200) {
                    data = await response.json();
                }

                return new HttpResponse(response, data);
            }
        }

        export class GetAvailableAttributesRequest {
            constructor() {}

            toJson = attributesToJson.bind(this);

            /**
             * Gets a map of all the valid attributes for the content of a page. The key is a human readable name and the value is the attribute name
             * @async
             * @returns {Promise<HttpResponse>}
             */
            do = async () => {
                const response = await fetch(`${TXY_SERVICE}/content-metadata/attributes`);

                let data = null;

                if (response.status >= 200 && response.status < 300) {
                    data = await response.json();
                }

                return new HttpResponse(response, data);
            }
        }

        export class GetAvailableContentTypesRequest {
            constructor() {}

            toJson = attributesToJson.bind(this);

            /**
             * Gets a map of all the valid content types for the content of a page. The key is a human readable name and the value is the content type name
             * @async
             * @returns {Promise<HttpResponse>}
             */
            do = async () => {
                const response = await fetch(`${TXY_SERVICE}/content-metadata/types`);

                let data = null;

                if (response.status >= 200 && response.status < 300) {
                    data = await response.json();
                }

                return new HttpResponse(response, data);
            }
        }

        export class PutContentEntryRequest {
            constructor(content_entry) {
                this.content_entry = content_entry;

                this.toJson = attributesToJson.bind(this.content_entry);
            }

            /**
             * Sends a request to the server to update a content entry
             * @async
             * @returns {Promise<HttpResponse>}
             */
            do = async () => {
                console.log(this.content_entry);

                const response = await fetch(`${TXY_SERVICE}/pages-content/entry`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: this.toJson()
                });

                return new HttpResponse(response, null);
            }
        }

        export class PostNewPageRequest {
            constructor(page_name, page_id) {
                this.page_name = page_name;
                this.page_id = page_id;
            }

            toJson = attributesToJson.bind(this);

            /**
             * Sends a request to the server to create a new page
             * @async
             * @returns {Promise<HttpResponse>}
             */
            do = async () => {
                const response = await fetch(`${TXY_SERVICE}/pages`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: this.toJson()
                });

                return new HttpResponse(response, null);
            }

        }

        export class PostNewSectionRequest {
            constructor(section_name, section_id, page_id) {
                this.section_name = section_name;
                this.section_id = section_id;
                this.page_id = page_id;
            }

            toJson = attributesToJson.bind(this);

            /**
             * @typedef {Object} ContentUpdatedResponse
             * @property {string} content_hash
             */

            /**
             * Sends a request to the server to create a new section
             * @async
             * @returns {Promise<HttpResponse<ContentUpdatedResponse>>}
             */
            do = async () => {
                const response = await fetch(`${TXY_SERVICE}/pages-content/section`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: this.toJson()
                });

                /** @type {ContentUpdatedResponse} */
                let data = null;

                if (response.status === 201) {
                    data = await response.json();
                }

                return new HttpResponse(response, data);
            }

        }

        export class PostNewLocaleRequest {
            constructor(locale) {
                this.locale = locale;
            }

            toJson = attributesToJson.bind(this);

            /**
             * Sends a request to the server to create a new locale
             * @async
             * @returns {Promise<HttpResponse>}
             */
            do = async () => {
                const response = await fetch(`${TXY_SERVICE}/locales`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: this.toJson()
                });

                return new HttpResponse(response, null);
            }
        }

        export class PostNewContentEntryRequest {
            constructor(entry_id, name, content_type, section_id, page_id) {
                this.entry_id = entry_id;
                this.name = name;
                this.content_type = content_type;
                this.section_id = section_id;
                this.page_id = page_id;
            }

            toJson = attributesToJson.bind(this);

            /**
             * @typedef {Object} ContentUpdatedResponse
             * @property {string} content_hash
            */

            /**
             * Sends a request to the server to create a new content entry
             * @async
             * @returns {Promise<HttpResponse<ContentUpdatedResponse>>}
             */
            do = async () => {
                const response = await fetch(`${TXY_SERVICE}/pages-content/entry`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: this.toJson()
                });

                /** @type {ContentUpdatedResponse} */
                let data = null;

                if (response.status === 201) {
                    data = await response.json();
                }

                return new HttpResponse(response, data);
            }
        }
/*=====  End of Txy  ======*/


/*=============================================
=            Stripe payments            =
=============================================*/

        export class GetStripeCheckoutSessionRequest {
            constructor(tracking_id, product_id, customer_name, customer_email, success_url, cancel_url) {
                this.tracking_id = tracking_id;
                this.product_id = product_id;
                this.customer_email = customer_email;
                this.customer_name = customer_name;
                this.success_url = success_url;
                this.cancel_url = cancel_url;
                this.locale = (window.navigator.language).split('-')[0];
            }

            toJson = attributesToJson.bind(this);

            /**
             * Requests a new checkout session from the server
             * @async
             * @returns {Promise<HttpResponse>}
             */
            do = async () => {
                console.debug(this.toJson());

                const response = await fetch(`${PAYMENTS_SERVICE}/checkouts?product_id=${this.product_id}&user_email=${this.customer_email}&user_name=${this.customer_name}&success_url=${this.success_url}&cancel_url=${this.cancel_url}&locale=${this.locale}&tracking_id=${this.tracking_id}`);
                let data = null;

                if (response.status >= 200 && response.status < 300) {
                    data = await response.json();
                }

                return new HttpResponse(response, data);
            }
        }

        export class PatchPurchaseVerificationRequest {
            constructor(tracking_id="", send_email=true) {
                this.tracking_id = tracking_id;
                this.send_email = send_email;
            }

            toJson = attributesToJson.bind(this);

            /**
             * Sends a request to the server to verify a purchase and returns the tracking id as "tracking_id" and "paid" as a boolean that indicates if the purchase is paid
             * @async
             * @returns {Promise<HttpResponse>}
             */
            do = async () => {
                const response = await fetch(`${PAYMENTS_SERVICE}/orphan-orders/verify`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: "same-origin", 
                    body: this.toJson()
                });

                let data = null;

                if (response.status >= 200 && response.status < 300) {
                    data = await response.json();
                }

                return new HttpResponse(response, data);
            }
                
        }

/*=====  End of Stripe payments  ======*/




/*=============================================
=            Resources            =
=============================================*/

    export class GetSVGResourceRequest {
        constructor(filename) {
            this.filename = filename;
        }

        toJson = attributesToJson.bind(this);

        /**
         * Sends a request to the server and returns the response
         * @async
         * @returns {Promise<HttpResponse>}
         */
        do = async () => {
            const response = await fetch(`${SVG_PREFIX}/${this.filename}`);
            let data = null;

            if (response.status <= 200 && response.status < 300) {
                data = await response.text();
            }

            return new HttpResponse(response, data);
        }
    }

/*=====  End of Resources  ======*/


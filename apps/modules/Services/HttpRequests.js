import { attributesToJson, HttpResponse } from "./base";
import { SVG_PREFIX, WORDPRESS_REST_API, TXY_SERVICE } from "./addresses";


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

/*=====  End of Wordpress  ======*/


/*=============================================
=            Txy            =
=============================================*/

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

        export class GetAvailableAttributesRequest {
            constructor() {}

            toJson = attributesToJson.bind(this);

            /**
             * Gets a map of all the valid attributes for the content of a page. The key is a human readable name and the value is the attribute name
             * @async
             * @returns {Promise<HttpResponse>}
             */
            do = async () => {
                const response = await fetch(`${TXY_SERVICE}/content/attributes`);

                let data = null;

                if (response.status >= 200 && response.status < 300) {
                    data = await response.json();
                }

                return new HttpResponse(response, data);
            }
        }
/*=====  End of Txy  ======*/




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


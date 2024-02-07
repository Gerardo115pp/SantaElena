import { attributesToJson, HttpResponse } from "./base";
import { SVG_PREFIX, WORDPRESS_REST_API } from "./addresses";


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


/*=====  End of Wordpress  ======*/



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


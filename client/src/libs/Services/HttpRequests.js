import { attributesToJson, HttpResponse } from "./base";
import { SVG_PREFIX } from "./addresses";
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


import { IMAGES_PREFIX } from './addresses'
import { GetSVGResourceRequest } from './HttpRequests'

export const MEDIA_SIZES = {
    SMALL: {
        postfix: '-S',
        width: 400,
    },
    MEDIUM: {
        postfix: '-M',
        width: 600,
    },
    LARGE: {
        postfix: '-L',
        width: 1300,
    },
    EXTRA_LARGE: {
        postfix: '-XL',
        width: 2300,
    },
    ORIGINAL: {
        postfix: '-original',
        width: Infinity,
    }
}

/**
 * @param {string} media_name
 */
export const getImageResourceUrl = (media_name) => `${IMAGES_PREFIX}/${media_name}`



/*=============================================
=            Resources & Medias            =
=============================================*/

export const getSVGResource = async (filename) => {
    const request = new GetSVGResourceRequest(filename);
    const response = await request.do();
    return response.data;
}

/*=====  End of Resources & Medias  ======*/




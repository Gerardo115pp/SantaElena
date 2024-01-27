import { MEDIA_SIZES, getImageResourceUrl } from "@libs/Services/media_loaders";

export class ImageResource {
    /** 
     * @type {string} the name of the file without extension or size postfix 
     * @example if full name is "image-S.jpg", then name is "image"
     */
    #name;
    /** @type {string} the file extension */
    #extension;
    /** @type {number} the max width available for this image */
    #max_width_available;

    /**
     * 
     * @param {string} name 
     * @param {string} max_width_available 
     */
    constructor(name, max_width_available) {
        this.#parseName(name);
        this.#max_width_available = this.#parseMaxWidthAvailable(max_width_available);
    }

    /**
     * Sets the name and extension of this image resource
     * @param {string} raw_name 
     * @private
     * @returns {void}
     */
    #parseName(raw_name) {
        const last_dot_index = raw_name.lastIndexOf('.');
        const parsed_name = raw_name.substring(0, last_dot_index);
        const parsed_extension = raw_name.substring(last_dot_index + 1);

        this.#name = parsed_name;
        this.#extension = parsed_extension;
    }

    /**
     * sets the max width available for this image resource from a postfix string
     * @param {"-S" | "-M" | "-L" | "-XL" | "-original"} postfix
     * @private
     * @returns {number} the max width available for this image resource
     */
    #parseMaxWidthAvailable(postfix) {
        switch (postfix) {
            case "-S":
                return MEDIA_SIZES.SMALL.width;
            case "-M":
                return MEDIA_SIZES.MEDIUM.width;
            case "-L":
                return MEDIA_SIZES.LARGE.width;
            case "-XL":
                return MEDIA_SIZES.EXTRA_LARGE.width;
            case "-original":
                return MEDIA_SIZES.ORIGINAL.width;
            default:
                throw new Error(`Invalid postfix: ${postfix}`);
        }
    }

    /**
     * Returns the appropriate postfix for the given width percentage
     * @param {number} width_percentage - the percentage of the viewport the images will take
     * @returns {string} the appropriate postfix for the given width percentage
     */
    getPostfix(width_percentage) {
        const viewport_width = window.innerWidth;
        const need_size = viewport_width * width_percentage;
        let appropriate_size = MEDIA_SIZES.ORIGINAL.postfix;

        if (need_size <= MEDIA_SIZES.EXTRA_LARGE.width && MEDIA_SIZES.EXTRA_LARGE.width <= this.#max_width_available) {
            appropriate_size = MEDIA_SIZES.EXTRA_LARGE.postfix;
        }

        if (need_size <= MEDIA_SIZES.LARGE.width && MEDIA_SIZES.LARGE.width <= this.#max_width_available) {
            appropriate_size = MEDIA_SIZES.LARGE.postfix;
        }

        if (need_size <= MEDIA_SIZES.MEDIUM.width && MEDIA_SIZES.MEDIUM.width <= this.#max_width_available) {
            appropriate_size = MEDIA_SIZES.MEDIUM.postfix;
        }

        if (need_size <= MEDIA_SIZES.SMALL.width && MEDIA_SIZES.SMALL.width <= this.#max_width_available) {
            appropriate_size = MEDIA_SIZES.SMALL.postfix;
        }

        return appropriate_size;
    }

    /**
     * Returns the url of the image resource with the appropriate postfix
     * @param {number} width_percentage - the percentage of the viewport the images will take
     * @returns {string} the url of the image resource with the appropriate postfix
     */
    getUrl(width_percentage=1) {
        const postfix = this.getPostfix(width_percentage);
        return getImageResourceUrl(`${this.#name}${postfix}.${this.#extension}`);
    }
}
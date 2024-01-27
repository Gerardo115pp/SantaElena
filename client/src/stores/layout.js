import { writable, Writable } from "svelte/store";
import { ImageResource  } from "@models/MediaResources";
import { MEDIA_SIZES } from "@libs/Services/media_loaders";
import { isMobile } from "@libs/utils";

const root_styles = getComputedStyle(document.documentElement);

export const layout_properties = {
    IS_MOBILE: isMobile(),
    VIEWPORT_WIDTH: document.documentElement.clientWidth,
    VIEWPORT_HEIGHT: document.documentElement.clientHeight,
};

export const defineLayout = () => {
    layout_properties.SPACING = {
        VSPACING_1: root_styles.getPropertyValue("--vspacing-1"),
        VSPACING_2: root_styles.getPropertyValue("--vspacing-2"),
        VSPACING_3: root_styles.getPropertyValue("--vspacing-3"),
        VSPACING_4: root_styles.getPropertyValue("--vspacing-4"),
        VSPACING_5: root_styles.getPropertyValue("--vspacing-5"),
        VSPACING_6: root_styles.getPropertyValue("--vspacing-6"),
        VSPACING_7: root_styles.getPropertyValue("--vspacing-7"),
        VSPACING_8: root_styles.getPropertyValue("--vspacing-8"),
        VSPACING_9: root_styles.getPropertyValue("--vspacing-9")
    }
}


/*=============================================
=            Layout elements            =
=============================================*/

/**
 * @type {Writable<boolean>} whether the navbar is hidden or not, means the navbar css visibility property is set to hidden or visible
 */
export const navbar_hidden = writable(false);

export const layout_images = {
    HERO_BACKGROUND: new ImageResource("fcd5b3b8-9566-496c-868e-31e258ba6833.webp", MEDIA_SIZES.EXTRA_LARGE.postfix),
    WHITE_EAGLE_IMAGE: new ImageResource("about-free-eagle.webp", MEDIA_SIZES.ORIGINAL.postfix),
    IDYLLICISM_IMAGE: new ImageResource("idyllicism.webp", MEDIA_SIZES.LARGE.postfix),
    CHURCH_IMAGE: new ImageResource("249b0b3c-b6ab-45ac-8cfb-4364308ced63.webp", MEDIA_SIZES.LARGE.postfix),
    WHITE_ROSES_IMAGE: new ImageResource("white_roses.webp", MEDIA_SIZES.LARGE.postfix),
}
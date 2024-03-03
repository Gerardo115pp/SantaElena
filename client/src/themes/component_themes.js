import createColorSchema, { ColorSchema, supported_components } from "@libs/ColorSchema";

export const defineNavbarDarkColorSchema = () => {
    let dark_theme = createColorSchema({
        color: "var(--clear-4)",
        contrast: "var(--dark-7)",
        theme: "solid-dark"
    }, supported_components.NAVBAR);

    dark_theme.define();
}



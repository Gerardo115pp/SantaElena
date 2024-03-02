/**
 * The rules to preprocess the wordpress posts. it uses the same rules as the santa elena markup but expands them to apply TailwindCSS classes to the block system of the wordpress editor.
 * @type {import("@app_modules/LiberyHTMLpreprocessor/html_preprocessor").NodesPreprocessRule[]}
 */
export const wordpress_posts_rules =  [
    {
        tag_name: "headline",
        classes: ["headline-2"],
        attributes: [],
        event_handlers: []
    },
    {
        tag_name: "h3",
        classes: ["headline-3"],
        attributes: [],
        event_handlers: []
    },
    {
        tag_name: "p",
        classes: ["markup-paragraph"],
        attributes: [],
        event_handlers: []
    },
    {
        tag_name: "ul",
        classes: ["decorated-list-item"],
    },
    {
        selector: "strong",
        classes: ["font-semibold"]
    },
    {
        selector: "p.has-background strong",
        classes: ["text-theme-color-light-4"]
    },
    {
        selector: "p.has-background",
        classes: ["bg-dark-6", "text-shade-light-2"]
    },
    {
        selector: ".wp-block-group.is-layout-flex",
        classes: ["flex", "flex-row", "gap-4", "md:gap-8", "w-full", "min-w-1/2"]
    },
    {
        selector: ".wp-block-group.is-layout-flex.is-vertical",
        classes: ["flex-col"]
    },
    {
        selector: ".wp-block-group.is-layout-flex > figure",
        classes: ["w-max", "min-w-max"]
    },
    {
        selector: "figure.wp-block-image > img",
        classes: ["min-w-full"]
    },
    {
        selector: "p.wp-container-content-1",
        classes: ["max-w-md", "mx-auto"]
    }
]
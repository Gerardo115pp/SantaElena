export const isHeadline = tag_name => {
    let headline_regex = /^h[1-6]$/i;

    return headline_regex.test(tag_name);
}

/**
 * Parses html text into DOM nodes
 * @param {string} html_text 
 * @returns {HTMLCollection}
 */
export const parseHtmlText = html_text => {
    let parser = new DOMParser();
    let content = null;

    try {
        let doc = parser.parseFromString(html_text, 'text/html');
        content = doc.body.children;
    } catch (error) {
        console.error(error);
    }

    return content;
}
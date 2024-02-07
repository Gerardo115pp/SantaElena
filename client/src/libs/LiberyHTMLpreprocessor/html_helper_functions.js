export const isHeadline = tag_name => {
    let headline_regex = /^h[1-6]$/i;

    return headline_regex.test(tag_name);
}
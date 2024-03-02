export const getTxyUserLocale = () => {
    return window.navigator.language.split("-")[0] || "en";
}
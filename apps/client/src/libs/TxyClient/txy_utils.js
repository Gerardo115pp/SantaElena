import { browser } from "$app/environment";

export const getTxyUserLocale = () => {
    let user_locale = "en";
    if (browser) {
        user_locale = window.navigator.language.split("-")[0] || "en";
    }
    return user_locale;
}
/**
 * @type {Object<string, TxyPage>} - map from page_id to TxyPage
 */
const txy_fallback = TXY_FALLBACK

const TXY_METADATA = {
    default_page_id: "santa-elena-home-page",
    default_locale: "es",
    fallback: txy_fallback
}

Object.freeze(TXY_METADATA);
console.debug('TXY_METADATA:', TXY_METADATA);

export default TXY_METADATA;
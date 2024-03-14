<script>
    import MainLogo from "@components/UI/MainLogo.svelte";
    import SocialIcon from "@components/UI/SocialIcon.svelte";
    import { layout_properties } from "@stores/layout";
    /**
     * @typedef {import("@models/Services").ServiceArchiveItem} ServiceArchiveItem
    */


    
    /*=============================================
    =            Properties            =
    =============================================*/
    
        /** @type {ServiceArchiveItem[]} */
        export let services = [];
    
    /*=====  End of Properties  ======*/
    
    
</script>

<footer id="santa-elena-footer-juvenil">
    <div id="footer-juvenil-left" class="footer-section">
        <div id="footer-logo-wrapper">
            <MainLogo monochrome/>
        </div>
        <ul id="footer-socials" class:adebug={false}>
            <li class="social-media-wrapper">
                <SocialIcon icon_name="Facebook.svg" aria_label_text="Facebook" href="https://www.facebook.com/crematoriosantaelena" />
            </li>
            <li class="social-media-wrapper">
                <SocialIcon icon_name="Instagram.svg" aria_label_text="Instagram" href="https://www.instagram.com/crematoriosantaelena/" />
            </li>
        </ul>
    </div>
    <div id="footer-juvenil-right" class="footer-section">
        <div id="footer-main-pages">
            <div class="footer-main-page">
                <h2 id="page-name">ACERCA</h2>
                <ul class="fmp-subpages"></ul>
            </div>
            <div class="footer-main-page">
                <h2 id="page-name">SERVICIOS</h2>
                <ul role="navigation" class="fmp-subpages">
                    {#each services.slice(0,5) as service_item}
                        <li class="fmp-subpage">
                            <a href="/service-checkout/{service_item.Id}">
                                {service_item.Name}
                            </a>
                        </li>
                    {/each}
                </ul>
            </div>
            <div class="footer-main-page">
                <h2 id="page-name">CONTACTO</h2>
                <ul class="fmp-subpages"></ul>
            </div>
        </div>
        <div id="footer-privacy-pages">
            <h2 class="fpp-privacy-page">
                <!-- svelte-ignore a11y-invalid-attribute -->
                <a href="/privacy">
                    {$layout_properties.VIEWPORT_WIDTH >= 1116 ? "Términos y condiciones" : "Términos&Condiciones" }
                </a>
            </h2>
            <h2 class="fpp-privacy-page">
                <!-- svelte-ignore a11y-invalid-attribute -->
                <a href="/privacy">
                    {$layout_properties.VIEWPORT_WIDTH >= 1116 ? "Aviso de privacidad" : "Privacidad" }
                </a>
            </h2>
        </div>
    </div>
</footer>

<style>
    #santa-elena-footer-juvenil {
        width: 100%;
        display: grid;
        container-type: inline-size;
        grid-template-columns: repeat(2, 1fr);
        background: var(--dark-8);
        color: var(--color-light-2);
    }
    
    .footer-section {
        display: flex;
        height: 712px;
        flex-direction: column;
        padding: var(--spacing-5);
        border-right: 1px solid var(--color-light-2);
    }

    .footer-section:last-of-type {
        border-right: none;
    }

    #footer-juvenil-left {
        align-items: center;
        row-gap: var(--spacing-3);
    }

    #footer-juvenil-left #footer-logo-wrapper {
        height: 80%;
        width: 30cqw;
        max-width: 700px;
        min-width: 200px;
    }

    #footer-juvenil-left ul#footer-socials {
        display: flex;
        column-gap: var(--spacing-2);
        list-style: none;
        padding: 0;
    }

    #footer-juvenil-left ul#footer-socials li.social-media-wrapper {
        width: min(40px, 5vw);
        max-height: min(40px, 5vw);
    }

    #footer-juvenil-right {
        width: 100%;
        justify-content: space-between;
        align-items: center;
    }

    #footer-juvenil-right #footer-main-pages {
        display: flex;
        justify-content: center;
        column-gap: var(--spacing-4);
    }

    #footer-juvenil-right #footer-main-pages .footer-main-page {
        display: flex;
        flex-direction: column;
        row-gap: var(--spacing-2);
    }

    #footer-juvenil-right #footer-main-pages .footer-main-page h2#page-name {
        font-size: var(--font-size-2);
        font-family: var(--font-read);
        font-weight: bold;
    }

    #footer-juvenil-right #footer-main-pages .footer-main-page ul.fmp-subpages {
        display: flex;
        flex-direction: column;
        row-gap: var(--spacing-1);
    }

    #footer-juvenil-right #footer-main-pages .footer-main-page ul.fmp-subpages li.fmp-subpage {
        font-size: var(--font-size-p-small);
        font-family: var(--font-read);
        font-weight: lighter;
    }

    #footer-juvenil-right #footer-main-pages .footer-main-page ul.fmp-subpages li.fmp-subpage a {
        color: var(--color-light-2);
        text-decoration: none;
    }

    #footer-juvenil-right #footer-privacy-pages {
        display: flex;
        width: 100%;
        justify-content: space-between;
    }

    #footer-juvenil-right #footer-privacy-pages h2.fpp-privacy-page {
        font-size: var(--font-size-p);
        font-family: var(--font-read);
        font-weight: lighter;
    }

    #footer-juvenil-right #footer-privacy-pages h2.fpp-privacy-page a {
        color: var(--color-light-2);
        text-decoration: none;
    }

    @container (width < 1262px) {
        #footer-juvenil-right #footer-main-pages {
            column-gap: var(--spacing-3);
        }
    }

    @container (width < 1146px) and (width > 768px) {
        #footer-juvenil-right {
            align-items: flex-start;
        }

        #footer-juvenil-right #footer-main-pages {
            flex-direction: column;
            row-gap: var(--spacing-3);
        }

        #footer-juvenil-right #footer-privacy-pages {
            flex-direction: column;
            row-gap: var(--spacing-3);
        }
    }

    @media only screen and (max-width: 914px) {
        #santa-elena-footer-juvenil {
            grid-template-columns: 1fr;
            grid-auto-rows: max-content;
        }

        .footer-section {
            border-right: none;
            border-bottom: 1px solid var(--color-light-2);
            height: max-content;
            padding: var(--spacing-4) var(--spacing-3);
        }

        .footer-section:last-of-type {
            border-bottom: none;
        }

        #footer-juvenil-right {
            align-items: flex-start;
            row-gap: var(--spacing-5)
        }

        #footer-juvenil-right #footer-main-pages {
            flex-direction: column;
            row-gap: var(--spacing-4);
        }

        #footer-juvenil-right #footer-privacy-pages h2.fpp-privacy-page a {
            font-size: var(--font-size-p-small);
        }
    }
</style>
<script>
    import CTloader from "@components/Loaders/CTloader.svelte";
    import { OrphanOrderVerification, verifyOrder } from "@libs/LiberyPayments/models/payments"
    import { navbar_solid } from "@stores/layout";
    import { defineNavbarDarkColorSchema } from "@themes/component_themes";
    import Footer from "@components/Footer/Footer.svelte";
    import { onMount } from "svelte";
    import MainLogo from "@components/UI/MainLogo.svelte";

    
    /*=============================================
    =            Setup            =
    =============================================*/
    
        window.scrollTo(0, 0);

        navbar_solid.set(true);
    
    /*=====  End of Setup  ======*/
    
    
    
    /*=============================================
    =            Properties            =
    =============================================*/
    
        /**
         * The order verification data
         * @type {OrphanOrderVerification}
         * @default null
         */
        let order_verification = null;

        /**
         * The whatsapp redirect link with a base text message which includes the tracking id
         * @type {string}
         */
        let whatsapp_redirect_link = "https://wa.me/5213313045999";
    
    /*=====  End of Properties  ======*/

    onMount(async () => {
        defineNavbarDarkColorSchema();

        await updateOrderVerification();
    });

    
    /*=============================================
    =            Methods            =
    =============================================*/
    
        /**
         * Adds the tracking id to the whatsapp redirect link
         * @param {string} tracking_id - The tracking id to add to the whatsapp redirect link
         * @returns {void}
         */
        const addTrackingIdToWhatsappLink = tracking_id => {
            whatsapp_redirect_link = `https://wa.me/5213313045999?text=Hola,%20me%20gustaría%20saber%20más%20sobre%20mi%20compra%20con%20el%20código%20de%20rastreo%20${tracking_id}`;
        }

        /**
         * Updates the data of the order verification. If no order_id is provided, the method will rely on the cookies set by the payments service.
         * @param {string} order_id - The order id to verify
         * @returns {Promise<void>}
         */
        const updateOrderVerification = async order_id => {
            order_id = order_id ?? "";
            order_verification = await verifyOrder(order_id);

            if (order_verification != null) {
                addTrackingIdToWhatsappLink(order_verification.PaymentIntentId);
            }
        }
    
    /*=====  End of Methods  ======*/
    
    
    
    
</script>

<main id="purchase-verification-page">
    <div id="page-center-content">
        {#if order_verification == null}
            <CTloader 
                primary_color="var(--color-light-7)"
                secondary_color="var(--color-light-3)"
                size="92"
            />
        {:else }
            <div class="order-details-wrapper" class:order-paid={order_verification.Paid}>
                <figure id="santa-elena-logo-wrapper">
                    <MainLogo 
                        monochrome_color={order_verification.Paid ? "var(--dark-8)" : "var(--danger)"}
                        monochrome
                    />
                    <figcaption style:visibility="hidden">
                        Santa Elena Funerarias
                    </figcaption>
                </figure>
                <header id="next-steps-wrapper">
                    <h1 id="order-status-based-greet">
                        {#if order_verification.Paid}
                            ¡Gracias por tu compra!
                        {:else}
                            ¡Lo sentimos!
                        {/if}
                    </h1>
                    <p class="next-steps-explanation">
                        {#if order_verification.Paid}
                            Tu código de rastreo es <strong>{order_verification.PaymentIntentId}</strong>. por favor, guarda este código ya que sera necesario para darle continuidad a tu compra. Para continuar con tu compra, por favor ponte en contacto con nosotros haciendo click en el siguiente botón.
                        {:else}
                            No hemos podido encontrar tu compra. Por favor, contacta a soporte.
                        {/if}
                    </p>
                </header>
                <div id="next-steps-control">
                    <a id="whatsapp-support-link" href="{whatsapp_redirect_link}" target="_blank" rel="noopener noreferrer">
                        <button class="button-thin button-1">
                            Continuar con la contratación
                        </button>
                    </a>
                </div>
            </div>
        {/if}
    </div>
</main>
<Footer />

<style>
    #purchase-verification-page {
        display: grid;
        padding: var(--navbar-height) 0 0 0; 
        container: purchase-verification-page / inline-size;
        min-height: 100vh;
        width: 100%;
        place-items: center;
    }

    #page-center-content {
        display: grid;
        container-type: inline-size;
        place-items: center;
        width: 60%;
    }
    
    .order-details-wrapper {
        display: flex;
        gap: var(--spacing-4);
        align-items: center;
        flex-direction: column;
        width: 100cqw;
    }

    .order-details-wrapper figure {
        display: flex;
        flex-direction: column;
        width: 20cqw;
        align-items: center;
        justify-content: center;
    }

    .order-details-wrapper figure figcaption {
        height: 0;
    }

    .order-details-wrapper header {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-3);
        text-align: center;
    }

    .order-details-wrapper header h1 {
        font-size: var(--font-size-h2);
        color: var(--dark-7);
        line-height: 1;
    }

    #whatsapp-support-link button {
        --button-color: color-mix(in hsl, var(--color-light-4), var(--color) 11%);

        background: var(--button-color) !important;
        color: var(--clear-1) !important;
    }

    
    /*=============================================
    =            Screen breakpoints            =
    =============================================*/
    
        @container purchase-verification-page (width < 1268px) {
            #page-center-content {
                padding: var(--spacing-3) 0;
                width: 80%;
            }

            .order-details-wrapper figure {
                width: 40cqw;
            }
        }

        @container purchase-verification-page (width < 768px) {
            .order-details-wrapper figure {
                width: 60cqw;
            }
        }

        @container purchase-verification-page (width <= 350px) {
            .order-details-wrapper figure {
                width: 100cqw;
            }
        }
    
    /*=====  End of Screen breakpoints  ======*/
    
    
</style>
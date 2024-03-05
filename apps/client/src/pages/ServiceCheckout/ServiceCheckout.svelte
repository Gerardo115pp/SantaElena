<script>
    import { LiberyHTMLPreprocessor } from "@libs/LiberyHTMLpreprocessor/html_preprocessor";
    import { createCheckoutSession } from "@libs/LiberyPayments/models/payments";
    import HtmlRenderer from "@libs/LiberyHTMLpreprocessor/components/HtmlRenderer.svelte";
    import { wordpress_posts_rules } from "@themes/markup_styles/wordpress_posts";
    import { services_fallbacks } from "@databases/prefetch_services";
    import { user_agent_price_formatter } from "@stores/services";
    import { getSantaElenaServices } from "@models/Services";
    import { selected_service } from "@stores/services";
    import { isValidEmail } from "@libs/utils";
    import { defineNavbarDarkColorSchema } from "@themes/component_themes";
    import { ServiceData } from "@models/Services";
    import { onMount } from "svelte";
    import { browser } from "$app/environment";

    
    /*=============================================
    =            setup            =
    =============================================*/
    
        if (browser) {
            window.scrollTo(0, 0);
        }
    
    /*=====  End of setup  ======*/

    /*=============================================
    =            Properties            =
    =============================================*/
    
        export let params = {};

        /*----------  Service data recollection  ----------*/
                
            /**
             * The service the user has selected because he/she wants to proceed to purchase it
             * @type {ServiceData}
             */
            let service_data = $selected_service;

            let service_id = parseInt(params.service_id);

            if (service_data == null) {
                service_data = services_fallbacks.find(service => service.Id === service_id);         
            }


        /*----------  Preeprocessor rules  ----------*/

            /**
             * The rules for the preprocessor of the services purchase page
             * @type {import("@app_modules/LiberyHTMLpreprocessor/html_preprocessor").NodesPreprocessRule[]}
             */
            const service_checkout_preprocessor_rules = [
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
                    classes: ["service-description-paragraph"],
                    attributes: [],
                    event_handlers: []
                },
                {
                    tag_name: "ul",
                    classes: ["decorated-list-item"],
                }
            ]

            /**
             * The preprocessor for the service content
             * @type {LiberyHTMLPreprocessor}
             */
            const service_checkout_preprocessor = new LiberyHTMLPreprocessor();

        /*----------  Customer details ----------*/

            /**
             * The customer's name. bound to the input element that collects this information
             * @type {string}
             */
            let customer_name = "";

            /**
             * The customer's email. bound to the input element that collects this information
             * @type {string}
             */
            let customer_email = "";

            /**
             * Whether the data is valid or not
             * @type {boolean}
             */
            let is_customer_data_valid = false;

    /*=====  End of Properties  ======*/
    
    onMount(() => {
        defineNavbarDarkColorSchema();

        updateServicesCheckoutPreprocessorRules(service_checkout_preprocessor_rules);

        if ($selected_service == null) {
            getServiceData();
        }
    });
    
    /*=============================================
    =            Methods            =
    =============================================*/
    
        const getServiceData = async () => {
            const all_services = await getSantaElenaServices();

            console.debug("All services: ", all_services)
            console.debug("Service id: ", service_id)
            console.debug("Service id type: ", typeof service_id);
            console.debug("Fallbacks: ", services_fallbacks)

            service_data = all_services.find(service => service.Id === service_id);
            console.debug(`Service data: ${service_data} for service id ${service_id}`)
        }

        const handleBack = () => {
            // pop();
        }

        const handleServicePurchase = async () => {
            let success_url = "https://dev-santa-elena.mx/verify-purchase";
            let cancel_url = "https://dev-santa-elena.mx/";

            success_url = encodeURIComponent(success_url);
            cancel_url = encodeURIComponent(cancel_url);

            const tracking_id = crypto.randomUUID();

            const session = await createCheckoutSession(tracking_id, service_data.Id, customer_name, customer_email, success_url, cancel_url);

            session.redirect();
        }

        const updateServicesCheckoutPreprocessorRules = rules => {
            service_checkout_preprocessor.setRules(rules);
        }

        const validateCustomerData = () => {
            is_customer_data_valid = isValidEmail(customer_email) && customer_name.length > 1;
        }
    
    /*=====  End of Methods  ======*/
    
</script>

{#if service_data != null}
    <main id="service-purchase-page">
        <section id="spp-service-content">
            <div id="spp-service-content-wrapper">
                <header id="spp-header">
                    <h1 id="spp-service-name" class="text-dark-7">
                        {service_data.title}
                    </h1>
                    <p class="service-biref text-gray-700 blockquote">
                        {service_data.brief_description}
                    </p>
                </header>
                <article class="checkout-box">
                    <HtmlRenderer 
                        the_rules={wordpress_posts_rules}
                        the_content={service_data.DescriptionText}
                        wrapper_class="service-description"
                    />
                </article>
            </div>
        </section>
        <aside id="service-purchase-panel">
            <div id="spp-spanel-next-steps">
                <h2 class="headline-2">
                    Siguientes pasos
                </h2>
                <article class="checkout-box">
                    <HtmlRenderer 
                        the_rules={service_checkout_preprocessor_rules}
                        the_content={service_data.NextStepsText}
                    />
                </article>
            </div>
            <div id="spp-spanel-purchase-checkout">
                <div id="spp-spanel-pc-customer-information" role="group">
                    <legend>
                        <h2 class="headline-3">
                            Información de contacto
                        </h2>
                        <p>Esta información sera usada para contactarte y hacerte llegar tus datos de seguimiento.</p>
                    </legend>
                    <label class="label">
                        <span>
                            Tu nombre
                        </span>
                        <input bind:value={customer_name} on:keyup={validateCustomerData} type="text" class="input" placeholder="Helario Jimenez...">
                    </label>
                    <label class="label">
                        <span>
                            Tu correo
                        </span>
                        <input bind:value={customer_email} on:keyup={validateCustomerData} type="email" class="input" placeholder="tu_nombre@example.com">
                    </label>
                </div>
                <details open>
                    <summary>
                        Balance
                    </summary>
                    <dl id="spp-balance-details" role="list">
                        <div role="listitem">
                            <dt class="balance-item-name">
                                {service_data.title}
                            </dt>
                            <dd class="balance-item-value">
                                {user_agent_price_formatter.format(service_data.Price)}
                            </dd>
                        </div>
                    </dl>
                </details>
                <div id="spp-spanel-pc-controls" role="group">
                    <button on:click={handleBack} class="button-2 button-thin">
                        Regresar
                    </button>
                    <button on:click={handleServicePurchase} class="button-thin stripe-button" disabled={!is_customer_data_valid}>
                        Contratar
                        <svg viewBox="0 0 32.334 13.571">
                            <g id="SVGRepo_iconCarrier" transform="matrix(0.9942049980163574, 0, 0, 0.9831390380859375, 0.1483490020036693, -9.07441520690918)" style="">
                                <path d="M8.25 10.435l-2.165 0.46-0.010 7.12c0 1.315 0.99 2.165 2.305 2.165 0.73 0 1.265-0.135 1.56-0.295v-1.69c-0.285 0.115-1.685 0.525-1.685-0.785v-3.16h1.685v-1.89h-1.685zM12.705 13.015l-0.135-0.655h-1.92v7.66h2.215v-5.155c0.525-0.69 1.41-0.555 1.695-0.465v-2.040c-0.3-0.105-1.335-0.3-1.855 0.655zM17.32 9.4l-2.23 0.475v1.81l2.23-0.475zM2.245 14.615c0-0.345 0.29-0.48 0.755-0.485 0.675 0 1.535 0.205 2.21 0.57v-2.090c-0.735-0.29-1.47-0.405-2.205-0.405-1.8 0-3 0.94-3 2.51 0 2.46 3.375 2.060 3.375 3.12 0 0.41-0.355 0.545-0.85 0.545-0.735 0-1.685-0.305-2.43-0.71v2c0.825 0.355 1.66 0.505 2.425 0.505 1.845 0 3.115-0.79 3.115-2.39 0-2.645-3.395-2.17-3.395-3.17zM32 16.28c0-2.275-1.1-4.070-3.21-4.070s-3.395 1.795-3.395 4.055c0 2.675 1.515 3.91 3.675 3.91 1.060 0 1.855-0.24 2.46-0.575v-1.67c-0.605 0.305-1.3 0.49-2.18 0.49-0.865 0-1.625-0.305-1.725-1.345h4.345c0.010-0.115 0.030-0.58 0.030-0.795zM27.605 15.44c0-1 0.615-1.42 1.17-1.42 0.545 0 1.125 0.42 1.125 1.42zM21.96 12.21c-0.87 0-1.43 0.41-1.74 0.695l-0.115-0.55h-1.955v10.24l2.22-0.47 0.005-2.51c0.32 0.235 0.795 0.56 1.57 0.56 1.59 0 3.040-1.16 3.040-3.98 0.005-2.58-1.465-3.985-3.025-3.985zM21.43 18.335c-0.52 0-0.83-0.19-1.045-0.42l-0.015-3.3c0.23-0.255 0.55-0.44 1.060-0.44 0.81 0 1.37 0.91 1.37 2.070 0.005 1.195-0.545 2.090-1.37 2.090zM15.095 20.020h2.23v-7.66h-2.23z"/>
                            </g>
                        </svg>
                    </button>
                </div>
            </div>
        </aside>
    </main>
{:else}
    <h1>
        Service not found
    </h1>
{/if}

<style>
    #service-purchase-page {
        display: grid;
        grid-template-columns: 70% 30%;
        container: service-purchase-page / inline-size;
        padding: var(--navbar-height) 0 0 0;
    }
    
    #spp-service-content {
        container: spp-service-content / inline-size;
    }
    
    #spp-service-content-wrapper {
        display: flex;
        flex-direction: column;
        padding: var(--spacing-5) var(--spacing-5);
        row-gap: var(--spacing-4);
    }

    
    /*=============================================
    =            Service Content            =
    =============================================*/
        header#spp-header {
            display: flex;
            flex-direction: column;
            row-gap: var(--spacing-2);
        }    
        
        h1#spp-service-name {
            line-height: 1;
        }

        :global(header#spp-header + article .service-description) {
            display: flex;
            flex-direction: column;
            row-gap: var(--spacing-3);
        }

        :global(header#spp-header + article .service-description p) {
            font-size: var(--font-size-p);
            font-weight: lighter;
        }
    
    /*=====  End of Header  ======*/

    
    /*=============================================
    =            Purchase panel            =
    =============================================*/
    
        aside#service-purchase-panel {
            box-sizing: border-box;
            position: sticky;
            display: flex;
            container: service-purchase-panel / size;
            overflow: auto;
            width: 100%;
            height: calc(100vh - var(--navbar-height));
            background: var(--dark-8);
            top: var(--navbar-height);
            left: 70%;
            flex-direction: column;
            color: var(--color-light-1);
            padding: var(--spacing-3);
            row-gap: var(--spacing-3);
        }

        :global(aside#service-purchase-panel .headline-2, aside#service-purchase-panel .headline-3) {
            color: var(--color-light-5);
        }
        
        :global(#spp-spanel-next-steps) {
            display: flex;
            flex-direction: column;
            row-gap: var(--spacing-3);
        }

        :global(#spp-spanel-next-steps > article) {
            display: flex;
            height: 30cqh;
            overflow: auto;
            flex-direction: column;
            row-gap: var(--spacing-1);
            border-bottom: 1px solid var(--color-light-2);
        }
        
        :global(#spp-spanel-next-steps > article .headline-2) {
            margin-top: var(--spacing-1);
            font-size: var(--font-size-4);
        }

        :global(#spp-spanel-next-steps > article .headline-3) {
            color: var(--color-light-4);
        }

        :global(#spp-spanel-next-steps > article strong) {
            color: var(--color-light-7);
        }

        :global(#spp-spanel-next-steps > article p) {
            font-size: var(--font-size-p-small);
        }

        :global(#spp-spanel-next-steps > article ul.decorated-list-item) {
            display: flex;
            flex-direction: column;
            row-gap: var(--spacing-1);
        }

        :global(#spp-spanel-next-steps > article ul.decorated-list-item li) {
            font-size: var(--font-size-p-small);
            line-height: 1.3;
        }

        
        /*----------  Customer Details  ----------*/

            #spp-spanel-pc-customer-information {
                display: flex;
                flex-direction: column;
                row-gap: var(--spacing-2);
            }

            #spp-spanel-pc-customer-information legend {
                display: flex;
                flex-direction: column;
                row-gap: var(--spacing-1);
            }

            #spp-spanel-pc-customer-information legend h2 {
                color: var(--color-light-3);
                font-size: var(--font-size-h5);
            }
            
            #spp-spanel-pc-customer-information legend p {
                font-size: var(--font-size-fineprint);
                line-height: 1;
            }

            #spp-spanel-pc-customer-information label.label span {
                font-size: var(--font-size-fineprint);
            }

            #spp-spanel-pc-customer-information input.input {
                padding: calc(0.25 * var(--spacing-1)) var(--spacing-1);
                
            }
                
        


        
        /*----------  Stripe checkout details  ----------*/
        
            #spp-spanel-purchase-checkout {
                display: flex;
                flex-direction: column;
                height: 20cqh;
                row-gap: var(--spacing-2);
            }

            #spp-balance-details [role="listitem"] {
                display: flex;
                justify-content: space-between;
                padding: var(--spacing-2) 0;
            }

            #spp-balance-details [role="listitem"] .balance-item-name {
                color: var(--color-light-5);
                font-weight: bold;
            }

            #spp-spanel-purchase-checkout #spp-spanel-pc-controls {
                display: flex;
                justify-content: space-between;
            }

            #spp-spanel-purchase-checkout .stripe-button {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: var(--spacing-2);
            }

            #spp-spanel-purchase-checkout .stripe-button svg {
                width: 2.4em;
            }

            #spp-spanel-purchase-checkout .stripe-button svg path {
                fill: var(--clear-1);
            }




    
    /*=====  End of Purchase panel  ======*/
    
    
    
    /*=============================================
    =            Screen breakpoints            =
    =============================================*/
    
        @media only screen and (max-width: 1341px) and (min-width: 1021px) {
            h1#spp-service-name {
                font-size: var(--font-size-h2);
            }

            #service-purchase-page {
                grid-template-columns: 50% 50%;
            }
        }

        @media only screen and (max-width: 1020px) {
            #service-purchase-page {
                grid-template-columns: 100%;
            }
        }

        @container service-purchase-page (width <= 1341px) and (width > 1021px) {
            #spp-spanel-purchase-checkout #spp-spanel-pc-controls {
                flex-direction: column-reverse;
                row-gap: var(--spacing-2);
            }
        }

        @container service-purchase-page (width <= 1020px) {
            #service-purchase-page #spp-service-content {
                grid-row: 2 / span 1;
            }

            #service-purchase-page aside#service-purchase-panel {
                grid-row: 1 / span 1;
                position: static;
            }
        }

        
        /*----------  Service Purchase Panel  ----------*/
        
            @container service-purchase-panel (width <= 453px) {
                #spp-spanel-pc-customer-information legend h2 {
                    font-size: var(--font-size-h3);
                }

                #spp-spanel-purchase-checkout #spp-spanel-pc-controls {
                    flex-direction: column-reverse;
                    row-gap: var(--spacing-3);
                }
            }
        
        
        /*----------  spp-service-content  ----------*/
        
            @container spp-service-content (width <= 878px) {
                #spp-service-content-wrapper {
                    padding: var(--spacing-5) var(--spacing-4);
                }
            }

            /* @container spp-service-content (width <= 393px) {
                #spp-service-content-wrapper {
                    padding: var(--spacing-5) var(--spacing-3);
                }
            } */
    

    /*=====  End of Screen breakpoints  ======*/
    
    
    
    
</style>
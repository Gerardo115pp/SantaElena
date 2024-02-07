<script>
    import { ServiceData, getSantaElenaServices } from "@models/Services";
    import ServiceItem from "@components/ModelsViews/ServiceItem.svelte";
    import SectionHeader from "@components/UI/SectionHeader.svelte";
    import { onMount } from "svelte";
    import ServiceContent from "@components/ModelsViews/ServiceContent.svelte";


    
    /*=============================================
    =            Properties            =
    =============================================*/
    
        /** 
         * @type {ServiceData[]} 
         */
        let services_data = [];


        /**
         * The service the user has selected because he/she wants read more about it or purchase it
         * @type {ServiceData} 
         */
        let selected_service;
    
    /*=====  End of Properties  ======*/
    
    onMount(() => {
        getServicesData();
    });
    
    /*=============================================
    =            Methods            =
    =============================================*/
    
        const getServicesData = async () => {
            services_data = await getSantaElenaServices();

            // For styling purposes
            // selected_service = services_data[0];
        }

        const handleServiceSelection = e => {
            /**
             * @type {ServiceData}
             */
            let service_data = (e.detail instanceof ServiceData) ? e.detail : undefined;

            selected_service = service_data;
        }
    
    /*=====  End of Methods  ======*/
    
    

</script>


<section id="our-services-section">
    <SectionHeader section_name="Servicios"/>
    {#if selected_service === undefined}
        <div id="oss-content">
            <ul id="oss-content-center">
                {#each services_data as service_data}
                    <ServiceItem on:service-selected={handleServiceSelection} service_data={service_data}/>
                {/each}
            </ul>
        </div>
    {:else}
        <div id="oss-service-description-wrapper">
            <ServiceContent on:service-unselected={handleServiceSelection} service_data={selected_service}/>
        </div>
    {/if}
</section>

<style>
    #our-services-section {
        width: 100%;
    }

    #our-services-section #oss-content {
        padding: var(--spacing-5) var(--spacing-6);
    }

    #oss-content-center {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        justify-items: center;
        grid-gap: var(--spacing-4);
    }

    @media only screen and (max-width: 768px)  {
        #our-services-section #oss-content {
            padding: var(--spacing-5) var(--spacing-4);
        }

        #oss-content-center {
            grid-template-columns: 1fr;
        }
    }
</style>
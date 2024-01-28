<script>
    import ServiceItem from "@components/ModelsViews/ServiceItem.svelte";
    import SectionHeader from "@components/UI/SectionHeader.svelte";
    import { ServiceData } from "@models/Services";

    
    /*=============================================
    =            Properties            =
    =============================================*/
    
        /** 
         * @type {ServiceData[]} 
         * @todo fetch services data from the server
         */
        let services_data = [
            new ServiceData({
                id: crypto.randomUUID(),
                title: "Servicio de cremación",
                description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
                brief_description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
                image: "",
            }),
            new ServiceData({
                id: crypto.randomUUID(),
                title: "Servicio de funeraria",
                description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
                brief_description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
                image: "",
            }),
            new ServiceData({
                id: crypto.randomUUID(),
                title: "Servicio de recolección",
                description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
                brief_description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
                image: "",
            }),
            new ServiceData({
                id: crypto.randomUUID(),
                title: "Servicio de importación",
                description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
                brief_description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
                image: "",
            }),
        ];
    
    /*=====  End of Properties  ======*/
    
        
</script>


<section id="our-services-section">
    <SectionHeader section_name="Servicios"/>
    <div id="oss-content">
        <ul id="oss-content-center">
            {#each services_data as service_data}
                <ServiceItem service_data={service_data}/>
            {/each}
        </ul>
    </div>
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
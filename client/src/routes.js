import HomePage from "@pages/Home/Home.svelte"
import ServiceCheckout from "@pages/ServiceCheckout/ServiceCheckout.svelte";
import { isMobile } from '@libs/utils'

const routes = {
    "/":  HomePage,
    "/service-checkout/:service_id":  ServiceCheckout,
}

export { routes }
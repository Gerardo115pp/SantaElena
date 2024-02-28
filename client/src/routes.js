import HomePage from "@pages/Home/Home.svelte"
import ServiceCheckout from "@pages/ServiceCheckout/ServiceCheckout.svelte";
import VerifyPurchase from "@pages/VerifyPurchase/VerifyPurchase.svelte";
import BlogPage from "@pages/Blog/Blog.svelte";
import { isMobile } from '@libs/utils'

const routes = {
    "/":  HomePage,
    "/service-checkout/:service_id":  ServiceCheckout,
    "/verify-purchase": VerifyPurchase,
    "/blog": BlogPage
}

export { routes }
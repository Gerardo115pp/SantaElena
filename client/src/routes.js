import HomePage from "@pages/Home/Home.svelte"
import { isMobile } from '@libs/utils'

const routes = {
    "/":  HomePage,
}

export { routes }
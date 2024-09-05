import { createPinia } from "pinia";
import { piniaShare } from "@ruomu-ui/core"
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia();

pinia.use(piniaShare);
pinia.use(piniaPluginPersistedstate)

export default pinia;
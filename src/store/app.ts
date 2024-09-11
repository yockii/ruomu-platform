import {defineStore} from "pinia";
import {Module} from "@/types";
import {ModuleApi} from "@/api";

interface State {
    theme: string | null;
    modules: Array<Module>;
}

export const useAppStore = defineStore('app', {
    state: ():State => ({
        theme: null,
        modules: []
    }),
    getters: {},
    actions: {
        async getModules() {
            if (this.modules.length > 0) {
                return this.modules;
            } else {
                return await this.loadModules();
            }
        },
        async loadModules() {
            try {
                const {data} = await ModuleApi.list({});
                this.modules = data?.items || [];
            } catch (e) {
                console.error(e);
            }
        }
    },
    persist: {
        storage: localStorage
    }
})
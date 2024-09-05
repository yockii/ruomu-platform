import {defineStore} from "pinia";

interface State {
    theme: string | null;
}

export const useAppStore = defineStore('app', {
    state: ():State => ({
        theme: null
    }),
    persist: {
        storage: localStorage
    }
})
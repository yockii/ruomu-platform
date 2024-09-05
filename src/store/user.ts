import {defineStore} from "pinia";
import {LoginResponse, User} from "@/types/User.ts";

interface State {
    user: User | null;
    token: string | null;
}

export const useUserStore = defineStore('user', {
    state: ():State => ({
        user: null,
        token: null
    }),
    getters: {
        isLogin(): boolean {
            return !!this.token
        }
    },
    actions: {
        signedIn({ user, token}:LoginResponse) {
            this.user = user;
            this.token = token;
        }
    },
    persist: {
        storage: sessionStorage
    }
})
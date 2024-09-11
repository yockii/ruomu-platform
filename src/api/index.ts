import {http} from "@ruomu-ui/api"
import {useUserStore} from "@/store/user";
import type {InternalAxiosRequestConfig} from "axios";

http.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    // 如果不是包含 login 的请求，都需要带上token
    const userStore = useUserStore()
    if (!config.url?.includes('login') && userStore.token) {
        if (config.headers) {
            config.headers.Authorization = `${userStore.token}`
        } else {
            config.headers = {
                Authorization: `${userStore.token}`
            }
        }
    }
    return config
})

export * from './user'
export * from './module'
import {LoginRequest, LoginResponse} from "@/types"
import { Response } from "@ruomu-ui/types"
import {Post} from "@ruomu-ui/api"

export const UserApi = {
    login: (data: LoginRequest): Promise<Response<LoginResponse>> => {
        return Post("/user/login", data)
    }
}
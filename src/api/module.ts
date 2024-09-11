import {Module} from "@/types";
import { Response, Paginate } from "@ruomu-ui/types"
import {Post, Get} from "@ruomu-ui/api"

export const ModuleApi = {
    list: (params: Module): Promise<Response<Paginate<Module>>> => {
        return Get('/module/list', params)
    },
    instance: (params: Module): Promise<Response<Module>> => {
        return Get('/module/detail/' + params.id, params)
    },
    add: (data: Module): Promise<Response<Module>> => {
        return Post('/module/add', data)
    },
    updateStatus: (data: Module): Promise<Response<Boolean>> => {
        return Post('/module/updateStatus', data)
    },
    dependencies: (moduleCode: string): Promise<Response<Array<string>>> => {
        return Get('/module/dependencies', {moduleCode})
    }
}
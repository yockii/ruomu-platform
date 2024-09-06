import {RouteRecordRaw} from "vue-router";

export const isRoutePathSame = (path: string, router: RouteRecordRaw) => {
    // 判断2个路由的地址是否相同，注意，可能存在redirect的情况
    return path === router.path || path === router.redirect;
}
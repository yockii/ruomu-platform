import {RouteRecordRaw} from "vue-router";
import {PlugDisconnected24Filled, PlugDisconnected24Regular} from "@vicons/fluent";

const route: RouteRecordRaw =
    {
        path: 'module',
        name: 'Module',
        redirect: '/module/list',
        meta: {
            title: '插件模块',
            order: 1,
            icon: PlugDisconnected24Regular,
            activeIcon: PlugDisconnected24Filled,
        },
        children: [
            {
                path: 'list',
                name: 'ModuleList',
                component: () => import('@/views/module/index.vue'),
                meta: {
                    title: '插件模块列表',
                    menuHide: true
                }
            },
            {
                path: 'detail/:id',
                name: 'ModuleDetail',
                component: () => import('@/views/module/Detail.vue'),
                meta: {
                    title: '插件模块详情',
                    menuHide: true
                }
            }
        ]
    }

export default route
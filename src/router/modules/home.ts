import {RouteRecordRaw} from "vue-router";
import {Home32Filled, Home32Regular} from "@vicons/fluent"

const route:RouteRecordRaw = {
        path: '',
        name: 'Home',
        alias: ['/home'],
        component: () => import('@/views/home/index.vue'),
        meta: {
            title: '首页',
            order: 1,
            icon: Home32Regular,
            activeIcon: Home32Filled,
        }
    }

export default route
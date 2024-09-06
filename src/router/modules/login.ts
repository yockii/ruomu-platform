import {RouteRecordRaw} from "vue-router";

const route:RouteRecordRaw = {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/login/index.vue'),
        meta: {
            title: '登录',
            customLayout: true,
            menuHide: true
        }
    }

export default route
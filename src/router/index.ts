import {
    createRouter,
    createWebHistory,
    isNavigationFailure,
} from 'vue-router'
import type {RouteRecordRaw} from "vue-router";
import { createDiscreteApi } from "naive-ui";
import {useUserStore} from "@/store/user.ts";

const { loadingBar } = createDiscreteApi(["loadingBar"]);

const modules = import.meta.glob("./modules/**/*.ts", {eager: true, import: "default"});
export const routes: Array<RouteRecordRaw> = [];

const defaultLayoutRoute: RouteRecordRaw = {
    path: '/',
    name: 'Layout',
    component: () => import('@/layout/primary.vue'),
    children: []
}

Object.keys(modules).forEach((key) => {
    const mod = modules[key] || {}
    const modList = Array.isArray(mod) ? [...mod] : [mod];
    modList.forEach((m: RouteRecordRaw) => {
        if (!m.meta?.customLayout) {
            defaultLayoutRoute.children?.push(m);
        } else {
            routes.push(m);
        }
    })
});

routes.push(defaultLayoutRoute);

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior: () => ({ left: 0, top: 0 }),
});

router.beforeEach((_to, _from, next) => {
    // 防止重复跳转, query/params也要判断
    if (_to.path === _from.path && _to.query === _from.query && _to.params === _from.params) {
        next(false);
        return
    }

    loadingBar.start();
    const userStore = useUserStore()
    if (!userStore.isLogin && _to.path !== '/login') {
        next('/login');
    } else {
        next();
    }
});

router.afterEach((_to, _from, failure) => {
    loadingBar.finish();
    if (isNavigationFailure(failure)) {
        console.error(failure);
        return
    }
    // 更改标题
    document.title = "若木低代码 | " + _to.meta.title;
})

export default router;

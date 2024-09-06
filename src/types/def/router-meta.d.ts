import 'vue-router'
import {Component} from "vue";

declare module 'vue-router' {
    interface RouteMeta {
        title?: string;
        icon?: Component | (() => Component);
        activeIcon?: Component | (() => Component);
        order?: number;
        menuHide?: boolean;
        customLayout?: boolean;
    }
}
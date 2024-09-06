import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "@/router";
import store from "@/store";
import 'animate.css'
import "virtual:uno.css"

createApp(App).use(store).use(router).mount('#app')

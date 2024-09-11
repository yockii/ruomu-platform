<script setup lang="ts">
import {NLayout, NLayoutSider, NLayoutHeader, NLayoutContent} from 'naive-ui'
import LogoComponent from '@ruomu-ui/toolbar-logo'
import {computed, onMounted, ref} from "vue";
import { resolveComponent } from '@ruomu-ui/core'
import SideMenuList from "./components/SideMenuList.vue";
import HeaderBar from "./components/HeaderBar.vue";
import {useAppStore} from "@/store/app.ts";

const Logo = computed(() => resolveComponent(LogoComponent.component) )
const sidebarLeftCollapsed = ref(false)

const appStore = useAppStore()

onMounted(() => {
  appStore.loadModules()
})
</script>

<template>
  <n-layout has-sider position="absolute">
    <n-layout-sider collapse-mode="width" v-model:collapsed="sidebarLeftCollapsed" :collapsed-width="48" :width="180" show-trigger="bar" bordered>
      <div class="logo">
        <logo style="margin-left: 12px; margin-top: -24px"/>
        <transition enter-active-class="animate__animated animate__fadeInLeft" >
          <div v-show="!sidebarLeftCollapsed" class="ml-8px -mt-8px text-16px">若木低代码平台</div>
        </transition>
      </div>
      <SideMenuList :collapsed-width="48" />
    </n-layout-sider>
    <n-layout>
      <n-layout-header bordered>
        <header-bar />
      </n-layout-header>
      <n-layout-content content-style="padding: 24px;">
        <router-view />
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>

<style scoped>
.logo {
  display: flex;
  align-items: center;
  justify-content: start;
  flex-direction: row;
  height: 48px;
}
</style>
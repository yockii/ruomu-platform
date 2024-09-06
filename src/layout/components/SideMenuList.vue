<script setup lang="ts">
import {MenuDividerOption, MenuGroupOption, MenuOption, NIcon, NMenu} from 'naive-ui'
import {computed, h} from "vue";
import {RouteRecordRaw, useRoute, RouterLink } from "vue-router";
import {resolveComponent} from '@ruomu-ui/core'
import router, { routes } from "@/router"
defineProps({
  collapsedWidth: {
    type: Number,
    default: 60,
  },
})

const route = useRoute()

type MenuMixedOption = MenuOption | MenuDividerOption | MenuGroupOption

const renderIcon = (r: RouteRecordRaw) => {
  if (r.meta?.icon) {
    // 是否当前路径
    if (route.fullPath === r.path || route.fullPath === r.redirect) {
      return () => h(NIcon, null, {default: () => h(resolveComponent(r.meta?.activeIcon!))})
    }
    return () => h(NIcon, null, {default: () => h(resolveComponent(r.meta?.icon!))})
  }
}

const buildMenuOption = (route: RouteRecordRaw):MenuMixedOption => {
  const children = []
  if (route.children) {
    for (const child of route.children) {
      if (child.meta && !child.meta.menuHide) {
        children.push(buildMenuOption(child))
      }
    }
  }

  return {
    label: () => h(
        RouterLink,
        {to: router.resolve(route)},
        () => route.meta?.title
    ),
    key: (route.redirect || router.resolve(route).path) as string,
    icon: renderIcon(route),
    children: children.length > 0 ? children : undefined
  }
}

const menuOptions = computed(() => {
  const layout = routes.find(route => route.name === 'Layout')
  const menuRoutes = layout?.children || []

  return menuRoutes.filter(route => {
    return route.meta && route.meta.menuHide !== true
  }).map(route => {
    return buildMenuOption(route)
  })
})

</script>

<template>
  <div>
    <n-menu :collapsed-width="collapsedWidth" :collapsed-icon-size="24" :options="menuOptions" :value="route.fullPath"/>
  </div>
</template>

<style scoped>

</style>
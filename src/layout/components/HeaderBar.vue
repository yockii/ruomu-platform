<script setup lang="ts">
import {NBreadcrumb, NBreadcrumbItem, NIcon} from "naive-ui";
import {RouteRecordRaw, useRoute} from "vue-router";
import {computed} from "vue";
import router from "@/router"
import {isRoutePathSame} from "@/utils";

const route = useRoute()

const routeList = computed(() => {
  // 把layout排除
  return route.matched.filter(item => item.name !== 'Layout')
})

const to = (r: RouteRecordRaw) => {
  if (isRoutePathSame(route.fullPath, r)) {
    return
  }
  router.push(r)
}
</script>

<template>
  <div class="flex">
    <n-breadcrumb>
      <n-breadcrumb-item v-for="item in routeList" :key="item.name" @click="to(item)">
        <n-icon v-if="item.meta.icon">
          <component :is="item.meta.icon" />
        </n-icon>
        {{ item.meta.title }}
      </n-breadcrumb-item>
    </n-breadcrumb>
  </div>
</template>

<style scoped>

</style>
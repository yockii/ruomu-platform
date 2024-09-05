<script setup lang="ts">
import {NLayout, NLayoutSider, NLayoutHeader, NLayoutContent} from 'naive-ui'
</script>

<template>
  <n-layout has-sider position="absolute">
    <n-layout-sider collapse-mode="transform" :collapsed-width="120" :width="240" show-trigger="bar" content-style="padding: 24px;" bordered>
      aaa
    </n-layout-sider>
    <n-layout>
      <n-layout-header bordered>
        xxx
      </n-layout-header>
      <n-layout-content content-style="padding: 24px;">
        <router-view />
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>

<style scoped>

</style>
<script setup lang="ts">
import { darkTheme, zhCN, dateZhCN, NConfigProvider, NLoadingBarProvider, NDialogProvider, NNotificationProvider, NMessageProvider } from "naive-ui"
import {computed} from "vue";
import {useAppStore} from "@/store/app.ts";

const appStore = useAppStore()
const theme = computed(() => {
  return appStore.theme === "dark" ? darkTheme : null
})
</script>

<template>
  <n-config-provider :theme="theme" :locale="zhCN" :date-locale="dateZhCN">
    <n-loading-bar-provider>
      <n-dialog-provider>
        <n-notification-provider>
          <n-message-provider>
            <router-view />
          </n-message-provider>
        </n-notification-provider>
      </n-dialog-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>

<style scoped>
</style>

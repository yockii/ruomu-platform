<script setup lang="ts">
import {
  NH1,
  NH3,
  NButton,
  NForm,
  NFormItem,
  NFormItemGi,
  NGrid,
  NInput,
  NSelect,
  NDivider,
  NDataTable,
  NIcon,
  NCollapse,
  NTag,
  NTooltip,
  useNotification
} from 'naive-ui'
import {computed, onMounted, ref, h} from "vue";
import {Module} from "@/types";
import {useRoute, useRouter} from "vue-router";
import {ModuleApi} from "@/api";
import {useAppStore} from "@/store/app.ts";
import {storeToRefs} from "pinia";
import {ArrowBackFilled, KeyboardDoubleArrowDownOutlined, KeyboardDoubleArrowUpOutlined} from "@vicons/material"

const appStore = useAppStore()
const {modules} = storeToRefs(appStore)
const moduleListOptions = computed(() => modules.value.map(item => ({
  label: item.name,
  value: item.code
})))

const notification = useNotification()
const loading = ref(false)
const route = useRoute()
const router = useRouter()
const editing = ref(false)
const instance = ref<Module>({})

const dependencyModuleCodes = computed(() => {
  return (instance.value.dependencies?.map(item => item.moduleCode) || []) as string[]
})

const getModuleInfo = async (id: string) => {
  loading.value = true
  try {
    const res = await ModuleApi.instance({id})
    instance.value = res.data || {}
  } catch (e) {
    notification.error({
      content: '获取模块信息失败'
    })
  } finally {
    loading.value = false
  }
}

const showSettings = ref(false)
const settingsColumns = [
  {
    title: '名称',
    key: 'code'
  },
  {
    title: '值',
    key: 'value'
  }
]

const showInjects = ref(false)
const injectColumns = [
  {
    title: '名称',
    key: 'name'
  },
  {
    title: '类型',
    key: 'type',
    render: (rowData: any) => {
      let text = ''
      let tag = ''
      let tooltip = ''
      switch (rowData.type) {
        case 1:
          text = 'GET'
          tag = 'info'
          tooltip = 'GET with JSON Response'
          break;
        case 2:
          text = 'POST'
          tag = 'info'
          tooltip = 'POST with JSON Response'
          break;
        case 3:
          text = 'PUT'
          tag = 'info'
          tooltip = 'PUT with JSON Response'
          break;
        case 4:
          text = 'DELETE'
          tag = 'info'
          tooltip = 'DELETE with JSON Response'
          break;
        case 11:
          text = 'GET'
          tag = 'success'
          tooltip = 'GET with HTML Request'
          break;
        case 12:
          text = 'POST'
          tag = 'success'
          tooltip = 'POST with HTML Request'
          break;
        case 13:
          text = 'PUT'
          tag = 'success'
          tooltip = 'PUT with HTML Request'
          break;
        case 14:
          text = 'DELETE'
          tag = 'success'
          tooltip = 'DELETE with HTML Request'
          break;
        case 51:
          text = 'HOOK'
          tag = ''
          tooltip = 'Hook for inner call'
          break;
        default:
          text = '未知'
          tag = 'error'
          tooltip = '未知'
      }
      return h(
          NTooltip,
          {          },
          {
            default: () => tooltip,
            trigger: () => h(NTag, {type: tag}, () => text)
          }
      )
    }
  },
  {
    title: '注入代码',
    key: 'injectCode'
  },
  {
    title: '授权码',
    key: 'authorizationCode'
  }
]

onMounted(() => {
  const id = route.params.id
  if (id) {
    getModuleInfo(id as string)
  }
})
</script>

<template>
  <div class="flex flex-col relative">
    <div class="absolute -top-16px -left-16px cursor-pointer">
      <n-tooltip>
        <template #trigger>
          <n-icon size="24" @click="router.back()">
            <ArrowBackFilled />
          </n-icon>
        </template>
        返回
      </n-tooltip>
    </div>
    <div class="flex items-center">
      <n-h1>{{ instance.name }} [{{ instance.code }}]</n-h1>
      <n-button type="primary" size="small" class="ml-auto">编辑</n-button>
    </div>
    <n-form :model="instance" label-placement="left">
      <n-grid :cols="24" :x-gap="16">
        <n-form-item-gi :span="12" label="模块名称">
          <n-input v-model:value="instance.name" :readonly="!editing"/>
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="模块编码">
          <n-input v-model:value="instance.code" :readonly="!editing"/>
        </n-form-item-gi>
      </n-grid>
      <n-form-item label="启动命令">
        <n-input v-model:value="instance.cmd" :readonly="!editing"/>
      </n-form-item>
      <n-form-item label="依赖模块">
        <n-select :options="moduleListOptions" multiple :value="dependencyModuleCodes"/>
      </n-form-item>
    </n-form>
    <n-divider/>
    <div class="flex flex-col">
      <div class="flex items-center">
        <n-h3 class="flex-1">设置项</n-h3>
        <!-- 展开/收起 -->
        <n-icon size="24" class="cursor-pointer">
          <KeyboardDoubleArrowDownOutlined v-if="!showSettings" @click="showSettings = true"/>
          <KeyboardDoubleArrowUpOutlined v-else @click="showSettings = false"/>
        </n-icon>
      </div>
      <n-collapse v-if="showSettings">
        <n-data-table size="small" :columns="settingsColumns" :data="instance.settings || []"/>
      </n-collapse>
    </div>
    <n-divider/>
    <div class="flex flex-col">
      <div class="flex items-center">
        <n-h3 class="flex-1">注入点</n-h3>
        <!-- 展开/收起 -->
        <n-icon size="24" class="cursor-pointer">
          <KeyboardDoubleArrowDownOutlined v-if="!showInjects" @click="showInjects = true"/>
          <KeyboardDoubleArrowUpOutlined v-else @click="showInjects = false"/>
        </n-icon>
      </div>
      <n-collapse v-if="showInjects">
        <n-data-table size="small" :columns="injectColumns" :data="instance.injects || []"/>
      </n-collapse>
    </div>

  </div>
</template>

<style scoped>

</style>
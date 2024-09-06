<script setup lang="ts">
import { NDataTable, DataTableColumn, useNotification, NSwitch, NForm, NFormItem, NInput, NSelect, NButton } from 'naive-ui'
import {Module} from "@/types";
import {onMounted, reactive, ref, h} from "vue";
import {ModuleApi} from "@/api";
import {useRouter} from "vue-router";

const notification = useNotification()
type Instance = Module & {
  updateLoading?: boolean
}
const router = useRouter()

const columns:Array<DataTableColumn> = [
  {
    title: '名称',
    key: 'name'
  },
  {
    title: '编码',
    key: 'code'
  },
  {
    title: '命令',
    key: 'cmd'
  },
  {
    title: '状态',
    key: 'status',
    render: (rowData: Instance) => {
      return h(NSwitch, {
        value: rowData.status === 1,
        loading: rowData.updateLoading,
        onUpdateValue: async (value: boolean) => {
          rowData.updateLoading = true
          try {
            const res = await ModuleApi.updateStatus({
              id: rowData.id,
              status: value ? 1 : -1
            })
            if (res.code === 0 && res.data) {
              notification.success({
                title: '成功',
                content: '更新成功',
                duration: 3000
              })
              rowData.status = value ? 1 : -1
            }
          } catch (e) {
            notification.error({
              title: '错误',
              content: '请求失败' + e,
              duration: 3000
            })
          } finally {
            rowData.updateLoading = false
          }
        }
      })
    }
  },
  {
    title: '操作',
    key: 'action',
    render: (rowData: Instance) => {
      return h(NButton, {
        text: true,
        size: 'small',
        onClick: () => {
          router.push({
            name: 'ModuleDetail',
            params: {
              id: rowData.id
            }
          })
        }
      }, () => '详情')
    }
  }
]

const condition = reactive<Instance>({
  offset: 0,
  limit: 10,
  status: 0
})

const loading = ref(false)
const data = ref<Instance[]>([])
const pagination = reactive({
  page: 1,
  pageSize: 10,
  total: 0
})
const handlePageChange = (currentPage: number) => {
  condition.offset = (currentPage - 1) * pagination.pageSize
  condition.limit = pagination.pageSize
  getList()
}
const handleUpdatePageSize = (pageSize: number) => {
  condition.offset = 0
  condition.limit = pageSize
  getList()
}

const getList = async () => {
  loading.value = true
  try {
    const res = await ModuleApi.list(condition)
    if (res.code === 0 && res.data) {
      data.value = res.data.items || []
      pagination.page = res.data.offset / res.data.limit + 1
      pagination.pageSize = res.data.limit
      pagination.total = res.data.total
    } else {
      notification.error({
        title: '错误',
        content: res.msg,
        duration: 3000
      })
    }
  } catch (e) {
    notification.error({
      title: '错误',
      content: '请求失败' + e,
      duration: 3000
    })
  } finally {
    loading.value = false
  }
}

const search = () => {
  condition.offset = 0
  getList()
}

onMounted(() => {
  getList()
})
</script>

<template>
  <div class="flex flex-col">
    <div class="flex items-center">
      <n-form inline label-align="left" :label-width="80">
        <n-form-item label="名称">
          <n-input class="w-240px" v-model:value="condition.name" clearable placeholder="输入模块名称" @keyup.enter="search" />
        </n-form-item>
        <n-form-item label="编码">
          <n-input class="w-240px" v-model:value="condition.code" clearable placeholder="输入模块编码" @keyup.enter="search" />
        </n-form-item>
        <n-form-item label="状态">
          <n-select class="w-240px" v-model:value="condition.status" clearable placeholder="选择状态" :options="[
            {
              label: '全部',
              value: 0
            },
            {
              label: '启用',
              value: 1
            },
            {
              label: '禁用',
              value: -1
            }
          ]" @update:value="search" />
        </n-form-item>
      </n-form>

      <div class="ml-auto">
        <n-button type="primary" @click="search">查询</n-button>
      </div>
    </div>
    <n-data-table
        remote
        :columns="columns"
        :data="data"
        :loading="loading"
        :pagination="pagination" @update:page="handlePageChange" @update:page-size="handleUpdatePageSize" />
  </div>
</template>

<style scoped>

</style>
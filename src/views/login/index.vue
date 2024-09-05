<script setup lang="ts">
import {type FormRules, NCard, NForm, NFormItem, NInput, NButton, useNotification} from "naive-ui";
import {ref} from "vue";
import {UserApi} from "@/api";
import {useUserStore} from "@/store/user.ts";
import {useRouter} from "vue-router";

const router = useRouter()
const userStore = useUserStore()
const notification = useNotification()

const loginData = ref({
  username: '',
  password: ''
})

const rules: FormRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ]
}

const loading = ref(false)

const handleLogin = async () => {
  loading.value = true
  try {
    const res = await UserApi.login(loginData.value)
    if (res.code === 0 && res.data) {
      userStore.signedIn(res.data)
      notification.success({
        title: '登录成功',
        duration: 2000
      })
      router.replace('/')
    } else {
      notification.error({
        title: '登录失败',
        content: res.msg,
        duration: 3000,
        keepAliveOnHover: true
      })
    }
  } catch (e) {
    notification.error({
      title: '登录失败',
      content: '错误: ' + e,
      duration: 3000,
      keepAliveOnHover: true
    })
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <n-card title="登录" hoverable style="width: 480px" embedded>
    <n-form :model="loginData" :rules="rules" >
      <n-form-item label="用户名" path="username">
        <n-input v-model:value="loginData.username" placeholder="请输入用户名" />
      </n-form-item>
      <n-form-item label="密码" path="password">
        <n-input v-model:value="loginData.password" placeholder="请输入密码" type="password" />
      </n-form-item>
      <div class="flex justify-end">
        <n-button type="primary" @click="handleLogin" :disabled="loading">登录</n-button>
      </div>
    </n-form>
  </n-card>
</template>

<style scoped>

</style>
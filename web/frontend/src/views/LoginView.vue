<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { NCard, NForm, NFormItem, NInput, NButton, NAlert } from 'naive-ui'
import { useAuthStore } from '../stores/auth'
import { ApiError } from '../api/client'

const auth = useAuthStore()
const router = useRouter()
const route = useRoute()

const username = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

async function handleSubmit() {
  error.value = ''
  loading.value = true
  try {
    await auth.login(username.value, password.value)
    const next = typeof route.query.next === 'string' ? route.query.next : '/'
    router.push(next)
  } catch (e) {
    if (e instanceof ApiError && e.status === 429) {
      error.value = 'Terlalu banyak percobaan gagal. Coba lagi beberapa menit lagi.'
    } else {
      error.value = 'Username atau password salah.'
    }
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <main class="auth-page">
    <div class="app-backdrop">
      <div class="app-blob a"></div>
      <div class="app-blob b"></div>
      <div class="app-blob c"></div>
    </div>
    <NCard class="auth-card" title="TarOS">
      <NForm @submit.prevent="handleSubmit">
        <NAlert v-if="error" type="error" :show-icon="false" style="margin-bottom: 16px">
          {{ error }}
        </NAlert>
        <NFormItem label="Username">
          <NInput v-model:value="username" autofocus autocomplete="username" @keyup.enter="handleSubmit" />
        </NFormItem>
        <NFormItem label="Password">
          <NInput
            v-model:value="password"
            type="password"
            show-password-on="click"
            autocomplete="current-password"
            @keyup.enter="handleSubmit"
          />
        </NFormItem>
        <NButton type="primary" block :loading="loading" @click="handleSubmit">Masuk</NButton>
      </NForm>
    </NCard>
  </main>
</template>

<style scoped>
.auth-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.auth-card {
  position: relative;
  z-index: 1;
  width: min(360px, 90vw);
}
</style>

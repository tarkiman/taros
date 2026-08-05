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
const totpCode = ref('')
const error = ref('')
const loading = ref(false)
// Set once the server confirms username+password were correct but the
// account has 2FA enabled — see stores/auth.ts login(). Password/username
// stay filled (not re-asked) since the final request needs all three.
const needsTotp = ref(false)

function goNext() {
  const next = typeof route.query.next === 'string' ? route.query.next : '/'
  router.push(next)
}

async function handleSubmit() {
  error.value = ''
  loading.value = true
  try {
    const info = await auth.login(username.value, password.value, needsTotp.value ? totpCode.value : undefined)
    if (info.authenticated) {
      goNext()
      return
    }
    if (info.totpRequired) {
      needsTotp.value = true
      return
    }
    error.value = 'Username atau password salah.'
  } catch (e) {
    if (e instanceof ApiError && e.status === 429) {
      error.value = 'Terlalu banyak percobaan gagal. Coba lagi beberapa menit lagi.'
    } else if (needsTotp.value) {
      error.value = 'Kode salah — coba lagi, atau pakai salah satu kode cadangan.'
      totpCode.value = ''
    } else {
      error.value = 'Username atau password salah.'
    }
  } finally {
    loading.value = false
  }
}

function backToPassword() {
  needsTotp.value = false
  totpCode.value = ''
  error.value = ''
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

        <template v-if="!needsTotp">
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
        </template>

        <template v-else>
          <p class="totp-hint">Masukkan kode dari aplikasi authenticator, atau salah satu kode cadangan.</p>
          <NFormItem label="Kode">
            <NInput
              v-model:value="totpCode"
              autofocus
              autocomplete="one-time-code"
              placeholder="123456 atau XXXX-XXXX"
              @keyup.enter="handleSubmit"
            />
          </NFormItem>
          <NButton type="primary" block :loading="loading" @click="handleSubmit">Lanjutkan</NButton>
          <NButton text block style="margin-top: 8px" @click="backToPassword">← Kembali</NButton>
        </template>
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

.totp-hint {
  margin: 0 0 12px;
  font-size: 0.84rem;
  color: var(--text-muted);
}
</style>

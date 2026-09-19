<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { NCard, NSwitch, NSpin, useMessage } from 'naive-ui'
import { systemApi, type HostAddress } from '../api/system'
import { copyText } from '../utils/clipboard'

const { t } = useI18n()
const message = useMessage()

const addresses = ref<HostAddress[]>([])
const loading = ref(true)
const failed = ref(false)
const showAll = ref(false)

async function load() {
  loading.value = true
  failed.value = false
  try {
    addresses.value = (await systemApi.addresses(showAll.value)).addresses
  } catch {
    failed.value = true
  } finally {
    loading.value = false
  }
}
onMounted(load)
watch(showAll, load)

async function copy(text: string) {
  try {
    await copyText(text)
    message.success(t('dashboard.hostAddresses.copied', { ip: text }))
  } catch {
    message.error(t('dashboard.hostAddresses.copyFailed'))
  }
}
</script>

<template>
  <NCard class="host-addr-card">
    <template #header>
      <div class="head">
        <span>{{ t('dashboard.hostAddresses.title') }}</span>
        <label class="all-toggle">
          <NSwitch v-model:value="showAll" size="small" />
          <span class="text-muted">{{ t('dashboard.hostAddresses.showAll') }}</span>
        </label>
      </div>
    </template>

    <div v-if="loading && addresses.length === 0" class="loading"><NSpin size="small" /></div>
    <p v-else-if="failed" class="text-muted empty-note">{{ t('dashboard.hostAddresses.loadFailed') }}</p>
    <p v-else-if="addresses.length === 0" class="text-muted empty-note">{{ t('dashboard.hostAddresses.none') }}</p>
    <ul v-else class="addr-list">
      <li v-for="a in addresses" :key="a.interface + a.ip">
        <span class="addr-kind">{{ t(`dashboard.hostAddresses.kind.${a.kind}`) }}</span>
        <button type="button" class="addr-ip" :title="t('dashboard.hostAddresses.clickToCopy')" @click="copy(a.ip)">
          {{ a.ip }}<span class="addr-prefix">/{{ a.prefixLen }}</span>
        </button>
        <span class="addr-iface text-muted">{{ a.interface }}</span>
      </li>
    </ul>
  </NCard>
</template>

<style scoped>
.head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}
.all-toggle {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.75rem;
  font-weight: 400;
  cursor: pointer;
}
.loading {
  display: flex;
  justify-content: center;
  padding: 12px 0;
}
.addr-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.addr-list li {
  display: grid;
  grid-template-columns: 5.5rem 1fr auto;
  align-items: baseline;
  gap: 8px;
}
.addr-kind {
  font-size: 0.78rem;
  color: var(--text-muted);
}
.addr-ip {
  font-family: var(--font-mono);
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text);
  background: none;
  border: none;
  padding: 0;
  text-align: left;
  cursor: pointer;
}
.addr-ip:hover {
  color: var(--accent);
}
.addr-prefix {
  font-weight: 400;
  color: var(--text-muted);
}
.addr-iface {
  font-family: var(--font-mono);
  font-size: 0.72rem;
}
.empty-note {
  font-size: 0.82rem;
  margin: 0;
}
.text-muted {
  color: var(--text-muted);
}
</style>

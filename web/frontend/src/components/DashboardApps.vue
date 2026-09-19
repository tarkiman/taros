<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { NAlert, NButton, NForm, NFormItem, NIcon, NInput, NModal } from 'naive-ui'
import { ExternalLink, ImagePlus, Pencil } from '@lucide/vue'
import type { Container } from '../types/docker'
import { appMetaApi, type AppMeta } from '../api/appMeta'
import { ApiError } from '../api/client'
import { groupProjects, hueFor, type ProjectGroup } from '../utils/dockerProjects'

const props = defineProps<{ containers: Container[] }>()
const { t } = useI18n()

// Compose apps only — containers started by hand (project '') have no
// stable name to attach an icon to, and live under Docker > Aplikasi.
const groups = computed(() => groupProjects(props.containers).filter((g) => g.name !== ''))

const meta = ref<Record<string, AppMeta>>({})
async function loadMeta() {
  try {
    meta.value = (await appMetaApi.list()).apps ?? {}
  } catch {
    meta.value = {}
  }
}
onMounted(loadMeta)

// --- edit modal (same icon rules as Akses Cepat: URL or uploaded image) ---
const MAX_ICON_KB = 150
const modalShow = ref(false)
const editing = ref('')
const form = reactive({ icon: '', url: '' })
const formError = ref('')
const saving = ref(false)

function openEdit(g: ProjectGroup) {
  editing.value = g.name
  form.icon = meta.value[g.name]?.icon ?? ''
  form.url = meta.value[g.name]?.url ?? ''
  formError.value = ''
  modalShow.value = true
}

function onIconFile(e: Event) {
  const input = e.target as HTMLInputElement
  const file = input.files?.[0]
  input.value = ''
  if (!file) return
  if (file.size > MAX_ICON_KB * 1024) {
    formError.value = t('dashboard.iconTooLarge', { maxKb: MAX_ICON_KB })
    return
  }
  const reader = new FileReader()
  reader.onload = () => {
    form.icon = String(reader.result ?? '')
    formError.value = ''
  }
  reader.onerror = () => (formError.value = t('dashboard.iconReadFailed'))
  reader.readAsDataURL(file)
}

async function save() {
  saving.value = true
  formError.value = ''
  try {
    await appMetaApi.set(editing.value, { icon: form.icon.trim(), url: form.url.trim() })
    modalShow.value = false
    await loadMeta()
  } catch (e) {
    formError.value = e instanceof ApiError ? e.message : t('dashboard.apps.saveFailed')
  } finally {
    saving.value = false
  }
}

function resetToDefault() {
  form.icon = ''
  form.url = ''
}

const initial = (name: string) => (name.match(/[a-z0-9]/i)?.[0] ?? '?').toUpperCase()
const avatarStyle = (name: string) => ({
  background: `hsl(${hueFor(name)} 55% 45% / 0.18)`,
  color: `hsl(${hueFor(name)} 60% 55%)`,
})
const dotClass = (g: ProjectGroup) => `dot dot--${g.verdict}`
</script>

<template>
  <div v-if="groups.length > 0" class="apps-grid">
    <RouterLink
      v-for="g in groups"
      :key="g.name"
      :to="{ path: '/docker', query: { tab: 'apps', app: g.name } }"
      class="glass-card app-tile"
      :class="`app-tile--${g.verdict}`"
      :title="g.name"
    >
      <span class="app-icon" :style="meta[g.name]?.icon ? undefined : avatarStyle(g.name)">
        <img v-if="meta[g.name]?.icon" :src="meta[g.name].icon" alt="" class="app-icon-img" />
        <span v-else class="app-initial">{{ initial(g.name) }}</span>
        <span :class="dotClass(g)" />
      </span>
      <span class="app-name">{{ g.name }}</span>
      <span class="app-count" :title="t('docker.apps.runningOf', { running: g.running, total: g.containers.length })">{{ g.running }}/{{ g.containers.length }}</span>

      <span class="tile-actions">
        <a
          v-if="meta[g.name]?.url"
          :href="meta[g.name].url"
          target="_blank"
          rel="noopener noreferrer"
          class="tile-action-btn"
          :title="t('dashboard.apps.openApp')"
          @click.stop
        >
          <NIcon :component="ExternalLink" size="13" />
        </a>
        <button type="button" class="tile-action-btn" :title="t('common.edit')" @click.prevent.stop="openEdit(g)">
          <NIcon :component="Pencil" size="13" />
        </button>
      </span>
    </RouterLink>
  </div>

  <NModal v-model:show="modalShow" preset="dialog" :title="t('dashboard.apps.editTitle', { name: editing })" style="width: 440px">
    <NForm label-placement="top" style="margin-top: 4px">
      <NFormItem :label="t('dashboard.apps.urlLabel')">
        <NInput v-model:value="form.url" placeholder="https://app.example.com" @keyup.enter="save" />
      </NFormItem>
      <NFormItem :label="t('dashboard.iconOptional')">
        <div class="icon-field">
          <div class="icon-preview" :style="form.icon ? undefined : avatarStyle(editing)">
            <img v-if="form.icon" :src="form.icon" alt="" />
            <span v-else class="app-initial">{{ initial(editing) }}</span>
          </div>
          <div class="icon-controls">
            <NInput v-model:value="form.icon" :placeholder="t('dashboard.iconPlaceholder')" size="small" />
            <div class="icon-actions">
              <label class="icon-upload-btn">
                <NIcon :component="ImagePlus" size="13" /> {{ t('dashboard.uploadImage') }}
                <input type="file" accept="image/*" hidden @change="onIconFile" />
              </label>
              <button type="button" class="icon-upload-btn reset" @click="resetToDefault">{{ t('dashboard.apps.resetDefault') }}</button>
            </div>
          </div>
        </div>
      </NFormItem>
    </NForm>
    <NAlert v-if="formError" type="error" :title="formError" style="margin-top: 4px" />
    <template #action>
      <NButton quaternary @click="modalShow = false">{{ t('common.cancel') }}</NButton>
      <NButton type="primary" :loading="saving" @click="save">{{ t('common.save') }}</NButton>
    </template>
  </NModal>
</template>

<style scoped>
.apps-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
  gap: 12px;
}
.glass-card {
  background: var(--glass);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-xl);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}
.app-tile {
  position: relative;
  padding: 18px 10px 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  text-decoration: none;
  color: inherit;
  transition: transform 0.18s ease, border-color 0.18s ease;
}
.app-tile:hover { transform: translateY(-3px); border-color: var(--accent); }
.app-tile:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
.app-tile--danger { border-color: var(--danger); }
.app-tile--warn { border-color: var(--warning); }
.app-icon {
  position: relative;
  width: 46px;
  height: 46px;
  border-radius: 14px;
  display: grid;
  place-items: center;
  background: var(--accent-soft);
}
.app-icon-img { width: 100%; height: 100%; object-fit: cover; border-radius: 14px; }
.app-initial { font-weight: 700; font-size: 1.15rem; }
.dot {
  position: absolute;
  right: -3px;
  bottom: -3px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid var(--surface);
}
.dot--ok { background: var(--success); }
.dot--warn { background: var(--warning); }
.dot--danger { background: var(--danger); }
.dot--stopped { background: var(--text-faint); }
.app-name {
  font-size: 0.8rem;
  font-weight: 600;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.app-count { font-size: 0.72rem; color: var(--text-muted); font-family: var(--font-mono); }
.tile-actions {
  position: absolute;
  top: 6px;
  right: 6px;
  display: flex;
  gap: 4px;
  opacity: 0;
  transition: opacity 0.15s ease;
}
.app-tile:hover .tile-actions, .app-tile:focus-within .tile-actions { opacity: 1; }
.tile-action-btn {
  width: 22px;
  height: 22px;
  display: grid;
  place-items: center;
  border: none;
  border-radius: 7px;
  background: var(--glass-strong);
  color: var(--text-muted);
  cursor: pointer;
}
.tile-action-btn:hover { color: var(--text); background: var(--track); }

.icon-field { display: flex; align-items: center; gap: 10px; width: 100%; }
.icon-preview {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  border-radius: 11px;
  display: grid;
  place-items: center;
  background: var(--track);
  overflow: hidden;
}
.icon-preview img { width: 100%; height: 100%; object-fit: cover; }
.icon-controls { flex: 1; display: flex; flex-direction: column; gap: 6px; min-width: 0; }
.icon-actions { display: flex; gap: 14px; }
.icon-upload-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 0.76rem;
  font-weight: 600;
  color: var(--accent);
  cursor: pointer;
  background: none;
  border: none;
  padding: 2px 0;
}
.icon-upload-btn:hover { text-decoration: underline; }
.icon-upload-btn.reset { color: var(--text-muted); }
</style>

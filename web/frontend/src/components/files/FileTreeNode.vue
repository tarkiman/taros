<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { NIcon, NSpin } from 'naive-ui'
import { ChevronRight, ChevronDown, Folder, FolderOpen } from '@lucide/vue'
import type { TreeNode } from './tree'

defineOptions({ name: 'FileTreeNode' })

const { t } = useI18n()

defineProps<{
  node: TreeNode
  activePath: string
  depth: number
}>()
const emit = defineEmits<{
  toggle: [node: TreeNode]
  navigate: [path: string]
}>()
</script>

<template>
  <div class="tree-node">
    <div class="tree-row" :class="{ active: node.path === activePath }">
      <button
        type="button"
        class="tree-toggle"
        :style="{ marginLeft: `${depth * 14}px` }"
        :aria-label="node.expanded ? t('fileTree.collapseFolder') : t('fileTree.expandFolder')"
        @click="emit('toggle', node)"
      >
        <NSpin v-if="node.loading" :size="12" />
        <NIcon v-else :component="node.expanded ? ChevronDown : ChevronRight" size="14" />
      </button>
      <button type="button" class="tree-label" :title="node.path" @click="emit('navigate', node.path)">
        <NIcon :component="node.expanded ? FolderOpen : Folder" size="15" class="tree-icon" />
        <span class="tree-name">{{ node.name }}</span>
      </button>
    </div>
    <div v-if="node.expanded && node.children" class="tree-children">
      <FileTreeNode
        v-for="child in node.children"
        :key="child.path"
        :node="child"
        :active-path="activePath"
        :depth="depth + 1"
        @toggle="emit('toggle', $event)"
        @navigate="emit('navigate', $event)"
      />
      <p v-if="node.children.length === 0" class="tree-empty" :style="{ marginLeft: `${(depth + 1) * 14 + 22}px` }">
        {{ t('fileTree.empty') }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.tree-row {
  display: flex;
  align-items: center;
  border-radius: var(--radius-sm);
  transition: background var(--transition-fast);
}
.tree-row:hover {
  background: var(--track);
}
.tree-row.active {
  background: var(--accent-soft);
}
.tree-row.active .tree-name {
  color: var(--accent);
  font-weight: 600;
}

.tree-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 28px;
  flex-shrink: 0;
  background: none;
  border: none;
  color: var(--text-faint);
  cursor: pointer;
}
.tree-toggle:hover {
  color: var(--text);
}

.tree-label {
  display: flex;
  align-items: center;
  gap: 6px;
  flex: 1;
  min-width: 0;
  height: 28px;
  padding: 0 8px 0 2px;
  background: none;
  border: none;
  color: var(--text);
  font-size: 0.84rem;
  text-align: left;
  cursor: pointer;
}
.tree-icon {
  flex-shrink: 0;
  color: var(--text-muted);
}
.tree-row.active .tree-icon {
  color: var(--accent);
}
.tree-name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.tree-empty {
  margin: 2px 0;
  font-size: 0.78rem;
  color: var(--text-faint);
}
</style>

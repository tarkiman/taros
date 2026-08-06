<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { NSpin } from 'naive-ui'
import { filesApi } from '../../api/files'
import FileTreeNode from './FileTreeNode.vue'
import type { TreeNode } from './tree'

const props = defineProps<{ activePath: string }>()
const emit = defineEmits<{ navigate: [path: string] }>()

const root = ref<TreeNode | null>(null)
const rootLoading = ref(true)

function makeNode(name: string, path: string): TreeNode {
  return { name, path, children: null, loading: false, expanded: false }
}

function joinPath(base: string, name: string) {
  return `${base}/${name}`.replace(/\/+/g, '/')
}

async function loadChildren(node: TreeNode) {
  node.loading = true
  try {
    const res = await filesApi.list(node.path)
    node.children = res.entries
      .filter((e) => e.isDir)
      .map((e) => makeNode(e.name, joinPath(res.currentPath, e.name)))
  } catch {
    // Permission denied / vanished mid-browse — show as an empty,
    // non-expandable branch rather than breaking the whole tree.
    node.children = []
  } finally {
    node.loading = false
  }
}

async function toggleNode(node: TreeNode) {
  if (node.children === null) await loadChildren(node)
  node.expanded = !node.expanded
}

// Walks from root toward activePath, loading + expanding each ancestor so
// the folder currently open in the main view is already visible in the
// sidebar — same "reveal in tree" behavior most file managers/IDEs have,
// rather than leaving the user to click their way down manually.
async function expandToActivePath() {
  const r = root.value
  if (!r || !props.activePath) return
  if (props.activePath !== r.path && !props.activePath.startsWith(r.path + '/')) return
  const rel = props.activePath.slice(r.path.length).replace(/^\/+/, '')
  if (!rel) return

  let current = r
  for (const seg of rel.split('/')) {
    if (current.children === null) await loadChildren(current)
    const next = current.children?.find((c) => c.name === seg)
    if (!next) return
    current.expanded = true
    current = next
  }
}

async function loadRoot() {
  rootLoading.value = true
  try {
    const res = await filesApi.list('')
    const segments = res.currentPath.split('/').filter(Boolean)
    const label = segments.length > 0 ? segments[segments.length - 1] : '/'
    const node = makeNode(label, res.currentPath)
    node.expanded = true
    root.value = node
    await loadChildren(node)
    await expandToActivePath()
  } finally {
    rootLoading.value = false
  }
}

watch(() => props.activePath, expandToActivePath)
onMounted(loadRoot)
</script>

<template>
  <div class="file-tree">
    <div v-if="rootLoading" class="tree-loading"><NSpin size="small" /></div>
    <FileTreeNode
      v-else-if="root"
      :node="root"
      :active-path="activePath"
      :depth="0"
      @toggle="toggleNode"
      @navigate="(p: string) => emit('navigate', p)"
    />
  </div>
</template>

<style scoped>
.file-tree {
  padding: 4px;
  overflow-y: auto;
  overflow-x: hidden;
}
.tree-loading {
  display: flex;
  justify-content: center;
  padding: 20px 0;
}
</style>

// Shared shape between FileTree.vue (fetch/state owner) and the recursive
// FileTreeNode.vue — kept out of either component so both can import the
// same type without one owning it.
export interface TreeNode {
  name: string
  path: string
  // null = not fetched yet (distinct from an empty array, which means
  // "fetched, this folder has no subfolders").
  children: TreeNode[] | null
  loading: boolean
  expanded: boolean
}

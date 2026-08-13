import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

// Only routes migrated to Vue live here. All pages are now migrated (see
// docs/10-roadmap.md Fase UI/UX) — this comment stays as the pattern to
// follow for any future new page.
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/login', name: 'login', component: () => import('../views/LoginView.vue') },
    { path: '/', name: 'dashboard', component: () => import('../views/DashboardView.vue') },
    { path: '/docker', name: 'docker', component: () => import('../views/DockerView.vue') },
    { path: '/services', name: 'services', component: () => import('../views/ServiceView.vue') },
    { path: '/processes', name: 'processes', component: () => import('../views/ProcessesView.vue') },
    { path: '/files', name: 'files', component: () => import('../views/FilesView.vue') },
    { path: '/files/edit', name: 'files-edit', component: () => import('../views/EditorView.vue') },
    { path: '/terminal', name: 'terminal', component: () => import('../views/TerminalView.vue') },
    { path: '/disk-analysis', name: 'disk-analysis', component: () => import('../views/DiskAnalysisView.vue') },
    { path: '/settings', name: 'settings', component: () => import('../views/SettingsView.vue') },
  ],
})

router.beforeEach(async (to) => {
  const auth = useAuthStore()
  if (!auth.ready) await auth.hydrate()

  if (to.name !== 'login' && !auth.authenticated) {
    return { name: 'login', query: { next: to.fullPath } }
  }
  if (to.name === 'login' && auth.authenticated) {
    return { name: 'dashboard' }
  }
  return true
})

export default router

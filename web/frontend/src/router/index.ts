import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

// Only routes migrated to Vue live here. Docker/Service/Files/Editor are
// still server-rendered (htmx) during the phased migration — the sidebar
// links to those with a plain <a href>, a full page load, not a
// router-link, until each gets its own phase. See docs/10-roadmap.md.
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/login', name: 'login', component: () => import('../views/LoginView.vue') },
    { path: '/', name: 'dashboard', component: () => import('../views/DashboardView.vue') },
    { path: '/docker', name: 'docker', component: () => import('../views/DockerView.vue') },
    { path: '/services', name: 'services', component: () => import('../views/ServiceView.vue') },
    { path: '/files', name: 'files', component: () => import('../views/FilesView.vue') },
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

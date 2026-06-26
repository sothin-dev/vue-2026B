import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'menu',
      component: () => import('../views/MenuView.vue'),
    },
    {
      path: '/order',
      name: 'order',
      component: () => import('../views/OrderView.vue'),
    },
    {
      path: '/tables',
      name: 'tables',
      component: () => import('../views/TableView.vue'),
    },
    {
      path: '/history',
      name: 'history',
      component: () => import('../views/OrderHistory.vue'),
    },
  ],
})

export default router

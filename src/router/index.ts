import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/posts/:id',
      name: 'post-detail',
      component: () => import('@/views/PostDetailView.vue'),
      props: true,
    },
    {
      path: '/posts/create',
      name: 'create-post',
      component: () => import('@/views/CreatePostView.vue'),
      // Protected: requires authentication
      beforeEnter: requireAuth,
    },
    {
      path: '/posts/:id/edit',
      name: 'edit-post',
      component: () => import('@/views/EditPostView.vue'),
      props: true,
      // Protected: requires authentication
      beforeEnter: requireAuth,
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('@/views/UsersView.vue'),
    },
    {
      path: '/users/:id',
      name: 'user-detail',
      component: () => import('@/views/UserDetailView.vue'),
      props: true,
    },
  ],
})

/**
 * Navigation guard that redirects to home if user is not authenticated.
 * Used for Create and Edit post routes.
 */
function requireAuth() {
  const auth = useAuthStore()
  if (!auth.isAuthenticated) {
    return { name: 'home' }
  }
}

export default router

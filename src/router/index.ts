import { createRouter, createWebHistory } from 'vue-router'
import CounterExercise from '@/components/CounterExercise.vue'
import UserExercise from '@/components/UserExercise.vue'
import TodoExercise from '@/components/TodoExercise.vue'
import ShoppingCartExercise from '@/components/ShoppingCartExercise.vue'
import ThemeExercise from '@/components/ThemeExercise.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/counter' },
    { path: '/counter', name: 'Counter', component: CounterExercise },
    { path: '/user', name: 'User', component: UserExercise },
    { path: '/todo', name: 'Todo', component: TodoExercise },
    { path: '/cart', name: 'Cart', component: ShoppingCartExercise },
    { path: '/theme', name: 'Theme', component: ThemeExercise },
  ],
})

export default router

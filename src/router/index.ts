import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import AboutPage from '@/views/AboutPage.vue'
import ProjectPage from '@/views/ProjectPage.vue'


const routes: any = [
  {
    name: "Home",
    path: "/",
    component: HomePage,
  },
  {
    name: "About",
    path: "/about",
    component: AboutPage,
  },
  {
    name: "Project",
    path: "/project",
    component: ProjectPage,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

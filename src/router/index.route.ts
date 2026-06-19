import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import MovieView from "../views/MovieView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/movies",
    name: "movies",
    component: MovieView,
  },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});


export default router;
import HomePage from "@/Views/HomePage.vue"
import NotFound from "@/Views/NotFound.vue"

export const routes = [
    {
        name: "home-page",
        path: "/",
        component: HomePage,
    },
    {
        name: "not-found",
        path: "/:pathMatch(.*)*",
        component: NotFound,
    }
]
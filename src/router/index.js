import { createRouter, createWebHistory } from "vue-router";

//const Header = () => import("../components/Headers/Header.vue");

/* const routes = [
  { path: "/", name: "home", component: Header },
  { path: "/sutom", name: "sutom", component: Header },
  { path: "/tusmo", name: "tusmo", component: HeaderTusmo },
  { path: "/wordle", name: "wordle", component: HeaderWordle },
]; */

const routes = [
  {
    path: "/",
    redirect: "/sutom",
  },
  {
    path: "/sutom",
    name: "sutom",
    component: () => import("../components/Headers/AppHeader.vue"),
    meta: {
      game: "sutom",
      title: "Solvami- Sutom",
    },
  },
  {
    path: "/tusmo",
    name: "tusmo",
    component: () => import("../components/Headers/AppHeader.vue"),
    meta: {
      game: "tusmo",
      title: "Solvami - Tusmo",
    },
  },
  {
    path: "/wordle",
    name: "wordle",
    component: () => import("../components/Headers/AppHeader.vue"),
    meta: {
      game: "wordle",
      title: "Solvami - Wordle",
    },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  //history: createWebHistory("/solvami/"),
  routes,
});

router.afterEach((to) => {
  document.title = to.meta.title || "Solvami";
});

export default router;

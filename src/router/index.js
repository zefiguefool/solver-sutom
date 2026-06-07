import { createRouter, createWebHistory } from "vue-router";

const Header = () => import("../components/Header/Header.vue");
const HeaderWordle = () =>
  import("../components/HeaderWordle/HeaderWordle.vue");
const HeaderTusmo = () => import("../components/HeaderTusmo/HeaderTusmo.vue");

const routes = [
  { path: "/solvami", name: "/", component: Header },
  { path: "/solvami/sutom", name: "sutom", component: Header },
  { path: "/solvami/tusmo", name: "tusmo", component: HeaderTusmo },
  { path: "/solvami/wordle", name: "wordle", component: HeaderWordle },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});

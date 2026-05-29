const Header = () => import("./components/Header/Header.vue");

const HeaderWordle = () => import("./components/HeaderWordle/HeaderWordle.vue");

const HeaderTusmo = () => import("./components/HeaderTusmo/HeaderTusmo.vue");

export default [
  { path: "/solvami", component: Header },
  { path: "/solvami/sutom", component: Header },
  { path: "/solvami/tusmo", component: HeaderTusmo },
  { path: "/solvami/wordle", component: HeaderWordle },
];

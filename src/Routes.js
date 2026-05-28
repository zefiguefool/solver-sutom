import Header from "./components/Header/Header";
import HeaderWordle from "./components/HeaderWordle/HeaderWordle";
import HeaderTusmo from "./components/HeaderTusmo/HeaderTusmo.vue";

export default [
  { path: "/solvami", component: Header },
  { path: "/solvami/sutom", component: Header },
  { path: "/solvami/tusmo", component: HeaderTusmo },
  { path: "/solvami/wordle", component: HeaderWordle },
];

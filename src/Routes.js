import Header from "./components/Header/Header";
import HeaderWordle from "./components/HeaderWordle/HeaderWordle";
import HeaderTusmo from "./components/HeaderTusmo/HeaderTusmo.vue";

export default [
  { path: "/", component: Header },
  { path: "/sutom", component: Header },
  { path: "/tusmo", component: HeaderTusmo },
  { path: "/wordle", component: HeaderWordle },
];

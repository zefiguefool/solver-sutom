import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";

import "bootstrap/dist/css/bootstrap.min.css";
//import "./css/globals.css";

//import VueRouter from 'https://unpkg.com/vue-router/dist/vue-router.js'
createApp(App).use(router).mount("#app");

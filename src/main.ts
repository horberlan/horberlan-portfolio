import "./assets/main.scss";

import App from "./App.vue";
import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router";
import { VueQueryPlugin } from "@tanstack/vue-query";
import "highlight.js/lib/common";
import hljsVuePlugin from "@highlightjs/vue-plugin";

const app = createApp(App);

app.use(createPinia());
app.use(hljsVuePlugin);
app.use(VueQueryPlugin);
app.use(router);

app.mount("#app");

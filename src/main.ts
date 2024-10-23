import "./assets/main.scss";

import App from "./App.vue";
import { Quasar } from "quasar";
// import VueCodeHighlight from "vue-code-highlight";
import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router";
import { VueQueryPlugin } from "@tanstack/vue-query";
import "highlight.js/styles/stackoverflow-dark.css";
import "highlight.js/lib/common";
import hljsVuePlugin from "@highlightjs/vue-plugin";
const app = createApp(App);

app.use(createPinia());
app.use(hljsVuePlugin);
app.use(Quasar, {
  plugins: {},
});
app.use(VueQueryPlugin);
app.use(router);

app.mount("#app");

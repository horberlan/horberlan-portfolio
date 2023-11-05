import "./assets/main.css";

import App from "./App.vue";
import { Quasar } from "quasar";
import VueCodeHighlight from "vue-code-highlight";
import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router";
import { VueQueryPlugin } from "@tanstack/vue-query";

const app = createApp(App);

app.use(createPinia());
app.use(VueCodeHighlight);
app.use(Quasar, {
  plugins: {},
});
app.use(VueQueryPlugin);
app.use(router);

app.mount("#app");

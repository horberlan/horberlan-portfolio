import "./assets/main.css";

import App from "./App.vue";
import { Quasar } from "quasar";
import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(Quasar, {
  plugins: {}, // import Quasar plugins and add here
});
app.use(router);

app.mount("#app");

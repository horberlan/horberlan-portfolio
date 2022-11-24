import { createRouter, createWebHistory } from "vue-router";

import AboutViewVue from "@/views/about/AboutView.vue";
import IndexHomeVue from "@/views/home/IndexHome.vue";
import ProjectView from "@/views/projects/ProjectView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: IndexHomeVue,
    },
    {
      path: "/about",
      name: "about",
      component: AboutViewVue,
    },
    {
      path: "/projects",
      name: "project",
      component: ProjectView,
    },
  ],
});

export default router;

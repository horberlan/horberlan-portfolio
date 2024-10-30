import { createRouter, createWebHistory } from "vue-router";

import AboutView from "@/views/about/AboutView.vue";
import ContactView from "@/views/contact/ContactView.vue";
import HomeView from "@/views/home/IndexHome.vue";
import ProjectView from "@/views/projects/ProjectView.vue";

const router = createRouter({
  history: createWebHistory(), // import.meta.env.BASE_URL
  routes: [
    {
      path: "/",
      name: "",
      component: HomeView,
    },
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      component: AboutView,
    },
    {
      path: "/projects",
      name: "project",
      component: ProjectView,
    },
    {
      path: "/contact",
      name: "contact",
      component: ContactView,
    },
  ],
});

export default router;

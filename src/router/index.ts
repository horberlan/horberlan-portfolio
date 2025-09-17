import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(), // import.meta.env.BASE_URL
  routes: [
    {
      path: "/",
      name: "home",
      component: import("@/views/home/HomeView.vue"),
    },
    {
      path: "/about",
      name: "about",
      component: import("@/views/about/AboutView.vue"),
    },
    {
      path: "/projects",
      name: "project",
      component: import("@/views/projects/ProjectView.vue"),
    },
    {
      path: "/projects/[inside]/:name",
      component: import("@/views/projects/InternProjects.vue"),
    },
    {
      path: "/contact",
      name: "contact",
      component: import("@/views/contact/ContactView.vue"),
    },
  ],
});

export default router;

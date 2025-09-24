import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/home/HomeView.vue"),
    },
    {
      path: "/about",
      name: "about",
      component: () => import("@/views/about/AboutView.vue"),
    },
    {
      path: "/projects",
      name: "projects",
      component: () => import("@/views/projects/ProjectView.vue"),
    },
    {
      path: "/projects/:projectName",
      name: "project-simple",
      component: () => import("@/views/projects/InternProjects.vue"),
      beforeEnter: (to, from, next) => {
        if (to.params.projectName && !to.params.projectName.includes("/")) {
          next();
        } else {
          next("/projects");
        }
      },
    },
    {
      path: "/projects/:inside/:name",
      name: "project-detail",
      component: () => import("@/views/projects/InternProjects.vue"),
      beforeEnter: (to, from, next) => {
        if (to.params.inside && to.params.name) {
          next();
        } else {
          next("/projects");
        }
      },
    },
    {
      path: "/contact",
      name: "contact",
      component: () => import("@/views/contact/ContactView.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: () => import("@/views/NotFound.vue"),
    },
  ],
});

export default router;

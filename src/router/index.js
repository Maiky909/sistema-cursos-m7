import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"), // Lazy loading de la vista Home
  },
  {
    path: "/admin",
    name: "Admin",
    component: () => import("../views/Admin.vue"), // Lazy loading de la vista Admin
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

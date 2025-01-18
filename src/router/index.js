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
  {
    path: "/admin/editar-curso/:id",
    name: "EditarCurso",
    component: () => import("../views/EditarCurso.vue"), // Lazy loading de la vista Admin Editar Curso
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

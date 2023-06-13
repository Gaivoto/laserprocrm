import {
  createRouter,
  createWebHistory
} from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/dashboard",
      component: () => import("@/layouts/main-layout/MainLayout.vue"),
      children: [
        {
          path: "/dashboard",
          name: "dashboard",
          component: () => import("@/views/Dashboard.vue"),
          meta: {
            pageTitle: "Dashboard",
            breadcrumbs: ["Dashboards"],
          },
        },
        {
          path: "/fornecedores",
          name: "fornecedores",
          component: () => import("@/views/Fornecedores.vue"),
          meta: {
            pageTitle: "Fornecedores",
            breadcrumbs: ["Fornecedores"],
          },
        },
        {
          path: "/materiais",
          name: "materiais",
          component: () => import("@/views/Materiais.vue"),
          meta: {
            pageTitle: "Materiais",
            breadcrumbs: ["Materiais"],
          },
        },
        {
          path: "/compras",
          name: "compras",
          component: () => import("@/views/Compras.vue"),
          meta: {
            pageTitle: "Compras",
            breadcrumbs: ["Compras"],
          },
        },
        {
          path: "/utilizadores",
          name: "utilizadores",
          component: () => import("@/views/Utilizadores.vue"),
          meta: {
            pageTitle: "Utilizadores",
            breadcrumbs: ["Utilizadores"],
          },
        }
      ],
    },
    {
      path: "/",
      component: () => import("@/layouts/AuthLayout.vue"),
      children: [
        {
          path: "/login",
          name: "login",
          component: () =>
            import("@/views/Login.vue"),
          meta: {
            pageTitle: "Login",
          },
        },
      ],
    },
    {
      path: "/",
      component: () => import("@/layouts/SystemLayout.vue"),
      children: [
        {
          // the 404 route, when none of the above matches
          path: "/404",
          name: "404",
          component: () => import("@/views/errors/Error404.vue"),
          meta: {
            pageTitle: "Error 404",
          },
        },
        {
          path: "/500",
          name: "500",
          component: () => import("@/views/errors/Error500.vue"),
          meta: {
            pageTitle: "Error 500",
          },
        },
      ],
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: "/404",
    }
  ]
});

export default router;

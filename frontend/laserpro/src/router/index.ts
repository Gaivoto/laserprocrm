import {
  createRouter,
  createWebHistory,
  RouterView
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
        },
        {
          path: "/apps/subscriptions/subscription-list",
          name: "apps-subscriptions-subscription-list",
          component: () =>
            import("@/views/apps/subscriptions/SubscriptionList.vue"),
          meta: {
            pageTitle: "Getting Started",
            breadcrumbs: ["Apps", "Subscriptions"],
          },
        },
        {
          path: "/crafted/widgets/charts",
          name: "widgets-charts",
          component: () => import("@/views/crafted/widgets/Charts.vue"),
          meta: {
            pageTitle: "Charts",
            breadcrumbs: ["Crafted", "Widgets"],
          },
        },
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
    },/*
    {
      path: "/multi-step-sign-up",
      name: "multi-step-sign-up",
      component: () =>
        import("@/views/crafted/authentication/MultiStepSignUp.vue"),
      meta: {
        pageTitle: "Multi-step Sign up",
      },
    },*/
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
/*
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const configStore = useConfigStore();

  // current page view title
  document.title = `${to.meta.pageTitle} - ${import.meta.env.VITE_APP_NAME}`;

  // reset config to initial state
  configStore.resetLayoutConfig();

  // verify auth token before each page change
  authStore.verifyAuth();

  // before page access check if page requires authentication
  if (to.meta.middleware == "auth") {
    if (authStore.isAuthenticated) {
      next();
    } else {
      next({ name: "sign-in" });
    }
  } else {
    next();
  }

  // Scroll page to top on every route change
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
});*/

export default router;

import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Login from "@/views/Login.vue";
import DashboardView from "@/views/DashboardView.vue";
import diagnosticRoutes from "@/modules/website-diagnostic-tool/router";

// Define Routes
const routes: Array<RouteRecordRaw> = [
  { path: "/", name: "Login", component: Login },
  {
    path: "/overview",
    name: "Overview",
    component: DashboardView,
    meta: { requiresAuth: true },
  },
  {
    path: "/clients",
    name: "Clients",
    component: () =>
      import(
        /* webpackChunkName: "users-placeholder" */ "@/views/ClientsView.vue"
      ),
    meta: { requiresAuth: true },
  },
  // {
  //   path: "/tasks",
  //   name: "Tasks",
  //   component: Tasks,
  //   meta: { requiresAuth: true },
  // },
  {
    path: "/task-dashboard",
    name: "TaskDashboard",
    component: () =>
      import(
        /* webpackChunkName: "task-dashboard" */ "@/views/TaskDashboard.vue"
      ),
    meta: { requiresAuth: true },
  },

  {
    path: "/tasks/:status",
    name: "TaskTableView",
    component: () => import("@/views/TaskTableView.vue"),
    meta: { requiresAuth: true },
    props: true,
  },

  // Lazy-loaded Apps Section
  {
    path: "/apps/wp-dashboard",
    name: "WpDashboard",
    component: () =>
      import(
        /* webpackChunkName: "wp-dashboard" */ "@/modules/wp-dashboard/App.vue"
      ),
    meta: { requiresAuth: true },
  },
  {
    path: "/apps/forms-datapoint",
    name: "FormsDataPoint",
    component: () =>
      import(
        /* webpackChunkName: "forms-datapoint" */ "@/modules/forms-datapoint/App.vue"
      ),
    meta: { requiresAuth: true },
  },
  {
    path: "/apps/request-form",
    name: "RequestForm",
    component: () =>
      import(
        /* webpackChunkName: "request-form" */ "@/modules/request-form/App.vue"
      ),
    meta: { requiresAuth: true },
  },

  // Communication Section
  {
    path: "/communication/chat",
    name: "ChatTool",
    component: () =>
      import(/* webpackChunkName: "chat-tool" */ "@/modules/chat/App.vue"),
    meta: { requiresAuth: true },
  },

  // Operations Section
  {
    path: "/operations/task",
    name: "TaskManagement",
    component: () =>
      import(
        /* webpackChunkName: "task-management" */ "@/modules/task/App.vue"
      ),
    meta: { requiresAuth: true },
  },
  {
    path: "/operations/job-scheduling",
    name: "JobScheduling",
    component: () =>
      import(
        /* webpackChunkName: "job-scheduling" */ "@/modules/job-scheduling/App.vue"
      ),
    meta: { requiresAuth: true },
  },

  // Placeholder Route for New Application
  {
    path: "/new-application",
    name: "New Application",
    component: () =>
      import(
        /* webpackChunkName: "new-application-placeholder" */ "@/views/NewApplication.vue"
      ),
  },
  ...diagnosticRoutes,

  // // Not Found Page
  // {
  //   path: "/404",
  //   name: "NotFound",
  //   component: () =>
  //     import(/* webpackChunkName: "not-found" */ "@/views/NotFound.vue"),
  // },
  { path: "/:pathMatch(.*)*", redirect: "/404" },
];

// Create Router Instance
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Add Navigation Guards
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  // const isAuthenticated = localStorage.getItem("token"); // Example Auth Check

  // Check meta.requiresAuth for protected routes
  // if (to.meta.requiresAuth && !isAuthenticated) {
  //   next("/");
  // } else {
  //   next();
  // }

  if (to.meta.requiresAuth && !token) {
    return next("/");
  }
  // Otherwise, allow navigation
  next();
});

export default router;

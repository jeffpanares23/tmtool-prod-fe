const diagnosticRoutes = [
  {
    path: "/operations/website-diagnostic",
    name: "DiagnosticDashboard",
    component: () => import("./views/DashboardView.vue"),
  },
  {
    path: "/operations/website-diagnostic/report",
    name: "DiagnosticReport",
    component: () => import("./views/ReportView.vue"),
  },
];

export default diagnosticRoutes;

# dm-suite-v1-fe

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Run your end-to-end tests
```
npm run test:e2e
```

### Lints and fixes files
```
npm run lint
```

### Run db.json for temporary static dashboard data
```
npx json-server --watch db.json --port 3000
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### Project Folder Structure
Organize the project for scalability:

src/
├── assets/            # Shared assets (images, fonts, etc.)
├── components/        # Reusable components (buttons, forms, etc.)
├── layouts/           # Common layouts (e.g., MainLayout, AuthLayout)
├── modules/           # Reserved for child systems
│   ├── child-tool-1/  # Placeholder for child tools
│   └── child-tool-2/
├── router/            # Vue Router configuration
├── store/             # Vuex or Pinia (for shared state management)
├── views/             # Parent system views (Dashboard, Login, etc.)
└── App.vue            # Root component

### Type to teminal to fix eslint errors automatically
npm run lint -- --fix


UPDATED SYSTEM STRUCTURE - ALL PLACEHOLDER CHILD SYSTEMS INCLUDED (TOOLS/APPS) PROPERLY ORGANIZED:

src/
├── modules/
│   ├── wp-dashboard/
│   │   └── App.vue          # WP Dashboard entry point
│   ├── forms-datapoint/
│   │   └── App.vue          # Forms DataPoint entry point
│   ├── request-form/
│   │   └── App.vue          # Request Form entry point
│   ├── chat/
│   │   └── App.vue          # Chat tool entry point
│   ├── task/
│   │   └── App.vue          # Task Management entry point
│   ├── job-scheduling/
│   │   └── App.vue          # Job Scheduling entry point
│   └── website-diagnostic-tool/
│       └── App.vue          # Website Diagnostic Tool entry point
├── router/
│   └── index.ts             # Router file (this file)
├── views/
│   ├── AboutView.vue        # About page view
│   ├── Dashboard.vue        # Main dashboard view
│   ├── HomeView.vue         # Home page view
│   ├── Login.vue            # Login view
│   └── Tasks.vue            # Tasks page view


## WEB DIAGNOSTIC TOOL STRUCTURE
website-diagnostic-tool/
  ├── components/
  │   ├── SubNavigation.vue
  │   ├── WebsiteInput.vue
  │   ├── ValidationResults.vue
  │   ├── ExportButtons.vue
  ├── views/
  │   ├── DashboardView.vue
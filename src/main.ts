import { createApp } from "vue";
import App from "./App.vue";
// import "./registerServiceWorker";
import router from "./router";
// import store from "./store";
import "./assets/styles.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";

// createApp(App).use(store).use(router).mount("#app");
const fontLink = document.createElement("link");
fontLink.rel = "stylesheet";
fontLink.href =
  "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap";
document.head.appendChild(fontLink);
createApp(App).use(router).mount("#app");

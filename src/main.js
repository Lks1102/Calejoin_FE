/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from "./App.vue";

// Composables
import { createApp } from "vue";

// Plugins
import { registerPlugins } from "@/plugins";
import router from "./router/index.js";
import { createPinia } from "pinia";

// Webfont
import "@/assets/fonts.css"
const Pinia = createPinia();
const app = createApp(App);



registerPlugins(app)
app.use(Pinia);
app.use(router);
app.mount("#app");

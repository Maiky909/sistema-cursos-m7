import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// Importar Bootstrap y Bootstrap Icons
import "bootstrap/dist/css/bootstrap.min.css"; // ✅ Estilos de Bootstrap
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // ✅ JS de Bootstrap para funcionalidad
import "bootstrap-icons/font/bootstrap-icons.css"; // ✅ Iconos de Bootstrap

const app = createApp(App);

app.use(router);
app.use(store);

app.mount("#app");

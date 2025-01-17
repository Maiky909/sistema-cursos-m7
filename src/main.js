import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// Importar Bootstrap y BootstrapVue
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import BootstrapVueNext from "bootstrap-vue-next";

const app = createApp(App);

app.use(router);
app.use(store);
app.use(BootstrapVueNext);

app.mount("#app");

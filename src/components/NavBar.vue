<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">
        <i class="bi bi-joystick"></i> Universidad de los Andes
      </a>

      <!-- Botón de colapso para pantallas pequeñas -->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Menú de navegación -->
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link
              v-if="$route.path !== '/'"
              to="/"
              class="nav-link active">
              <b> <i class="bi bi-house-door-fill"></i> Home</b>
            </router-link>
            <router-link
              v-if="$route.path !== '/admin'"
              to="/admin"
              class="nav-link active">
              <b> <i class="bi bi-house-door-fill"></i> Administración</b>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import router from "../router";

export default {
  name: "NavBar",
};
</script>

<style>
.navbar {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Sombra para darle profundidad */
  padding: 1rem 0;
}
</style>

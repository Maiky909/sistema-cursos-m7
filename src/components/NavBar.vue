<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-danger sticky-top">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">
        <i class="bi bi-backpack4-fill"></i> Universidad de los Andes
      </a>

      <!-- Botón para colapsar el menú en móviles -->
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
            <!-- Mostrar "Home" -->
            <router-link v-if="showMenu" to="/" class="nav-link active">
              <i class="bi bi-house-door-fill"></i> Home
            </router-link>

            <!-- Mostrar "Administración" -->
            <router-link v-if="!showMenu" to="/admin" class="nav-link active">
              <i class="bi bi-gear-fill"></i> Administración
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavBar",
  computed: {
    showMenu() {
      return (
        this.$route.path === "/admin" ||
        this.$route.path.startsWith("/admin/editar-curso/")
      );
    },
  },
};
</script>

<style scoped>
.navbar {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>

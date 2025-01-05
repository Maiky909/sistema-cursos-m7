<template>
  <div>
    <NavBar />
    <h1>Administración</h1>
    <p>Aquí se gestionarán los cursos.</p>
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";

export default {
  name: "Admin",
  components: { NavBar },
};
</script>

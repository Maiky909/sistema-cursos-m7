<template>
  <footer class="bg-dark text-white py-3 mt-auto">
    <div class="container text-center">
      <p class="mb-1">&copy; {{ annioActual }} Universidad de los Andes</p>
      <p class="mb-0">
        <a
          href="https://www.uandes.cl/"
          target="_blank"
          class="text-white text-decoration-none">
          Visita nuestro sitio web
        </a>
      </p>
      <p>
        <a href="#" class="text-white mx-2"><i class="bi bi-facebook"></i></a>
        <a href="#" class="text-white mx-2"><i class="bi bi-twitter"></i></a>
        <a href="#" class="text-white mx-2"><i class="bi bi-instagram"></i></a>
      </p>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      annioActual: new Date().getFullYear(),
    };
  },
};
</script>

<style scoped>
footer {
  position: relative;
  bottom: 0;
  width: 100%;
}
</style>

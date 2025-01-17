<template>
  <div>
    <h1>Todos los Cursos</h1>
    <div class="card-container">
      <CardCursos v-for="course in courses" :key="course.id" :course="course" />
    </div>
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import CardCursos from "../components/CardCursos.vue";
import { mapGetters } from "vuex";

export default {
  name: "Home",
  components: {
    NavBar,
    CardCursos,
  },
  computed: {
    ...mapGetters(["allCourses"]),
    courses() {
      return this.allCourses; // Accede al getter de Vuex
    },
  },
};
</script>

<style scoped>
.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
}
h1 {
  text-align: center;
  margin: 2rem 0;
}
</style>

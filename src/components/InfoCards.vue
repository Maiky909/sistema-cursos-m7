<template>
  <div class="container mt-4">
    <div class="row">
      <div
        v-for="(info, index) in infoCards"
        :key="index"
        class="col-md-12 mb-2">
        <div :class="['alert', info.color, 'd-flex align-items-center']">
          <i :class="['bi', info.icon, 'me-2']"></i>
          <span v-html="info.text"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "InfoCards",
  props: {
    totalCupos: Number,
    totalInscritos: Number,
    cuposRestantes: Number,
    cursosCompletados: Number,
    cursosActivos: Number,
    totalCursos: Number,
  },
  computed: {
    infoCards() {
      return [
        {
          text: `Cantidad total de alumnos permitidos: <strong>${this.totalCupos}</strong> alumnos.`,
          color: "alert-primary",
          icon: "bi-people-fill",
        },
        {
          text: `Cantidad total de alumnos inscritos: <strong>${this.totalInscritos}</strong> alumnos.`,
          color: "alert-info",
          icon: "bi-person-check-fill",
        },
        {
          text: `Cantidad total de cupos restantes: <strong>${this.cuposRestantes}</strong> alumnos.`,
          color: "alert-danger",
          icon: "bi-person-dash-fill",
        },
        {
          text: `Cantidad total de cursos terminados: <strong>${this.cursosCompletados}</strong> cursos.`,
          color: "alert-warning",
          icon: "bi-x-circle-fill",
        },
        {
          text: `Cantidad total de cursos activos: <strong>${this.cursosActivos}</strong> cursos.`,
          color: "alert-success",
          icon: "bi-check-circle-fill",
        },
        {
          text: `Cantidad total de cursos: <strong>${this.totalCursos}</strong> cursos.`,
          color: "alert-secondary",
          icon: "bi-journal-bookmark-fill",
        },
      ];
    },
  },
};
</script>

<style scoped>
.alert {
  border-radius: 10px;
  font-size: 1rem;
}
</style>

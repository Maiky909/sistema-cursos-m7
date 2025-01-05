<template>
  <div class="card">
    <img :src="course.img" alt="Imagen del curso" class="card-img" />
    <div class="card-body">
      <h2>{{ course.nombre }}</h2>
      <p>{{ course.descripcion }}</p>
      <p><strong>Costo:</strong> ${{ course.costo }}</p>
      <p><strong>Duración:</strong> {{ course.duracion }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "CourseCard",
  props: {
    course: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.card {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  width: 300px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.card-img {
  width: 100%;
  height: 150px;
  object-fit: cover;
}
.card-body {
  padding: 1rem;
}
.card-body h2 {
  font-size: 1.5rem;
  margin: 0 0 0.5rem;
}
.card-body p {
  margin: 0.5rem 0;
}
</style>

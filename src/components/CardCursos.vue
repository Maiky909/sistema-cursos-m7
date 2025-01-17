<template>
  <div class="col-lg-4 col-md-6 col-sm-12 d-flex align-items-stretch my-5">
    <div class="card shadow-lg border-0 w-100">
      <!-- Imagen del curso -->
      <div class="position-relative">
        <img
          :src="course.img"
          class="card-img-top rounded-top"
          alt="Imagen del curso" />
        <span
          class="badge bg-danger position-absolute top-0 start-0 m-2 px-3 py-2">
          {{ course.duracion }}
        </span>
      </div>

      <!-- Contenido de la Card -->
      <div class="card-body d-flex flex-column">
        <h5 class="card-title text-center fw-bold text-dark">
          {{ course.nombre }}
        </h5>

        <div class="text-center mb-2">
          <span class="badge bg-success px-3 py-1">
            Costo: ${{ course.costo }}
          </span>
        </div>

        <ul class="list-group list-group-flush my-3">
          <li
            class="list-group-item d-flex justify-content-between align-items-center">
            <strong>Cupos:</strong>
            <span class="badge bg-secondary">{{ course.cupos }}</span>
          </li>
          <li
            class="list-group-item d-flex justify-content-between align-items-center">
            <strong>Completado:</strong>
            <span
              :class="
                course.completado ? 'badge bg-success' : 'badge bg-danger'
              ">
              {{ course.completado ? "Sí" : "No" }}
            </span>
          </li>
          <li
            class="list-group-item d-flex justify-content-between align-items-center">
            <strong>Fecha de Registro:</strong>
            <span class="text-muted">{{ course.fecha_registro }}</span>
          </li>
        </ul>

        <p class="card-text text-muted small text-center flex-grow-1">
          {{ course.descripcion }}
        </p>

        <!-- Botón ver detalles -->
        <div class="mt-auto text-center">
          <button class="btn btn-outline-danger w-100">Ver Detalles</button>
        </div>
      </div>
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
.card-img-top {
  width: 100%;
  height: 180px;
  object-fit: contain; /* Evita que las imágenes se corten */
  padding: 10px;
  background-color: #f8f9fa;
}

.card {
  display: flex;
  flex-direction: column;
  height: 100%;
  border-radius: 12px;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}

.card-body {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  min-height: 380px;
}

.card-text {
  flex-grow: 1;
  min-height: 60px;
}

.mt-auto {
  margin-top: auto;
}

.badge {
  font-size: 0.85rem;
}

.card:hover {
  transform: scale(1.02);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

/* Ajustes para móviles */
@media (max-width: 768px) {
  .card-img-top {
    height: 160px;
  }

  .col-sm-12 {
    display: flex;
    justify-content: center;
  }

  .card {
    width: 100%;
    max-width: 350px;
  }
}
</style>

<template>
  <div class="table-responsive">
    <table class="table table-striped table-bordered text-center align-middle">
      <thead class="table-dark">
        <tr>
          <th>Curso</th>
          <th>Cupos</th>
          <th>Inscritos</th>
          <th>Duración</th>
          <th>Costo</th>
          <th>Terminado</th>
          <th>Fecha</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <!-- Cursos -->
        <tr v-for="curso in cursos" :key="curso.id">
          <td>{{ curso.nombre }}</td>
          <td>{{ curso.cupos }}</td>
          <td>{{ curso.inscritos }}</td>
          <td>{{ curso.duracion }}</td>
          <td>
            <span class="badge bg-success">${{ curso.costo }}</span>
          </td>
          <td>
            <span
              :class="
                curso.completado ? 'badge bg-success' : 'badge bg-danger'
              ">
              {{ curso.completado ? "Sí" : "No" }}
            </span>
          </td>
          <td>
            <span class="badge bg-primary">{{ curso.fecha_registro }}</span>
          </td>
          <td>
            <button
              class="btn btn-warning btn-sm me-2"
              @click="$emit('edit', curso.id)">
              <i class="bi bi-pencil"></i>
            </button>
            <button
              class="btn btn-danger btn-sm"
              @click="$emit('delete', curso.id)">
              <i class="bi bi-trash"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    cursos: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.table {
  font-size: 0.9rem;
}
</style>

<template>
  <div class="container my-5">
    <div class="row justify-content-center">
      <div class="col-lg-8 col-md-10 col-sm-12">
        <div class="card shadow-lg p-4">
          <h2 class="text-center mb-4">Editar Curso</h2>

          <form @submit.prevent="submitUpdate">
            <!-- Nombre -->
            <div class="mb-3">
              <label for="nombre" class="form-label">Nombre:</label>
              <input
                v-model="curso.nombre"
                type="text"
                class="form-control"
                required />
            </div>

            <!-- URL Imagen -->
            <div class="mb-3">
              <label for="img" class="form-label">URL de la imagen:</label>
              <input
                v-model="curso.img"
                type="url"
                class="form-control"
                required />
            </div>

            <!-- Cupos -->
            <div class="mb-3">
              <label for="cupos" class="form-label">Cupos del curso:</label>
              <input
                v-model.number="curso.cupos"
                type="number"
                min="0"
                class="form-control"
                required />
            </div>

            <!-- Inscritos -->
            <div class="mb-3">
              <label for="inscritos" class="form-label"
                >Inscritos en el curso:</label
              >
              <input
                v-model.number="curso.inscritos"
                type="number"
                min="0"
                class="form-control"
                required
                :disabled="curso.completado" />
            </div>

            <!-- Duración -->
            <div class="mb-3">
              <label for="duracion" class="form-label"
                >Duración del curso:</label
              >
              <input
                v-model="curso.duracion"
                type="text"
                class="form-control"
                required />
            </div>

            <!-- Fecha de Registro -->
            <div class="mb-3">
              <label for="fecha_registro" class="form-label"
                >Fecha de registro:</label
              >
              <input
                v-model="formattedDate"
                type="date"
                class="form-control"
                @input="updateFechaRegistro"
                required />
            </div>

            <!-- Estado del curso -->
            <div class="mb-3">
              <label for="completado" class="form-label"
                >Estado del curso:</label
              >
              <select
                v-model="curso.completado"
                class="form-select"
                @change="handleStatusChange">
                <option :value="false">Activo</option>
                <option :value="true">Terminado</option>
              </select>
            </div>

            <!-- Costo -->
            <div class="mb-3">
              <label for="costo" class="form-label">Costo del curso:</label>
              <input
                v-model.number="curso.costo"
                type="number"
                min="0"
                class="form-control"
                required />
            </div>

            <!-- Descripción -->
            <div class="mb-3">
              <label for="descripcion" class="form-label">Descripción:</label>
              <textarea
                v-model="curso.descripcion"
                class="form-control"
                rows="3"
                required></textarea>
            </div>

            <!-- Mensaje de error -->
            <div v-if="errorMessage" class="alert alert-danger">
              {{ errorMessage }}
            </div>

            <!-- Botones -->
            <div class="d-flex justify-content-between mt-3">
              <button
                type="button"
                class="btn btn-secondary"
                @click="$router.push('/admin')">
                <i class="bi bi-x-circle"></i> Cancelar
              </button>
              <button type="submit" class="btn btn-success">
                <i class="bi bi-check-circle"></i> Actualizar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "EditarCurso",
  props: ["id"], // Recibe el ID desde la URL
  data() {
    return {
      curso: {
        nombre: "",
        img: "",
        cupos: 0,
        inscritos: 0,
        duracion: "",
        fecha_registro: "",
        completado: false,
        costo: 0,
        descripcion: "",
      },
      errorMessage: "",
    };
  },
  computed: {
    ...mapGetters(["allCursos"]),

    // Computed para formatear la fecha en formato YYYY-MM-DD
    formattedDate: {
      get() {
        if (!this.curso.fecha_registro) return "";
        const [dia, mes, año] = this.curso.fecha_registro.split("/");
        return `${año}-${mes}-${dia}`;
      },
      set(value) {
        const [año, mes, dia] = value.split("-");
        this.curso.fecha_registro = `${dia}/${mes}/${año}`;
      },
    },
  },
  methods: {
    ...mapActions(["updateCurso"]),

    // Función para cargar el curso por ID
    loadcurso() {
      const foundCurso = this.allCursos.find((c) => c.id === Number(this.id));
      if (foundCurso) {
        this.curso = { ...foundCurso };
      } else {
        console.error("Curso no encontrado");
      }
    },

    // Función para actualizar el curso
    handleStatusChange() {
      if (this.curso.completado) {
        this.curso.inscritos = 0;
      }
    },

    // Función para actualizar la fecha
    updateFechaRegistro(event) {
      this.formattedDate = event.target.value;
    },

    // Función para actualizar el curso
    submitUpdate() {
      if (this.curso.inscritos > this.curso.cupos) {
        this.errorMessage =
          "La cantidad de inscritos no puede ser mayor que la cantidad de cupos.";
        return;
      }

      this.updatecurso(this.curso);
      this.$router.push("/admin");
    },
  },
  mounted() {
    this.loadcurso();
  },
};
</script>

<style scoped>
h2 {
  font-size: 1.8rem;
  font-weight: bold;
}

.card {
  border-radius: 12px;
  border: none;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

.btn {
  padding: 10px 20px;
  font-size: 1rem;
}

.alert {
  text-align: center;
}
</style>

<template>
  <div>
    <h1>Editar Curso</h1>
    <form @submit.prevent="submitUpdate">
      <div>
        <label>Nombre:</label>
        <input v-model="course.nombre" type="text" required />
      </div>
      <div>
        <label>URL de la imagen:</label>
        <input v-model="course.img" type="url" required />
      </div>
      <div>
        <label>Cupos del curso:</label>
        <input v-model.number="course.cupos" type="number" min="0" required />
      </div>
      <div>
        <label>Inscritos en el curso:</label>
        <input
          v-model.number="course.inscritos"
          type="number"
          min="0"
          required
          :disabled="course.completado" />
      </div>
      <div>
        <label>Duración del curso:</label>
        <input v-model="course.duracion" type="text" required />
      </div>
      <div>
        <label>Fecha de registro:</label>
        <input
          v-model="formattedDate"
          type="date"
          @input="updateFechaRegistro"
          required />
      </div>
      <div>
        <label>Estado del curso:</label>
        <select v-model="course.completado" @change="handleStatusChange">
          <option :value="false">Activo</option>
          <option :value="true">Terminado</option>
        </select>
      </div>
      <div>
        <label>Costo del curso:</label>
        <input v-model.number="course.costo" type="number" min="0" required />
      </div>
      <div>
        <label>Descripción:</label>
        <textarea v-model="course.descripcion" required></textarea>
      </div>

      <!-- Mensaje de error si los inscritos superan los cupos -->
      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>

      <div>
        <button type="submit">Actualizar</button>
        <button type="button" @click="$router.push('/admin')">Cancelar</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "EditCourse",
  props: ["id"], // Recibe el ID desde la URL
  data() {
    return {
      course: {
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
    ...mapGetters(["allCourses"]),

    // Computed para formatear la fecha en formato YYYY-MM-DD para el input date
    formattedDate: {
      get() {
        if (!this.course.fecha_registro) return "";
        const [dia, mes, año] = this.course.fecha_registro.split("/");
        return `${año}-${mes}-${dia}`; // Convierte dd/MM/yyyy a yyyy-MM-dd
      },
      set(value) {
        const [año, mes, dia] = value.split("-");
        this.course.fecha_registro = `${dia}/${mes}/${año}`; // Convierte yyyy-MM-dd a dd/MM/yyyy
      },
    },
  },
  methods: {
    ...mapActions(["updateCourse"]),

    loadCourse() {
      const foundCourse = this.allCourses.find((c) => c.id === Number(this.id));
      if (foundCourse) {
        this.course = { ...foundCourse };
      } else {
        console.error("Curso no encontrado");
      }
    },

    handleStatusChange() {
      if (this.course.completado) {
        this.course.inscritos = 0; // ✅ Si el curso se marca como terminado, los inscritos se ponen en 0
      }
    },

    updateFechaRegistro(event) {
      this.formattedDate = event.target.value;
    },

    submitUpdate() {
      if (this.course.inscritos > this.course.cupos) {
        this.errorMessage =
          "La cantidad de inscritos no puede ser mayor que la cantidad de cupos.";
        return;
      }

      console.log("Actualizando curso:", this.course);
      this.updateCourse(this.course);
      this.$router.push("/admin");
    },
  },
  mounted() {
    this.loadCourse();
  },
};
</script>

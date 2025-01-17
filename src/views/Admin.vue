<template>
  <div>
    <NavBar />
    <h1>Administración de Cursos</h1>

    <div class="info-cards">
      <div class="info-card" v-for="info in infoCards" :key="info.label">
        <h2>{{ info.label }}</h2>
        <p>{{ info.value }}</p>
      </div>
    </div>

    <table class="course-table">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>Duración</th>
          <th>Costo</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="course in courses" :key="course.id">
          <td>{{ course.nombre }}</td>
          <td>{{ course.descripcion }}</td>
          <td>{{ course.duracion }}</td>
          <td>${{ course.costo }}</td>
          <td>
            <button @click="editCourse(course.id)">Editar</button>
            <button @click="confirmDelete(course.id)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
    <button @click="openModal">Agregar Curso</button>

    <!-- Modal para agregar curso -->
    <Modal :isVisible="showModal" @close="closeModal">
      <form @submit.prevent="addNewCourse">
        <div>
          <label>Nombre:</label>
          <input v-model="newCourse.nombre" type="text" required />
        </div>
        <div>
          <label>URL de la imagen:</label>
          <input v-model="newCourse.img" type="url" required />
        </div>
        <div>
          <label>Cupos:</label>
          <input
            v-model.number="newCourse.cupos"
            type="number"
            min="0"
            required />
        </div>
        <div>
          <label>Inscritos:</label>
          <input
            v-model.number="newCourse.inscritos"
            type="number"
            min="0"
            required />
        </div>
        <div>
          <label>Duración:</label>
          <input v-model="newCourse.duracion" type="text" required />
        </div>
        <div>
          <label>Costo:</label>
          <input
            v-model.number="newCourse.costo"
            type="number"
            min="0"
            required />
        </div>
        <div>
          <label>Descripción:</label>
          <textarea v-model="newCourse.descripcion" required></textarea>
        </div>

        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>

        <div>
          <button type="button" @click="closeModal">Cancelar</button>
          <button type="submit">Agregar</button>
        </div>
      </form>
    </Modal>

    <!-- Modal para confirmar eliminación -->
    <Modal :isVisible="showDeleteModal" @close="closeDeleteModal">
      <div>
        <p>¿Estás seguro de que deseas eliminar este curso?</p>
        <button @click="closeDeleteModal">Cancelar</button>
        <button @click="deleteCourse">Aceptar</button>
      </div>
    </Modal>
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import Modal from "../components/Modal.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Admin",
  components: {
    NavBar,
    Modal,
  },
  data() {
    return {
      showModal: false,
      showDeleteModal: false,
      errorMessage: "",
      courseToDelete: null,
      newCourse: {
        nombre: "",
        img: "",
        cupos: 0,
        inscritos: 0,
        duracion: "",
        costo: 0,
        descripcion: "",
      },
      fields: [
        {
          name: "nombre",
          label: "Nombre",
          type: "input",
          inputType: "text",
          required: true,
        },
        {
          name: "img",
          label: "URL de la imagen",
          type: "input",
          inputType: "url",
          required: true,
        },
        {
          name: "cupos",
          label: "Cupos",
          type: "input",
          inputType: "number",
          min: 0,
          required: true,
        },
        {
          name: "inscritos",
          label: "Inscritos",
          type: "input",
          inputType: "number",
          min: 0,
          required: true,
        },
        {
          name: "duracion",
          label: "Duración",
          type: "input",
          inputType: "text",
          required: true,
        },
        {
          name: "costo",
          label: "Costo",
          type: "input",
          inputType: "number",
          min: 0,
          required: true,
        },
        {
          name: "descripcion",
          label: "Descripción",
          type: "textarea",
          required: true,
        },
      ],
    };
  },
  computed: {
    ...mapGetters([
      "allCourses",
      "totalCourses",
      "totalStudentsAllowed",
      "totalEnrolledStudents",
      "remainingSeats",
      "totalCompletedCourses",
      "totalActiveCourses",
    ]),
    courses() {
      return this.allCourses;
    },
    infoCards() {
      return [
        { label: "Total de cursos", value: this.totalCourses },
        { label: "Alumnos permitidos", value: this.totalStudentsAllowed },
        { label: "Alumnos inscritos", value: this.totalEnrolledStudents },
        { label: "Cupos restantes", value: this.remainingSeats },
        { label: "Cursos terminados", value: this.totalCompletedCourses },
        { label: "Cursos activos", value: this.totalActiveCourses },
      ];
    },
  },
  methods: {
    ...mapActions(["addCourse", "removeCourse"]),
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.resetForm();
    },
    resetForm() {
      this.newCourse = {
        nombre: "",
        img: "",
        cupos: 0,
        inscritos: 0,
        duracion: "",
        costo: 0,
        descripcion: "",
      };
    },
    confirmDelete(courseId) {
      this.courseToDelete = courseId;
      this.showDeleteModal = true;
    },
    closeDeleteModal() {
      this.showDeleteModal = false;
      this.courseToDelete = null;
    },
    deleteCourse() {
      if (this.courseToDelete !== null) {
        this.removeCourse(this.courseToDelete);
        this.closeDeleteModal();
      }
    },
    addNewCourse() {
      if (this.newCourse.inscritos > this.newCourse.cupos) {
        this.errorMessage =
          "La cantidad de inscritos no puede ser mayor que la cantidad de cupos.";
        return;
      }
      if (
        !this.newCourse.nombre ||
        !this.newCourse.img ||
        !this.newCourse.duracion ||
        !this.newCourse.descripcion ||
        this.newCourse.cupos <= 0 ||
        this.newCourse.costo <= 0
      ) {
        this.errorMessage = "Todos los campos son obligatorios.";
        console.log("Error: Faltan campos en newCourse", this.newCourse);
        return;
      }

      // Formatear la fecha actual en "dd/MM/yyyy"
      const fechaActual = new Date();
      const dia = fechaActual.getDate().toString().padStart(2, "0");
      const mes = (fechaActual.getMonth() + 1).toString().padStart(2, "0"); // +1 porque en JS los meses van de 0 a 11
      const año = fechaActual.getFullYear();
      const fechaFormateada = `${dia}/${mes}/${año}`;

      const maxId =
        this.courses.length > 0
          ? Math.max(...this.courses.map((course) => course.id))
          : 0; // Si no hay cursos, empezar desde 1

      const nuevoId = maxId + 1;

      const newCourse = {
        id: nuevoId,
        nombre: this.newCourse.nombre,
        img: this.newCourse.img,
        cupos: this.newCourse.cupos,
        inscritos: this.newCourse.inscritos,
        duracion: this.newCourse.duracion,
        costo: this.newCourse.costo,
        descripcion: this.newCourse.descripcion,
        completado: false,
        fecha_registro: fechaFormateada,
      };

      console.log("Curso a agregar:", newCourse); // Verifica antes de enviarlo a Vuex

      this.addCourse(newCourse);

      this.errorMessage = "";
      this.closeModal();
    },
    editCourse(courseId) {
      console.log("Editando curso ID:", courseId);
      // Redirigir al usuario a la pantalla de edición con el ID del curso
      this.$router.push({ name: "EditCourse", params: { id: courseId } });
    },
  },
};
</script>

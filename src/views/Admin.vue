<template>
  <div class="container my-5">
    <h1 class="text-center">Administración de Cursos</h1>

    <!-- Botón Agregar Curso -->
    <div class="d-flex justify-content-end my-3">
      <button class="btn btn-primary" @click="openModal('add')">
        <i class="bi bi-plus-circle"></i> Agregar Nuevo Curso
      </button>
    </div>

    <!-- Tabla de Cursos -->
    <TableCursos
      :cursos="cursos"
      @edit="redirectToEdit"
      @delete="openModal('delete', $event)" />

    <div class="mt-4">
      <InfoCards
        :totalCupos="totalCupos"
        :totalInscritos="totalInscritos"
        :cuposRestantes="cuposRestantes"
        :cursosCompletados="cursosCompletados"
        :cursosActivos="cursosActivos"
        :totalCursos="totalCursos" />
    </div>

    <!-- Modal Reutilizable -->
    <BaseModal
      :show="showModal"
      :type="modalType"
      :curso="selectedCurso"
      :errorMessage="errorMessage"
      @update:show="showModal = $event"
      @close="closeModal"
      @add="addNewcurso"
      @confirm="deletecurso" />
  </div>
</template>

<script>
import TableCursos from "../components/TableCursos.vue";
import BaseModal from "../components/BaseModal.vue";
import InfoCards from "../components/InfoCards.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Admin",
  components: { TableCursos, BaseModal, InfoCards },
  data() {
    return {
      showModal: false,
      modalType: "add",
      selectedCurso: {},
      errorMessage: "",
    };
  },
  computed: {
    ...mapGetters([
      "allCursos",
      "totalCupos",
      "totalInscritos",
      "cuposRestantes",
      "cursosCompletados",
      "cursosActivos",
      "totalCursos",
    ]),
    cursos() {
      return this.allCursos;
    },
  },
  methods: {
    ...mapActions(["addCurso", "removeCurso"]),

    redirectToEdit(cursoId) {
      this.$router.push({ name: "EditarCurso", params: { id: cursoId } });
    },

    openModal(type, cursoId = null) {
      if (type === "edit") {
        this.redirectToEdit(cursoId);
        return;
      }

      this.modalType = type;
      this.showModal = true;
      this.errorMessage = "";

      if (cursoId !== null) {
        this.selectedCurso =
          this.cursos.find((curso) => curso.id === cursoId) || {};
      } else {
        this.selectedCurso = {
          nombre: "",
          img: "",
          cupos: 0,
          inscritos: 0,
          duracion: "",
          costo: 0,
          descripcion: "",
        };
      }
    },

    closeModal() {
      this.showModal = false;
      this.errorMessage = "";
    },

    addNewcurso(curso) {
      this.errorMessage = "";

      // Validar que todos los campos sean obligatorios
      if (
        !curso.nombre ||
        !curso.img ||
        !curso.duracion ||
        !curso.descripcion
      ) {
        this.errorMessage = "Todos los campos son obligatorios.";
        return;
      }

      if (curso.cupos <= 0 || curso.costo <= 0) {
        this.errorMessage = "Cupos y costo deben ser mayores a 0.";
        return;
      }

      if (curso.inscritos > curso.cupos) {
        this.errorMessage =
          "La cantidad de inscritos no puede ser mayor que la cantidad de cupos.";
        return;
      }

      // Formato Fecha  d/m/y
      const fechaActual = new Date();
      const dia = fechaActual.getDate().toString().padStart(2, "0");
      const mes = (fechaActual.getMonth() + 1).toString().padStart(2, "0"); // +1 porque en JS los meses van de 0 a 11
      const año = fechaActual.getFullYear();
      const fechaFormateada = `${dia}/${mes}/${año}`;

      // Obtener el nuevo ID
      const maxId =
        this.cursos.length > 0
          ? Math.max(...this.cursos.map((curso) => curso.id))
          : 0; // Si no hay cursos, empezar desde 1
      const nuevoId = maxId + 1;

      // Crear el nuevo curso
      const nuevoCurso = {
        id: nuevoId,
        nombre: curso.nombre,
        img: curso.img,
        cupos: curso.cupos,
        inscritos: curso.inscritos,
        duracion: curso.duracion,
        costo: curso.costo,
        descripcion: curso.descripcion,
        completado: false, // Estado del curso por defecto
        fecha_registro: fechaFormateada, // Fecha de registro
      };

      this.addCurso(nuevoCurso);
      this.closeModal();
    },

    deletecurso() {
      this.removeCurso(this.selectedCurso.id);
      this.closeModal();
    },
  },
};
</script>

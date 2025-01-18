<template>
  <!-- Modal de Bootstrap -->
  <div class="modal fade" ref="modal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ modalTitle }}</h5>
          <button type="button" class="btn-close" @click="closeModal"></button>
        </div>

        <div class="modal-body">
          <!-- Modal de eliminación -->
          <div v-if="type === 'delete'">
            <p>¿Estás seguro de que deseas eliminar este curso?</p>
          </div>

          <!-- Formulario para agregar cursos -->
          <form v-else @submit.prevent="submitcurso">
            <div v-for="field in fields" :key="field.name" class="mb-3">
              <label class="form-label">{{ field.label }}</label>
              <input
                v-if="field.type === 'input'"
                v-model="cursoData[field.name]"
                :type="field.inputType"
                class="form-control"
                :required="field.required" />
              <textarea
                v-else-if="field.type === 'textarea'"
                v-model="cursoData[field.name]"
                class="form-control"
                rows="3"
                :required="field.required">
              </textarea>
            </div>

            <!-- Mensaje de error -->
            <div v-if="errorMessage" class="alert alert-danger">
              {{ errorMessage }}
            </div>
          </form>
        </div>

        <!-- Botón de confirmación -->
        <div class="modal-footer">
          <button class="btn btn-secondary" @click="closeModal">
            Cancelar
          </button>
          <button
            v-if="type === 'delete'"
            class="btn btn-danger"
            @click="$emit('confirm')">
            Eliminar
          </button>
          <button v-else class="btn btn-primary" @click="submitcurso">
            Agregar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from "bootstrap";

export default {
  props: {
    show: Boolean,
    type: String,
    curso: Object,
    errorMessage: String,
  },
  data() {
    return {
      modalInstance: null,
      cursoData: {},
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
    // Computed para formatear el título del modal
    modalTitle() {
      return this.type === "delete" ? "Confirmar Eliminación" : "Agregar Curso";
    },
  },
  methods: {
    // Método para mostrar el modal
    showModal() {
      if (this.modalInstance) this.modalInstance.show();
    },

    // Método para cerrar el modal
    closeModal() {
      if (this.modalInstance) this.modalInstance.hide();
      this.$emit("close");
    },

    // Método para enviar el formulario
    submitcurso() {
      this.$emit("add", this.cursoData);
    },
  },
  watch: {
    // Watcher para mostrar el modal
    show(newVal) {
      if (newVal) this.showModal();
      else this.closeModal();
    },

    // Watcher para actualizar los datos del curso
    curso(newVal) {
      this.cursoData = { ...newVal };
    },
  },

  // Mounted para inicializar el modal
  mounted() {
    this.modalInstance = new Modal(this.$refs.modal, {
      backdrop: "static",
      keyboard: false,
    });
  },
};
</script>

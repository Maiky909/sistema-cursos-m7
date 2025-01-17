<template>
  <div v-if="isVisible" class="modal-overlay">
    <div class="modal-content">
      <slot></slot>
      <button class="close-button" @click="close">Cerrar</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  props: {
    isVisible: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}
.modal-content {
  background: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}
.close-button {
  margin-top: 10px;
  padding: 5px 10px;
  border: none;
  background-color: #d9534f;
  color: white;
  border-radius: 3px;
  cursor: pointer;
}
.close-button:hover {
  background-color: #c9302c;
}
</style>

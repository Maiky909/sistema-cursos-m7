import { createStore } from "vuex";
import cursosData from "../data/cursos.json";

export default createStore({
  state: {
    cursos: [...cursosData], // para copiar el array de cursos
  },
  mutations: {
    ADD_CURSO(state, curso) {
      state.cursos.push(curso);
    },
    REMOVE_CURSO(state, cursoId) {
      state.cursos = state.cursos.filter((curso) => curso.id !== cursoId);
    },
    UPDATE_CURSO(state, updatedCurso) {
      const index = state.cursos.findIndex(
        (curso) => curso.id === updatedCurso.id
      );
      if (index !== -1) {
        state.cursos[index] = { ...updatedCurso };
      }
    },
  },
  actions: {
    addCurso({ commit }, curso) {
      commit("ADD_CURSO", curso);
    },
    removeCurso({ commit }, cursoId) {
      commit("REMOVE_CURSO", cursoId);
    },
    updateCurso({ commit }, updatedCurso) {
      commit("UPDATE_CURSO", updatedCurso);
    },
  },
  getters: {
    allCursos(state) {
      return state.cursos;
    },
    totalCursos(state) {
      return state.cursos.length;
    },
    totalCupos(state) {
      return state.cursos.reduce((sum, curso) => sum + curso.cupos, 0);
    },
    totalInscritos(state) {
      return state.cursos.reduce((sum, curso) => sum + curso.inscritos, 0);
    },
    cuposRestantes(state) {
      return state.cursos.reduce(
        (sum, curso) => sum + (curso.cupos - curso.inscritos),
        0
      );
    },
    cursosCompletados(state) {
      return state.cursos.filter((curso) => curso.completado).length;
    },
    cursosActivos(state) {
      return state.cursos.filter((curso) => !curso.completado).length;
    },
  },
});

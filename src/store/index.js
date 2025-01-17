import { createStore } from "vuex";
import cursos from "../data/cursos.json";

export default createStore({
  state: {
    courses: [...cursos], // para copiar el array de cursos
  },
  mutations: {
    ADD_COURSE(state, course) {
      state.courses.push(course);
    },
    REMOVE_COURSE(state, courseId) {
      state.courses = state.courses.filter((course) => course.id !== courseId);
    },
    UPDATE_COURSE(state, updatedCourse) {
      const index = state.courses.findIndex(
        (course) => course.id === updatedCourse.id
      );
      if (index !== -1) {
        state.courses[index] = { ...updatedCourse };
      }
    },
  },
  actions: {
    addCourse({ commit }, course) {
      commit("ADD_COURSE", course);
    },
    removeCourse({ commit }, courseId) {
      commit("REMOVE_COURSE", courseId);
    },
    updateCourse({ commit }, updatedCourse) {
      commit("UPDATE_COURSE", updatedCourse);
    },
  },
  getters: {
    allCourses(state) {
      return state.courses;
    },
    totalCourses(state) {
      return state.courses.length; // Total de cursos
    },
    totalStudentsAllowed(state) {
      return state.courses.reduce((sum, course) => sum + course.cupos, 0); // Total de cupos permitidos
    },
    totalEnrolledStudents(state) {
      return state.courses.reduce((sum, course) => sum + course.inscritos, 0); // Total de alumnos inscritos
    },
    remainingSeats(state) {
      return state.courses.reduce(
        (sum, course) => sum + (course.cupos - course.inscritos),
        0
      ); // Total de cupos restantes
    },
    totalCompletedCourses(state) {
      return state.courses.filter((course) => course.completado).length; // Cursos terminados
    },
    totalActiveCourses(state) {
      return state.courses.filter((course) => !course.completado).length; // Cursos activos
    },
  },
});

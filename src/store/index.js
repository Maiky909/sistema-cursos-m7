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
  },
  actions: {
    addCourse({ commit }, course) {
      commit("ADD_COURSE", course);
    },
    removeCourse({ commit }, courseId) {
      commit("REMOVE_COURSE", courseId);
    },
  },
  getters: {
    allCourses(state) {
      return state.courses;
    },
  },
});

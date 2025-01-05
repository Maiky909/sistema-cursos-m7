import { createStore } from "vuex";

export default createStore({
  state: {
    courses: [],
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
});

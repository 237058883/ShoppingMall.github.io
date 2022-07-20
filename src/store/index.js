import { createStore } from "vuex";

export default createStore({
  state: {
    urls: String,
  },
  getters: {},
  mutations: {
    seturls(state, payload) {
      state.urls = payload;
    },
  },
  actions: {},
  modules: {},
});

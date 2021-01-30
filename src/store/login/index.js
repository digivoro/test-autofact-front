import Axios from "axios";
import { Notify } from "quasar";

const BASE_URL = "http://localhost:3000";

export default {
  namespaced: true,

  state() {
    return {
      currentUser: null,
    };
  },

  getters: {},
  mutations: {
    LOGIN_USER(state, user) {
      state.currentUser = user;
    },
  },
  actions: {
    async verifyLogin({ commit }, loginData) {
      try {
        let response = await Axios.post(`${BASE_URL}/login`, loginData);
        if (response.status === 200) {
          commit("LOGIN_USER", response.data);
          this.$router.push({ path: "/quiz" });
          Notify.create({
            type: "positive",
            icon: "cloud_done",
            message: `Bienvenid@, ${this.currentUser.user}`,
          });
        }
      } catch (error) {
        if (error.message === "Request failed with status code 404") {
          Notify.create({
            type: "negative",
            message: "Usuario o contraseña inválidos",
          });
        }
      }
    },

    async sendQuiz({ commit, state }, formData) {
      try {
        let response = await Axios.post(`${BASE_URL}/quiz`, {
          ...formData,
          user: state.currentUser.user,
        });
        if (response.status === 200) {
          Notify.create({
            type: "positive",
            message: "Formulario contestado correctamente!",
          });
        }
      } catch (error) {
        if (error.message === "Request failed with status code 500") {
          Notify.create({ type: "negative", message: "Error del servidor" });
        }
      }
    },
  },
};

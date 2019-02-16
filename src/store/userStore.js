import axios from 'axios';

export default {
  namespaced: true,
  state: {
    user: {},
    errors: {
      login: null,
      signup: null,
    },
  },
  mutations: {
    addUser(state, userObject) {
      state.user = userObject;
    },
    updateError(state, errorObject) {
      state.errors[errorObject.key] = errorObject.data;
    },
  },
  actions: {
    async LoginOrSignUp({ commit }, data) {
      try {
        const response = await axios.post(`/api/v1/${data.url}`, data.user);
        commit('addUser', response.data);
        localStorage.setItem('user', response.data);
        return { status: 'success', data: response.data };
      } catch (error) {
        commit('updateError', { key: data.key, data: error.response });
        return { status: 'error', data: error.response };
      }
    },
  },
};

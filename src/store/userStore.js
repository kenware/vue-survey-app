import axios from 'axios';

export default {
  namespaced: true,
  state: {
    user: {},
    loginError: null,
    signUpError: null,

  },
  mutations: {
    addUser(state, userObject) {
      state.user = userObject;
    },
    updateError(state, errorObject) {
      state[errorObject.key] = errorObject.data;
    },
  },
  actions: {
    async signUp({ commit }, user) {
      try {
        const response = await axios.post('/api/v1/users/', user);
        commit('addUser', response.data);
        localStorage.setItem('user', response.data);
        return { status: 'success', data: response.data };
      } catch (error) {
        commit('updateError', { key: 'signUpError', data: error.response });
        return { status: 'error', data: error.response };
      }
    },
    async login({ commit }, user) {
      try {
        const response = await axios.post('/api/v1/login/', user);
        commit('addUser', response.data);
        localStorage.setItem('user', response.data);
        return { status: 'success', data: response.data };
      } catch (error) {
        commit('updateError', { key: 'loginError', data: error.response });
        return { status: 'error', data: error.response };
      }
    },
  },
};

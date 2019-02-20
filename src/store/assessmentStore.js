import axios from 'axios';

export default {
  namespaced: true,
  state: {
    assessment: { results: [{ assessments: [] }] },
    assessmentType: {},
    score: { results: [] },
    errors: { assessment: null, score: null },
  },
  mutations: {
    addGetObjectToState(state, data) {
      state[data.key] = data.value;
    },
    updateErrorState(state, error) {
      state.errors[error.key] = error.data;
    },
  },
  actions: {
    async get({ commit }, data) {
      const headers = { Authorization: `Bearer ${localStorage.getItem('accessToken')}` };
      try {
        const response = await axios.get(`/api/v1/assessments/${data.url}`, { headers });
        commit('addGetObjectToState', { key: data.key, value: response.data });
        return { status: 'success', data: response.data };
      } catch (error) {
        commit('updateErrorState', { error: error.response, key: data.key });
        return { status: 'error', data: error.response };
      }
    },
  },
};

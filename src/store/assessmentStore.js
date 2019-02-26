import axios from 'axios';
import baseUrl from '../config/host';
import headers from '../config/header';

export default {
  namespaced: true,
  state: {
    assessment: { results: [{ assessments: [] }] },
    assessmentType: { questions: { results: [] } },
    score: { results: [] },
    isTakenScore: { results: [{ history: {} }] },
    errors: { assessment: null, score: null, postAnswer: null },
    postAnswer: {},
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
      try {
        const response = await axios.get(`${baseUrl}/v1/assessments/${data.url}`, { headers });
        commit('addGetObjectToState', { key: data.key, value: response.data });
        return { status: 'success', data: response.data };
      } catch (error) {
        commit('updateErrorState', { error: error.response, key: data.key });
        return { status: 'error', data: error.response };
      }
    },
    async post({ commit }, answerData) {
      try {
        const res = await axios.post(`${baseUrl}/v1/${answerData.url}`, answerData.value, { headers });
        commit('addGetObjectToState', { key: answerData.key, value: res.data });
        return { status: 'success', data: res.data };
      } catch (error) {
        commit('updateErrorState', { error: error.response, key: answerData.key });
        return { status: 'error', data: error.response };
      }
    },
  },
};

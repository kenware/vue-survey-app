import Vue from 'vue';
import Vuex from 'vuex';

import user from './userStore';
import assessment from './assessmentStore';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    assessment,
  },
});

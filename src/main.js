import Vue from 'vue';
import VModal from 'vue-js-modal';
import vueAwesomeCountdown from 'vue-awesome-countdown';
import Paginate from 'vuejs-paginate';

import App from './App.vue';
import router from './router';
import store from './store/store';
import 'materialize-css';
import 'materialize-css/dist/css/materialize.css';
import './customModules/alert.scss';

Vue.use(VModal);
Vue.use(vueAwesomeCountdown, 'vac');
Vue.component('paginate', Paginate);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');

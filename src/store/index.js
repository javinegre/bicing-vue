import Vue from 'vue';
import Vuex from 'vuex';

import loading from './modules/loading';
import stations from './modules/stations';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    loading,
    stations
  }
});
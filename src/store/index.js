import Vue from 'vue';
import Vuex from 'vuex';

import filters from './modules/filters';
import loading from './modules/loading';
import map from './modules/map';
import stations from './modules/stations';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    filters,
    map,
    loading,
    stations
  }
});
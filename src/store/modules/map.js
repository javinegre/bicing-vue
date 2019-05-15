import mapConfig from '../../shared/config/map';

// Initial State
const state = {
  center: mapConfig.center
}

// Getters
const getters = {};

// Actions
const actions = {
  changeMapCenter ({ commit }, center) {
    commit('setMapCenter', center);
  }
};

// Mutations
const mutations = {
  setMapCenter (state, center) {
    state.center = center;
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

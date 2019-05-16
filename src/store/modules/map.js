import mapConfig from '../../shared/config/map';

// Initial State
const state = {
  center: mapConfig.center,
  myLocation: null
}

// Getters
const getters = {};

// Actions
const actions = {
  changeMapCenter ({ commit }, center) {
    commit('setMapCenter', center);
  },
  changeMyLocation ({ commit }, coords) {
    commit('setMyLocation', coords);
  }
};

// Mutations
const mutations = {
  setMapCenter (state, center) {
    state.center = center;
  },
  setMyLocation (state, coords) {
    state.myLocation = coords;
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

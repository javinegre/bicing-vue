// Initial State
const state = {
  app: false,
  geoLocation: false
}

// Getters
const getters = {};

// Actions
const actions = {
  appLoading ({ commit }, status) {
    commit('setAppLoading', status);
  },
  geoLocationLoading ({ commit }, status) {
    commit('setGeoLocationLoading', status);
  }
};

// Mutations
const mutations = {
  setAppLoading (state, data) {
    state.app = data;
  },
  setGeoLocationLoading (state, data) {
    state.geoLocation = data;
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

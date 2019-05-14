// Initial State
const state = {
  app: false
}

// Getters
const getters = {};

// Actions
const actions = {
  appLoading ({ commit }, status) {
    commit('setAppLoading', status);
  }
};

// Mutations
const mutations = {
  setAppLoading (state, data) {
    state.app = data;
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

// Initial State
const state = {
  resourceMode: 'bikes',
  mechBikeFilter: true,
  elecBikeFilter: true
}

// Getters
const getters = {};

// Actions
const actions = {
  changeResourceMode ({ commit }, mode) {
    commit('setResourceMode', mode);
  },
  changeBikeType ({ commit }, values) { // values: { mechBikeFilter, elecBikeFilter }
    commit('setBikeType', values);
  }
};

// Mutations
const mutations = {
  setResourceMode (state, mode) {
    state.resourceMode = mode;
  },
  setBikeType (state, { mechBikeFilter, elecBikeFilter }) {
    state.mechBikeFilter = mechBikeFilter;
    state.elecBikeFilter = elecBikeFilter;
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
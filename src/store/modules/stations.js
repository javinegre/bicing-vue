import StationService from '../../services/stations';

const stationService = StationService();

// Initial State
const state = {
  list: [],
  selected: null,
  lastUpdate: -Infinity
}

// Getters
const getters = {};

// Actions
const actions = {
  async getAllStations ({ commit, dispatch }) {
    dispatch('loading/appLoading', true, {root:true});
    const data = await stationService.getList();
    if (data !== null) {
      commit('setList', data);
    }
    // TODO: 'else', general error

    dispatch('loading/appLoading', false, {root:true});
  },

  selectStation ({ commit }, stationId) {
    commit('setSelectedStation', stationId);
  }
};

// Mutations
const mutations = {
  setList (state, data) {
    state.list = data.stations;
    state.lastUpdate = data.updateTime;
  },

  setSelectedStation (state, stationId) {
    state.selected = stationId;
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

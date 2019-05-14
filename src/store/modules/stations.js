import StationService from '../../services/stations';

const stationService = StationService();

// Initial State
const state = {
  list: [],
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
  }
};

// Mutations
const mutations = {
  setList (state, data) {
    state.list = data.stations;
    state.lastUpdate = data.updateTime;
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

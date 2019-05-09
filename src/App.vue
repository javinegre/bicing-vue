<template>
  <div id="app">
    <Map
      v-bind:mapCenter="mapCenter"
      v-bind:shownStations="shownStations"
      v-bind:resourceMode="resourceMode"
      v-bind:mechBikeFilter="mechBikeFilter"
      v-bind:elecBikeFilter="elecBikeFilter"
      @select-station="onSelectStation"
      @center-changed="onCenterChanged" />
    <InfoBox
      v-bind:shownStations="shownStations"
      v-bind:resourceMode="resourceMode"
      v-bind:mechBikeFilter="mechBikeFilter"
      v-bind:elecBikeFilter="elecBikeFilter"
      v-bind:lastUpdate="lastUpdate"
      @select-station="onSelectStation" />
    <Menu
      v-bind:mapCenter="mapCenter"
      v-bind:resourceMode="resourceMode"
      v-bind:mechBikeFilter="mechBikeFilter"
      v-bind:elecBikeFilter="elecBikeFilter"
      v-bind:lastUpdate="lastUpdate"
      v-bind:isLoadingData="isLoadingData"
      @refresh-list="onRefreshList"
      @resource-filter-changed="onResourceFilterChanged"
      @center-changed="onCenterChanged" />
    <StationInfo
      v-bind:selectedStation="selectedStation"
      v-bind:shownStations="shownStations"
      v-bind:resourceMode="resourceMode"
      v-bind:mechBikeFilter="mechBikeFilter"
      v-bind:elecBikeFilter="elecBikeFilter"
      @select-station="onSelectStation" />
  </div>
</template>

<script>
  import 'vue-material/dist/vue-material.min.css';
  import 'vue-material/dist/theme/default.css';

  import InfoBox from './components/InfoBox/InfoBox.vue';
  import Map from './components/Map.vue';
  import Menu from './components/Menu/Menu.vue';
  import StationInfo from './components/StationInfo.vue';

  import StationService from './services/stations';

  import filterStations from './shared/helpers/filter-stations';

  import mapConfig from './shared/config/map';

  const stationService = StationService();

  export default {
    name: 'app',
    components: {
      InfoBox,
      Map,
      Menu,
      StationInfo
    },
    data: function () {
      return {
        mapCenter: mapConfig.center,
        stationList: [],
        shownStations: [],
        selectedStation: null,
        resourceMode: 'bikes',
        mechBikeFilter: true,
        elecBikeFilter: true,
        lastUpdate: 0,
        isLoadingData: false
      }
    },
    watch: {
      mapCenter: function () {
        this.filterStations();
      }
    },
    methods: {
      refreshListInfo: async function () {
        this.isLoadingData = true;

        const data = await stationService.getList();

        if (data !== null) {
          this.stationList = data.stations;
          this.lastUpdate = data.updateTime;
          this.filterStations();
        }
        // TODO: data problem warning

        this.isLoadingData = false;
      },
      filterStations: function () {
        this.shownStations = filterStations(
          this.stationList,
          this.mapCenter,
          this.resourceMode
        );
      },
      onSelectStation: function (stationId) {
        this.selectedStation = stationId;
        const station = stationId && this.shownStations.find(it => it.id === stationId);
        if (station) {
          this.mapCenter = {
            lat: station.latitude,
            lng: station.longitude
          };
          this.filterStations();
        }
      },
      onCenterChanged: function (mapCenter) {
        this.mapCenter = mapCenter;
      },
      onRefreshList: function () {
        this.refreshListInfo();
      },
      onResourceFilterChanged: function (data) {
        if (data.type === 'resourceMode') {
          this.resourceMode = data.value ? 'bikes' : 'slots';
        }
        else if (data.type === 'mechBikeFilter' || data.type === 'elecBikeFilter') {
          this[data.type] = data.value;
        }

        this.filterStations();
      }
    },
    mounted () {
      this.refreshListInfo();
    }
  }
</script>

<style lang="scss">
/* Optional: Makes the sample page fill the window. */
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
}

</style>

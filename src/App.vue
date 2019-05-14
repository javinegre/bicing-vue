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
      @select-station="onSelectStation" />
    <Menu
      v-bind:mapCenter="mapCenter"
      v-bind:resourceMode="resourceMode"
      v-bind:mechBikeFilter="mechBikeFilter"
      v-bind:elecBikeFilter="elecBikeFilter"
      @resource-filter-changed="onResourceFilterChanged"
      @center-changed="onCenterChanged" />
    <StationInfo
      v-bind:selectedStation="selectedStation"
      v-bind:shownStations="shownStations"
      v-bind:resourceMode="resourceMode"
      v-bind:mechBikeFilter="mechBikeFilter"
      v-bind:elecBikeFilter="elecBikeFilter"
      @select-station="onSelectStation" />
    <AppInfoMenu />
  </div>
</template>

<script>
  import { mapState } from 'vuex';

  import 'vue-material/dist/vue-material.min.css';
  import 'vue-material/dist/theme/default.css';

  import AppInfoMenu from './components/AppInfoMenu/AppInfoMenu.vue';
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
      AppInfoMenu,
      InfoBox,
      Map,
      Menu,
      StationInfo
    },
    data: function () {
      return {
        mapCenter: mapConfig.center,
        shownStations: [],
        selectedStation: null,
        resourceMode: 'bikes',
        mechBikeFilter: true,
        elecBikeFilter: true
      }
    },
    watch: {
      mapCenter: function () {
        this.filterStations();
      }
    },
    methods: {
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
    computed: mapState({
      stationList: state => state.stations.list,
      lastUpdate: state => state.stations.lastUpdate
    }),
    created () {
      this.$store.dispatch('stations/getAllStations');
    },
    mounted () {
      this.$store.subscribe((mutation, state) => {
        switch(mutation.type) {
          case 'stations/setList':
            this.filterStations();
            break;
        }
      });
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

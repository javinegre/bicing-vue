<template>
  <div id="app">
    <Map v-bind:shownStations="shownStations" @center-changed="onCenterChanged" />
    <InfoBox v-bind:shownStations="shownStations" v-bind:lastUpdate="lastUpdate" />
  </div>
</template>

<script>
  import Map from './components/Map.vue';
  import InfoBox from './components/InfoBox.vue';

  import StationService from './services/stations';

  import filterStations from './shared/helpers/filter-stations';

  import mapConfig from './shared/config/map';

  const stationService = StationService();

  export default {
    name: 'app',
    components: {
      Map,
      InfoBox
    },
    data: function () {
      return {
        mapCenter: mapConfig.center,
        stationList: [],
        shownStations: [],
        resourceMode: 'bikes',
        resourceFilter: null,
        lastUpdate: 0
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
      onCenterChanged: function (mapCenter) {
        this.mapCenter = mapCenter;
      }
    },
    mounted () {
      stationService.getList().then(response => {
        this.stationList = response.data.stations;
        this.lastUpdate = response.data.updateTime;
        this.filterStations();
      });
    }
  }
</script>

<style>
/* Optional: Makes the sample page fill the window. */
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
}

</style>

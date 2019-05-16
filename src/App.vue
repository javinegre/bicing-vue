<template>
  <div id="app">
    <Map
      v-bind:shownStations="shownStations"
      @geo-locate="geoLocate" />
    <InfoBox
      v-bind:shownStations="shownStations" />
    <Menu
      @geo-locate="geoLocate" />
    <StationInfo
      v-bind:shownStations="shownStations" />
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

  import filterStations from './shared/helpers/filter-stations';

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
        shownStations: []
      }
    },
    watch: {
      mapCenter: function () {
        this.filterStations();
      },
      selectedStation: function (newStationId, oldStationId) {
        const station = newStationId && this.shownStations.find(it => it.id === newStationId);
        if (station) {
          // If oldStation is null menu will slide from the left, map will pan afterwards.
          const transitionDuration = oldStationId === null ? 450 : 10;

          window.setTimeout(() => {
            this.$store.dispatch('map/changeMapCenter', {
              lat: station.lat,
              lng: station.lng
            });
          }, transitionDuration)
        }
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
      geoLocate: function () {
        if ( 'geolocation' in navigator ) {
          this.$store.dispatch('loading/geoLocationLoading', true);
          navigator.geolocation.getCurrentPosition((pos) => {
            const newPos = {
              lat: pos.coords.latitude,
              lng: pos.coords.longitude
            };

            this.$store.dispatch('map/changeMapCenter', newPos);
            this.$store.dispatch('map/changeMyLocation', newPos);

            this.$store.dispatch('loading/geoLocationLoading', false);
          },(error) => {
            /* eslint-disable no-console */
            console.log(error);
            this.$store.dispatch('loading/geoLocationLoading', false);
          }, {
            timeout : 10000,
              maximumAge: 60000
          });
        }
      }
    },
    computed: mapState({
      mapCenter: state => state.map.center,
      stationList: state => state.stations.list,
      selectedStation: state => state.stations.selected,
      lastUpdate: state => state.stations.lastUpdate,
      resourceMode: state => state.filters.resourceMode
    }),
    created () {
      this.$store.dispatch('stations/getAllStations');
    },
    mounted () {
      this.$store.subscribe((mutation) => {
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

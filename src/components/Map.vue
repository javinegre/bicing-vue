<template>
    <div>
        <div id="map"></div>
        <md-icon class="crosshairIcon">location_searching</md-icon>
    </div>
</template>

<script>
  import Vue from 'vue';
  import { mapState } from 'vuex';

  import { MdIcon } from 'vue-material/dist/components';

  Vue.use(MdIcon);

  import scriptLoader from '../shared/helpers/script-loader';

  import mapConfig from '../shared/config/map';
  import apiKeys from '../shared/config/apis';

  import getMapMarker from '../shared/helpers/map-marker';

  const renderMarkers = (mapHandler, shownStations, activeResource, clickFn) => {

    if (mapHandler === null) {
        // Probably google maps initialization failed
        return [];
    }

    const markers = shownStations.map(it => {
      const marker = new window.google.maps.Marker({
        position: {lat: +it.latitude, lng: +it.longitude},
        icon: getMapMarker(activeResource, it),
        map: mapHandler
      });

      marker.addListener('click', function() {
        clickFn(it.id);
      });

      return marker;
    });

    return markers;
  };

  const initMap = (fns) => {
    const mapHandler = new window.google.maps.Map(document.getElementById('map'), mapConfig);

    mapHandler.addListener('dragstart', fns.onDragstart);
    mapHandler.addListener('dragend', fns.onDragend);
    mapHandler.addListener('zoom_changed', fns.onZoomChanged);

    return mapHandler;
  };

  const loadMap = () => {
    scriptLoader.url(`https://maps.googleapis.com/maps/api/js?key=${apiKeys.googleMaps.key}&callback=mapReady`);
  };

  export default {
    name: 'Map',
    props: [
        'shownStations'
    ],
    data: function () {
        return {
            mapHandler: null,
            markers: []
        }
    },
    components: {},
    watch: {
      mapCenter: function (newVal) {
        var center = new window.google.maps.LatLng(newVal.lat, newVal.lng);
        window.setTimeout(() => { this.mapHandler.panTo(center) }, 300);
      },
      mapHandler: function () {
        this.renderMarkers();
      },
      shownStations: function () {
        if (this.mapHandler !== null) {
          this.renderMarkers();
        }
        else {
            /* eslint-disable no-console */
            console.warn('Map not ready while rendering markers');
        }
      },
      resourceMode: function () {
        this.renderMarkers();
      },
      mechBikeFilter: function () {
        this.renderMarkers();
      },
      elecBikeFilter: function () {
        this.renderMarkers();
      },
    },
    methods: {
      renderMarkers: function () {
        const vm = this;
        this.removeMarkers();
        this.markers = renderMarkers(this.mapHandler, this.shownStations, this.getActiveResource(), function (id) {
            vm.$store.dispatch('stations/selectStation', id);
        });
      },
      removeMarkers() {
        this.markers.map(it => { it.setMap(null) })
      },
      centerChanged (newCenter) {
        this.$store.dispatch('map/changeMapCenter', newCenter);
      },
      getActiveResource() {
        let activeResource = '';
        if (this.resourceMode === 'bikes') {
            if (this.mechBikeFilter && !this.elecBikeFilter) {
              activeResource = 'mechanical_bikes';
            }
            else if (!this.mechBikeFilter && this.elecBikeFilter) {
              activeResource = 'electrical_bikes';
            }
            else {
              activeResource = 'bikes';
            }
        }
        else {
            activeResource = 'slots';
        }

        return activeResource;
      }
    },
    computed: mapState({
      mapCenter: state => state.map.center,
      resourceMode: state => state.filters.resourceMode,
      mechBikeFilter: state => state.filters.mechBikeFilter,
      elecBikeFilter: state => state.filters.elecBikeFilter
    }),
    mounted () {
      loadMap();

      window.mapReady = () => {
        const vm =  this;
        this.mapHandler = initMap({
          onDragstart: function () {
            vm.removeMarkers();
          },
          onDragend: function () {
            vm.centerChanged({
              lat: this.center.lat(),
              lng: this.center.lng()
            });
          },
          onZoomChanged: function () {
            vm.centerChanged({
              lat: this.center.lat(),
              lng: this.center.lng()
            });
          }
        });
      };
    }
  };
</script>

<style lang="scss">
    #map {
        height: 100vh;
    }
    .crosshairIcon {
        position: fixed;
        top: 50vh;
        left: 50vw;
        top: calc(50vh - 12px);
        left: calc(50vw - 12px);
        pointer-events: none;

        &.md-icon.md-theme-default.md-icon-font {
            color: var(--md-theme-default-accent, #ff5252);
        }
    }
</style>
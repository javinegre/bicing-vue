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

  import { ResourceTypesEnum, BikeTypesEnum } from '../shared/enums';

  import scriptLoader from '../shared/helpers/script-loader';

  import mapConfig from '../shared/config/map';
  import apiKeys from '../shared/config/apis';

  import getMapMarker from '../shared/helpers/map-marker';
  import myLocationIcon from '../assets/resource-icons/my-location.svg';

  const getMarkerOpacity = (distance) => {
    const maxDistance = 0.015;
    const minOpacity = 0.5;

    return 1 - (distance * (1 - minOpacity) / maxDistance);
  };

  const renderMarkers = (mapHandler, shownStations, activeResource, clickFn) => {

    if (mapHandler === null) {
        // Probably google maps initialization failed
        return [];
    }

    const markers = shownStations.map(it => {
      const marker = new window.google.maps.Marker({
        position: {lat: it.lat, lng: it.lng},
        icon: getMapMarker(activeResource, it),
        map: mapHandler,
        opacity: getMarkerOpacity(it._distance)
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
            markers: [],
            myLocationMarker: null
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
      myLocation: function (newLocationVal) {
        if ( newLocationVal !== null ) {
            if ( this.myLocationMarker === null ) {
              this.myLocationMarker = new window.google.maps.Marker({
                position: newLocationVal,
                icon: {
                    url: myLocationIcon,
                    anchor: new window.google.maps.Point(10,10),
                    scaledSize: new window.google.maps.Size(20, 20)
                },
                map: this.mapHandler
              })
            }
            else {
              this.myLocationMarker.setPosition(newLocationVal);
            }
        }
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
        if (this.resourceMode === ResourceTypesEnum.bikes) {
            if (this.mechBikeFilter && !this.elecBikeFilter) {
              activeResource = BikeTypesEnum.mech;
            }
            else if (!this.mechBikeFilter && this.elecBikeFilter) {
              activeResource = BikeTypesEnum.elec;
            }
            else {
              activeResource = ResourceTypesEnum.bikes;
            }
        }
        else {
            activeResource = ResourceTypesEnum.docks;
        }

        return activeResource;
      }
    },
    computed: mapState({
      mapCenter: state => state.map.center,
      myLocation: state => state.map.myLocation,
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

        vm.$emit('geo-locate');
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
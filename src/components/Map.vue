<template>
    <div id="map"></div>
</template>

<script>
  import scriptLoader from '../shared/helpers/script-loader';

  import mapConfig from '../shared/config/map';
  import apiKeys from '../shared/config/apis';

  const renderMarkers = (mapHandler, shownStations) => {
    const markers = shownStations.map(it => {
      const marker = new window.google.maps.Marker({
        position: {lat: +it.latitude, lng: +it.longitude},
        label: it._radio === 'inner' ? 'I-' + it.bikes : 'O-' + it.bikes,
        map: mapHandler
      });

      marker.addListener('click', function() {
        /* eslint-disable no-console */
        console.log(it);
      });

      return marker;
    });

    return markers;
  };

  const initMap = (fns) => {
    const mapHandler = new window.google.maps.Map(document.getElementById('map'), mapConfig);

    mapHandler.addListener('dragstart', fns.onDragstart);
    mapHandler.addListener('dragend', fns.onDragend);

    return mapHandler;
  };

  const loadMap = () => {
    scriptLoader.url(`https://maps.googleapis.com/maps/api/js?key=${apiKeys.googleMaps.key}&callback=mapReady`);
  };

  export default {
    name: 'Map',
    props: ['shownStations'],
    data: function () {
        return {
            mapHandler: null,
            markers: []
        }
    },
    components: {},
    watch: {
      mapHandler: function () {
        this.markers = renderMarkers(this.mapHandler, this.shownStations);
      },
      shownStations: function () {
        if (this.mapHandler !== null) {
          this.markers = renderMarkers(this.mapHandler, this.shownStations);
        }
        else {
            /* eslint-disable no-console */
            console.warn('Map not ready while rendering markers');
        }
      }
    },
    methods: {
      removeMarkers() {
        this.markers.map(it => { it.setMap(null) })
      },
      centerChanged (newCenter) {
        this.$emit('center-changed', newCenter);
      }
    },
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
          }
        });
      };
    }
  };
</script>

<style>
    #map {
        height: 100vh;
    }
</style>
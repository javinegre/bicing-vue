<template>
    <div id="map"></div>
</template>

<script>
  import scriptLoader from '../shared/helpers/script-loader';

  import mapConfig from '../shared/config/map';
  import apiKeys from '../shared/config/apis';

  window.mapReady = () => {
    console.log('map ready');
    const map = new google.maps.Map(document.getElementById('map'), mapConfig);
  };

  scriptLoader.url(`https://maps.googleapis.com/maps/api/js?key=${apiKeys.googleMaps.key}&callback=mapReady`);

  export default {
    name: 'Map',
    components: {}
  }
</script>

<style>
    #map {
        height: 100vh;
    }
</style>
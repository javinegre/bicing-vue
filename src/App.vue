<template>
  <div id="app">
    <Map />
  </div>
</template>

<script>
  import Map from './components/Map.vue';

  export default {
    name: 'app',
    components: {
      Map
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

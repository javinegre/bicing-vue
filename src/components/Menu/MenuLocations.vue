<template>
    <div class="menu-locations">
        <md-button class="md-icon-button md-dense md-raised" @click="geoLocate">
            <md-icon>my_location</md-icon>
        </md-button>
        <md-button class="md-icon-button md-dense md-raised" @click="gotoCoords" data-coords="">
            <md-icon>home</md-icon>
        </md-button>
        <md-button class="md-icon-button md-dense md-raised" @click="gotoCoords" data-coords="">
            <md-icon>work</md-icon>
        </md-button>
        <md-button class="md-icon-button md-dense md-raised" @click="gotoCoords" data-coords="">
            <md-icon>star</md-icon>
        </md-button>
    </div>
</template>

<script>
  export default {
    name: 'MenuLocations',
    methods: {
      changeCenter (coords) {
        this.$emit('center-changed', coords);
      },
      geoLocate () {
        if ( 'geolocation' in navigator ) {
          navigator.geolocation.getCurrentPosition((pos) => {
            this.changeCenter({
              lat: pos.coords.latitude,
              lng: pos.coords.longitude
            });
          },(error) => {
              /* eslint-disable no-console */
            console.log(error);
          }, {
            timeout : 10000,
            maximumAge: 60000
          });
        }
      },
      gotoCoords (ev) {
        const newCoords = ev.currentTarget.dataset.coords.split(',');
        this.changeCenter({
          lat: newCoords[0],
          lng: newCoords[1]
        });
      }
    }
  }
</script>

<style lang="scss">
    .menu-locations {
        display: flex;
        flex-direction: column-reverse;
        position: absolute;
        bottom: 76px;
        left: 14px;

        .md-button {
            margin: 0;

        & + .md-button {
                margin-bottom: 8px;
            }
        }
    }
</style>

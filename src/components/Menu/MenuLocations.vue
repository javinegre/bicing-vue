<template>
    <div class="menu-locations">
        <md-button class="md-icon-button md-dense md-raised" @click="geoLocate">
            <md-icon v-if="!isGeoLocationLoading">my_location</md-icon>
            <span v-if="isGeoLocationLoading">
                <md-progress-spinner :md-stroke="2" :md-diameter="12" md-mode="indeterminate"></md-progress-spinner>
            </span>
        </md-button>
        <md-button
            class="md-icon-button md-dense md-raised"
            v-longpress="setCurrentCenter('location-home')"
            @click="gotoCoords('location-home')">
            <md-icon>home</md-icon>
        </md-button>
        <md-button
            class="md-icon-button md-dense md-raised"
            v-longpress="setCurrentCenter('location-work')"
            @click="gotoCoords('location-work')">
            <md-icon>work</md-icon>
        </md-button>
        <md-button
            class="md-icon-button md-dense md-raised"
            v-longpress="setCurrentCenter('location-fav')"
            @click="gotoCoords('location-fav')">
            <md-icon>star</md-icon>
        </md-button>
        <md-snackbar :md-duration="4000" :md-active.sync="showSnackbar" md-persistent>
            <span>{{snackbarMessage}}</span>
            <md-button class="md-primary" @click="showSnackbar = false">Close</md-button>
        </md-snackbar>
    </div>
</template>

<script>
  import Vue from 'vue';
  import { mapState } from 'vuex';

  import { MdProgress, MdSnackbar } from 'vue-material/dist/components';

  Vue.use(MdProgress);
  Vue.use(MdSnackbar);

  import longpress from '../../directives/event-longpress';

  const getLocationSavedMessage = function (type) {
    let message = '';

    switch (type) {
      case 'location-home':
        message = 'Home location set!';
        break;
      case 'location-work':
        message = 'Work location set!';
        break;
      case 'location-fav':
        message = 'Favorite location set!';
        break;
      default:
        message = 'Location set!';
    }

    return message;
  }

  export default {
    name: 'MenuLocations',
    props: [],
    data: function () {
      return {
        showSnackbar: false,
        snackbarMessage: ''
      }
    },
    methods: {
      setCurrentCenter: function (type) {
        return function () {
          localStorage[type] = JSON.stringify(this.mapCenter);
          this.snackbarMessage = getLocationSavedMessage(type);
          this.showSnackbar = true;
        }.bind(this);
      },
      gotoCoords (type) {
        if (localStorage[type]) {
          this.$store.dispatch('map/changeMapCenter', JSON.parse(localStorage[type]));
        }
        else {
          this.setCurrentCenter(type)();
        }
      },
      geoLocate () {
        this.$emit('geo-locate');
      }
    },
    directives: {
      longpress
    },
    computed: mapState({
      mapCenter: state => state.map.center,
      isGeoLocationLoading: state => state.loading.geoLocation
    })
  }
</script>

<style lang="scss">
    .menu-locations {
        display: flex;
        flex-direction: column-reverse;
        position: absolute;
        bottom: 76px;
        right: 14px;

        .md-button {
            margin: 0;

        & + .md-button {
                margin-bottom: 8px;
            }
        }
    }
</style>

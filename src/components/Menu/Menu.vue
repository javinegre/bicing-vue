<template>
    <section class="menu">
        <div class="menu-reload">
            <md-button class="md-fab"
                @click="refresh"
                v-bind:style="{ filter: `saturate(${refreshButtonSaturation})` }">
                <md-icon v-if="!isLoadingData">refresh</md-icon>
                <span v-if="isLoadingData">
                    <md-progress-spinner :md-stroke="3" :md-diameter="20" md-mode="indeterminate"></md-progress-spinner>
                </span>
            </md-button>
        </div>
        <MenuResources />
        <MenuLocations
            @geo-locate="geoLocate" />
    </section>
</template>

<script>
  import Vue from 'vue';
  import { mapState } from 'vuex';

  import { MdButton, MdIcon, MdProgress } from 'vue-material/dist/components';

  Vue.use(MdButton);
  Vue.use(MdIcon);
  Vue.use(MdProgress);

  import MenuLocations from './MenuLocations.vue';
  import MenuResources from './MenuResources.vue';

  export default {
    name: 'Menu',
    components: {
      MenuLocations,
      MenuResources
    },
    data: function () {
        return {
            refreshButtonSaturation: 1,
            refreshButtonStyleIntervalId: null,
            refreshButtonStyleTimespan: 5 // minutes
        }
    },
    props: [
      'resourceMode',
      'mechBikeFilter',
      'elecBikeFilter'
    ],
    methods: {
        refresh () {
            this.$store.dispatch('stations/getAllStations');
        },
        calculateRefreshButtonSaturation () {
          const now = +new Date();
          const timespan = this.refreshButtonStyleTimespan * 60 * 1000;
          this.refreshButtonSaturation = Math.min((now - this.lastUpdate) / timespan, 1);
        },
        geoLocate () {
            this.$emit('geo-locate');
        }
    },
    watch: {
      lastUpdate: function () {
        this.calculateRefreshButtonSaturation();
      }
    },
    computed: mapState({
      lastUpdate: state => state.stations.lastUpdate,
      isLoadingData: state => state.loading.app
    }),
    created() {
        this.refreshButtonStyleIntervalId = window.setInterval(
            this.calculateRefreshButtonSaturation.bind(this),
            20 * 1000
        );
    },
    beforeDestroy() {
        window.clearInterval(this.refreshButtonStyleIntervalId);
    }
  }
</script>

<style lang="scss">
    .menu {
        position: fixed;
        bottom: 8px;
        right: 0;

        .md-progress-spinner.md-theme-default {
            filter: saturate(0) brightness(1.5);
        }
    }
</style>
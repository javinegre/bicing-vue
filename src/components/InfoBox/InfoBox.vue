<template>
    <section class="infoBox" v-bind:class="{ 'infoBox--loading': isLoadingData }">
        <div class="infoBox-row infoBox-updateTime"
            @click="refresh">
            <span class="infoBox-updateTime-label">Last updated </span>
            <span class="infoBox-updateTime-time" v-bind:class="{ 'infoBox-updateTime-time--outdated': timeOutdated }">
                {{ getTimeString(lastUpdate) }}
            </span>
        </div>
        <InfoBoxResources class="infoBox-row"
            v-bind:shownStations="shownStations" />
    </section>
</template>

<script>
  import { mapState } from 'vuex';

  import InfoBoxResources from './InfoBoxResources.vue';

  import getTimeString from '../../shared/helpers/get-time-string';

  export default {
    name: 'InfoBox',
    props: [
      'shownStations'
    ],
    components: {
        InfoBoxResources
    },
    data() {
        return {
            timeOutdated: true,
            nowIntervalId: null
        }
    },
    methods: {
      getTimeString,
      refresh () {
        this.$store.dispatch('stations/getAllStations');
      },
      updateTime () {
        this.getTimeString();
        this.checkTimeOutdated();
      },
      checkTimeOutdated () {
        this.timeOutdated = (+new Date()) - this.lastUpdate > 300000; // 5 min
      }
    },
    watch: {
      lastUpdate: function () {
        this.updateTime();
      }
    },
    computed: mapState({
      lastUpdate: state => state.stations.lastUpdate,
      isLoadingData: state => state.loading.app
    }),
    created() {
      this.updateTime();
      this.nowIntervalId = window.setInterval(
        this.updateTime.bind(this),
        20 * 1000
      );
    },
    beforeDestroy() {
      window.clearInterval(this.nowIntervalId);
    }
  }
</script>

<style lang="scss">
    .infoBox {
        position: fixed;
        top: 12px;
        left: 12px;
        font-size: 12px;
        transition: opacity 600ms ease;

        &-row {
             background-color: rgba(255,255,255,.92);
             border-radius: 4px;
             margin-bottom: 8px;
             padding: 4px 8px;
             box-shadow: 0px 2px 4px 1px rgba(0,0,0,.2);
        }

        &--loading {
            opacity: 0.3;
             transition: opacity 200ms ease;
        }

        &-updateTime {
            &-time {
                font-weight: 500;
                margin-right: 4px;

                 &--outdated {
                    color: var(--md-theme-default-accent, #ff5252);
                 }
            }

            &-label {
                font-weight: 300;
            }
        }
    }
</style>

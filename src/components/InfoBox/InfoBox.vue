<template>
    <section class="infoBox">
        <div class="infoBox-row infoBox-updateTime">
            <span class="infoBox-updateTime-time">{{ formatTime(lastUpdate) }}</span>
            <span class="infoBox-updateTime-label">last updated</span>
        </div>
        <InfoBoxResources class="infoBox-row"
            v-bind:shownStations="shownStations" />
    </section>
</template>

<script>
  import { mapState } from 'vuex';

  import InfoBoxResources from './InfoBoxResources.vue';

  import formatTime from '../../shared/helpers/format-time';

  export default {
    name: 'InfoBox',
    props: [
      'shownStations'
    ],
    components: {
        InfoBoxResources
    },
    methods: {
      formatTime
    },
    computed: mapState({
      lastUpdate: state => state.stations.lastUpdate
    })
  }
</script>

<style lang="scss">
    .infoBox {
        position: fixed;
        top: 12px;
        left: 12px;
        font-size: 12px;

        &-row {
             background-color: rgba(255,255,255,.92);
             border-radius: 4px;
             margin-bottom: 8px;
             padding: 4px 8px;
             box-shadow: 0px 2px 4px 1px rgba(0,0,0,.2);
        }

        &-updateTime {
            &-time {
                font-weight: 500;
                margin-right: 4px;
            }

            &-label {
                font-weight: 300;
            }
        }
    }
</style>

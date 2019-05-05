<template>
    <section class="infoBox">
        <div class="infoBox-row infoBox-updateTime">
            <span class="infoBox-updateTime-time">{{ formatTime(lastUpdate) }}</span>
            <span class="infoBox-updateTime-label">last updated</span>
        </div>
        <InfoBoxResources class="infoBox-row"
            v-bind:shownStations="shownStations"
            v-bind:resourceMode="resourceMode"
            v-bind:mechBikeFilter="mechBikeFilter"
            v-bind:elecBikeFilter="elecBikeFilter" />
    </section>
</template>

<script>
  import InfoBoxResources from './InfoBoxResources.vue';

  import formatTime from '../../shared/helpers/format-time';

  export default {
    name: 'InfoBox',
    props: [
      'shownStations',
      'resourceMode',
      'mechBikeFilter',
      'elecBikeFilter',
      'lastUpdate'
    ],
    components: {
        InfoBoxResources
    },
    methods: {
      formatTime
    }
  }
</script>

<style lang="scss">
    .infoBox {
        position: fixed;
        top: 12px;
        left: 12px;
        font-size: 12px;

        &-row {
             background-color: rgba(255,255,255,.9);
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

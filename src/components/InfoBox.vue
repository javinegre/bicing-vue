<template>
    <section class="infoBox">
        <div class="infoBox-row">
            Last update: {{ formatTime(lastUpdate) }}
        </div>
        <div class="infoBox-row" style="font-size: 12px">
            <table style="text-align: right; width: 100%; color: #d0d0d0;">
                <thead>
                    <td><md-icon>local_parking</md-icon></td>
                    <td><md-icon>directions_bike</md-icon></td>
                    <td><md-icon>settings</md-icon> + <md-icon>power</md-icon></td>
                </thead>
                <tr>
                    <td v-bind:class="{ 'cell-highlight': resourceMode === 'slots' }">
                        {{ getResources('inner')[3] }}
                    </td>
                    <td v-bind:class="{ 'cell-highlight': resourceMode === 'bikes' && mechBikeFilter && elecBikeFilter }">
                        {{ getResources('inner')[0] }}
                    </td>
                    <td>
                        (
                        <span v-bind:class="{ 'cell-highlight': resourceMode === 'bikes' && mechBikeFilter }">
                            {{ getResources('inner')[1] }}
                        </span>
                        +
                        <span v-bind:class="{ 'cell-highlight': resourceMode === 'bikes' && elecBikeFilter }">
                            {{ getResources('inner')[2] }}
                        </span>
                        )
                    </td>
                </tr>
            </table>
        </div>
    </section>
</template>

<script>
  import Vue from 'vue';

  import { MdIcon } from 'vue-material/dist/components';

  import formatTime from '../shared/helpers/format-time';

  Vue.use(MdIcon);

  export default {
    name: 'InfoBox',
    props: [
      'shownStations',
      'resourceMode',
      'mechBikeFilter',
      'elecBikeFilter',
      'lastUpdate'
    ],
    methods: {
      formatTime,
      getResources: function (radio) {
        const resSum = this.shownStations.filter(it => it._radio === radio).reduce((sum, it) => {
          const result = [
            sum[0] + +it.bikes,
            sum[1] + +it.mechanical_bikes,
            sum[2] + +it.electrical_bikes,
            sum[3] + +it.slots
          ];
          return result;
        },[0,0,0,0]);

        return resSum;
      },
    }
  }
</script>

<style lang="scss">
    .infoBox {
        position: fixed;
        top: 12px;
        left: 12px;

        &-row {
             background-color: rgba(255,255,255,.9);
             border-radius: 4px;
             margin-bottom: 8px;
             padding: 4px 8px;
             box-shadow: 0px 2px 4px 1px rgba(0,0,0,.2);
        }

        &-resource {
            &-item {
                min-width: 30px;
            }
        }

        .md-icon {
            width: 14px;
            min-width: 14px;
            height: 14px;
            font-size: 14px!important;
        }

        tr {
            font-weight: 600;
        }

        .cell-highlight {
            color: #111111;
        }
    }
</style>

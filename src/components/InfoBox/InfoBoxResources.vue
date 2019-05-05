<template>
    <div class="infoBox-availability">
        <div class="infoBox-availability-col infoBox-availability-col--info"
             v-bind:class="{ 'col-highlight': resourceMode === 'bikes' && mechBikeFilter && elecBikeFilter }">
            <div>
                <md-icon>directions_bike</md-icon>
            </div>
            <div>
                {{ getResources('inner')[0] }}
            </div>
        </div>
        <div class="infoBox-availability-col">
            <div>(</div>
            <div>(</div>
        </div>
        <div class="infoBox-availability-col infoBox-availability-col--info"
             v-bind:class="{ 'col-highlight': resourceMode === 'bikes' && mechBikeFilter }">
            <div>
                <md-icon>settings</md-icon>
            </div>
            <div>
                {{ getResources('inner')[1] }}
            </div>
        </div>
        <div class="infoBox-availability-col">
            <div>+</div>
            <div>+</div>
        </div>
        <div class="infoBox-availability-col infoBox-availability-col--info"
             v-bind:class="{ 'col-highlight': resourceMode === 'bikes' && elecBikeFilter }">
            <div>
                <md-icon>power</md-icon>
            </div>
            <div>
                {{ getResources('inner')[2] }}
            </div>
        </div>
        <div class="infoBox-availability-col">
            <div>)</div>
            <div>)</div>
        </div>
        <div class="infoBox-availability-col infoBox-availability-col--divider"></div>
        <div class="infoBox-availability-col infoBox-availability-col--info"
             v-bind:class="{ 'col-highlight': resourceMode === 'slots' }">
            <div>
                <md-icon>local_parking</md-icon>
            </div>
            <div>
                {{ getResources('inner')[3] }}
            </div>
        </div>
    </div>
</template>

<script>
  import Vue from 'vue';

  import { MdIcon } from 'vue-material/dist/components';

  Vue.use(MdIcon);

  export default {
    name: 'InfoBoxResources',
    props: [
      'shownStations',
      'resourceMode',
      'mechBikeFilter',
      'elecBikeFilter'
    ],
    methods: {
      getResources: function (radio) {
        const resSum = this.shownStations.filter(it => it._radio === radio && it.status === 1).reduce((sum, it) => {
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
        &-availability {
            display: flex;

            &-col {
                color: #c0c0c0;
                text-align: center;

                &--info {
                    margin: 0 4px;
                }

                &--divider {
                    margin: 2px 4px 2px 8px;
                    border-left: 1px solid #e0e0e0;
                }
            }
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

            &.md-theme-default.md-icon-font {
                color: #c0c0c0;
            }
        }

        .col-highlight {
            color: #111111;
            font-weight: 600;

            .md-icon.md-theme-default.md-icon-font {
                color: #606060;
            }
        }
    }
</style>
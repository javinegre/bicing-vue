<template>
    <div class="infoBox-availability"
        @click="showStationsInfo">

        <div class="infoBox-availability-block"
             v-bind:class="{ 'block-highlight': resourceMode === ResourceTypesEnum.docks }">
            <div class="infoBox-availability-col infoBox-availability-col--info"
                v-bind:class="{ 'col-highlight': resourceMode === ResourceTypesEnum.docks }">
                <div>
                    <md-icon>local_parking</md-icon>
                </div>
                <div>
                    {{ getResources('inner')[3] }}
                </div>
            </div>
        </div>

        <div class="infoBox-availability-block"
             v-bind:class="{ 'block-highlight': resourceMode === ResourceTypesEnum.bikes }">
            <div class="infoBox-availability-col infoBox-availability-col--info"
                 v-bind:class="{ 'col-highlight': resourceMode === ResourceTypesEnum.bikes && mechBikeFilter && elecBikeFilter }">
                <div>
                    <md-icon>directions_bike</md-icon>
                </div>
                <div>
                    {{ getResources('inner')[0] }}
                </div>
            </div>
            <div class="infoBox-availability-col infoBox-availability-col--divider"></div>
            <div class="infoBox-availability-col infoBox-availability-col--info"
                 v-bind:class="{ 'col-highlight': resourceMode === ResourceTypesEnum.bikes && mechBikeFilter }">
                <div>
                    <md-icon>settings</md-icon>
                </div>
                <div>
                    {{ getResources('inner')[1] }}
                </div>
            </div>
            <div class="infoBox-availability-col">
                <div>+</div>
            </div>
            <div class="infoBox-availability-col infoBox-availability-col--info"
                 v-bind:class="{ 'col-highlight': resourceMode === ResourceTypesEnum.bikes && elecBikeFilter }">
                <div>
                    <md-icon>power</md-icon>
                </div>
                <div>
                    {{ getResources('inner')[2] }}
                </div>
            </div>
        </div>

    </div>
</template>

<script>
  import Vue from 'vue';
  import { mapState } from 'vuex';

  import { MdIcon } from 'vue-material/dist/components';

  import { ResourceTypesEnum, BikeTypesEnum } from '../../shared/enums';

  Vue.use(MdIcon);

  export default {
    name: 'InfoBoxResources',
    props: [
      'shownStations'
    ],
    data: function () {
        return {
            ResourceTypesEnum
        };
    },
    methods: {
      getResources: function (radio) {
        const resSum = this.shownStations.filter(it => it._radio === radio && it.status === 1).reduce((sum, it) => {
          const result = [
            sum[0] + it[ResourceTypesEnum.bikes],
            sum[1] + it[BikeTypesEnum.mech],
            sum[2] + it[BikeTypesEnum.elec],
            sum[3] + it[ResourceTypesEnum.docks]
          ];
          return result;
        },[0,0,0,0]);

        return resSum;
      },
      showStationsInfo: function () {
        this.$store.dispatch('stations/selectStation', -1);
      }
    },
    computed: mapState({
      resourceMode: state => state.filters.resourceMode,
      mechBikeFilter: state => state.filters.mechBikeFilter,
      elecBikeFilter: state => state.filters.elecBikeFilter
    })
  }
</script>

<style lang="scss">
    .infoBox {
        &-availability {
            display: inline-flex;

            &-block {
                display: flex;
                padding: 2px 6px;
                background-color: #f0f0f0;

                &:nth-of-type(1) {
                    border-top-left-radius: 4px;
                    border-bottom-left-radius: 4px;
                }
                &:nth-of-type(2) {
                     border-top-right-radius: 4px;
                     border-bottom-right-radius: 4px;
                }
            }

            &-col {
                color: #d0d0d0;
                text-align: center;
                align-self: center;

                &--info {
                    margin: 0 2px;
                }

                &--divider {
                    height: calc(100% - 16px);
                    border-left: 1px solid #e0e0e0;
                     margin: 0px 6px;
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
                color: #d0d0d0;
            }
        }

        .block-highlight {
            background-color: #ffffff;
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
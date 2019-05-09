<template>
    <md-drawer :md-active.sync="show" @md-closed="close" class="root" ref="stationInfoScrollContainer">
        <div>
            <div class="station-selected"
                v-if="stationInfo"
                v-bind:class="{ 'station--disabled': stationInfo.status === 0 }">
                <h3>{{stationInfo.streetName.replace(/[0-9]*\s-\s/, '')}}</h3>
                <div class="resource-bar--selected">
                    <div class="mech-bar" v-bind:style="{ width: getBarWidth(stationInfo, 'mechanical_bikes') }"></div>
                    <div class="elec-bar" v-bind:style="{ width: getBarWidth(stationInfo, 'electrical_bikes') }"></div>
                    <div class="slots-bar" v-bind:style="{ width: getBarWidth(stationInfo, 'slots') }"></div>
                </div>
                <div class="resource-numbers">
                    <div class="resource-numbers-bikes">
                        <div class="resource-numbers-bikes-total">
                            <md-icon>directions_bike</md-icon>
                            {{stationInfo.bikes}}
                        </div>
                        <div class="resource-numbers-bikes-mech">
                            <md-icon>settings</md-icon>
                            {{stationInfo.mechanical_bikes}}
                        </div>
                        <div class="resource-numbers-bikes-elec">
                            <md-icon>power</md-icon>
                            {{stationInfo.electrical_bikes}}
                        </div>
                    </div>
                    <div class="resource-numbers-slots">
                        {{stationInfo.slots}}
                        <md-icon>local_parking</md-icon>
                    </div>
                </div>
            </div>
            <div class="station-closest">
                <h4>Closest stations</h4>
                <ul class="nearby-list">
                    <li v-for="station in shownStations.filter(filterInner(selectedStation)).sort(sortByDistance)"
                        v-bind:key="station.id"
                        v-bind:class="{ 'station--disabled': station.status === 0 }"
                        class="nearby-station"
                        @click="selectStation(station.id)">
                        {{ station.streetName.replace(/[0-9]*\s-\s/, '') }}
                        <div class="resource-bar--other">
                            <div class="mech-bar" v-bind:style="{ width: getBarWidth(station, 'mechanical_bikes') }"></div>
                            <div class="elec-bar" v-bind:style="{ width: getBarWidth(station, 'electrical_bikes') }"></div>
                            <div class="slots-bar" v-bind:style="{ width: getBarWidth(station, 'slots') }"></div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="station-nearby">
                <h4>Nearby stations (in a ~15 min range)</h4>
                <ul class="nearby-list">
                    <li v-for="station in shownStations.filter(filterOuter(selectedStation)).sort(sortByDistance)"
                        v-bind:key="station.id"
                        v-bind:class="{ 'station--disabled': station.status === 0 }"
                        class="nearby-station"
                        @click="selectStation(station.id)">
                        {{ station.streetName.replace(/[0-9]*\s-\s/, '') }}
                        <div class="resource-bar--other">
                            <div class="mech-bar" v-bind:style="{ width: getBarWidth(station, 'mechanical_bikes') }"></div>
                            <div class="elec-bar" v-bind:style="{ width: getBarWidth(station, 'electrical_bikes') }"></div>
                            <div class="slots-bar" v-bind:style="{ width: getBarWidth(station, 'slots') }"></div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </md-drawer>
</template>

<script>
  import Vue from 'vue';

  import { MdDrawer, MdIcon } from 'vue-material/dist/components';

  Vue.use(MdDrawer);
  Vue.use(MdIcon);

  export default {
    name: 'StationInfo',
    props: [
        'selectedStation',
        'shownStations',
        'resourceMode',
        'mechBikeFilter',
        'elecBikeFilter'
    ],
    data: function () {
        return {
          stationInfo: null,
          show: false
        };
    },
    watch: {
      selectedStation: function () {
        this.stationInfo = this.shownStations.find(it => it.id === this.selectedStation) || null;
        this.show = this.selectedStation !== null;
      }
    },
    methods: {
        scrollToTop: function () {
          this.$refs.stationInfoScrollContainer.$el.scrollTop = 0;
        },
        close: function () {
            this.$emit('select-station', null);
        },
        selectStation: function (id) {
          this.$emit('select-station', id);
          this.scrollToTop();
        },
        sortByDistance: (a, b) => a._distance - b._distance,
        filterInner: st => it => it.id !== st && it._radio === 'inner',
        filterOuter: st => it => it.id !== st && it._radio === 'outer',
        getBarWidth: function (data, resource) {
          let resourceNumber = data[resource]
          let total = +data.mechanical_bikes + +data.electrical_bikes + +data.slots; // TODO: check data integrity in service

          if (total === 0) {
            total = 1; // prevents division by 0
            if (resource === 'slots') {
              resourceNumber = 1; // makes entire bar gray
            }
          }

          const perc = resourceNumber / (total || 1) * 100;
          return `${perc}%`;
        }
    }
  }
</script>

<style lang="scss">
    .root {}

    .station-selected {
        padding: 32px 8px 32px;

        h3 {
            margin: 0 0 .5em 0;
        }

        .resource-numbers {
            display: flex;
            justify-content: space-between;
            font-size: 32px;
            line-height: 32px;

            &-bikes {
                display: flex;

                .md-icon {
                    margin-right: -4px;
                }

                &-total {
                    margin-right: 12px;
                }

                &-mech {
                    font-size: 18px;
                    margin-right: 8px;
                }

                &-elec {
                     font-size: 18px;
                }
            }

            &-slots {
                .md-icon {
                    margin-left: -4px;
                 }
            }
        }

        .md-icon {
            position: relative;
            top: -2px;
            width: 18px;
            min-width: 18px;
            height: 18px;
            margin-right: 0px;
            font-size: 18px !important;
            color: #b0b0b0 !important;
        }
    }

    .station-closest {
        position: relative;
        padding: 20px 16px;
        background-color: #f8f8f8;
        box-shadow: 0px 10px 10px -10px inset rgba(0,0,0,0.2);
    }

    .station-nearby {
        position: relative;
        padding: 20px 16px;
        background-color: #e0e0e0;
        box-shadow: 0px 10px 10px -10px inset rgba(0,0,0,0.2);
    }

    .station-closest,
    .station-nearby {
        h4 {
            position: relative;
            margin: 0 0 20px 0;
            font-size: 16px;
            line-height: 24px;
            font-weight: 400;
            letter-spacing: -.03em;
        }
    }

    .nearby-list {
        list-style: none;
        margin: 0;
        padding: 0;
    }

    .nearby-station {
        padding: 8px 0;
        font-size: 12px;
        color: #505050;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .resource-bar {
        &--selected {
             display: flex;
             width: 100%;
             height: 6px;
             margin-bottom: 8px;
        }
        &--other {
             display: flex;
             width: 100%;
             height: 2px;
             margin-bottom: 8px;
        }
    }

    .mech-bar {
        height: 100%;
        background-color: crimson;
    }
    .elec-bar {
         height: 100%;
         background-color: gold;
     }
     .slots-bar {
          height: 100%;
          background-color: gray;
      }

      .station--disabled {
        opacity: .2;
      }
</style>
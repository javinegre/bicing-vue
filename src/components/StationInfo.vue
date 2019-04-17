<template>
    <md-drawer :md-active.sync="show" @md-closed="close" >
        <div v-if="stationInfo">
            <div>
                <h3>{{stationInfo.streetName}}</h3>
                <div>Bikes: {{stationInfo.bikes}}</div>
                <div>Mech: {{stationInfo.mechanical_bikes}}</div>
                <div>Elec: {{stationInfo.electrical_bikes}}</div>
                <div>Slots: {{stationInfo.slots}}</div>
            </div>
            <div>
                <h4>Nearby stations:</h4>
                <ul>
                    <li v-for="station in shownStations.filter(filterInner(selectedStation)).sort(sortByDistance)"
                        @click="selectStation(station.id)">
                        {{ station.streetName }}
                    </li>
                </ul>
                <h4>Nearby stations (in a ~15 min range)</h4>
                <ul>
                    <li v-for="station in shownStations.filter(filterOuter(selectedStation)).sort(sortByDistance)"
                        @click="selectStation(station.id)">
                        {{ station.streetName }}
                    </li>
                </ul>
            </div>
        </div>
    </md-drawer>
</template>

<script>
  import Vue from 'vue';

  import { MdDrawer } from 'vue-material/dist/components';

  Vue.use(MdDrawer);

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
        this.show = this.stationInfo !== null;
      }
    },
    methods: {
        close: function () {
            this.$emit('select-station', null);
        },
        selectStation: function (id) {
          this.$emit('select-station', id);
        },
        sortByDistance: (a, b) => a._distance - b._distance,
        filterInner: st => it => it.id !== st && it._radio === 'inner',
        filterOuter: st => it => it.id !== st && it._radio === 'outer',
    }
  }
</script>

<style lang="scss">

</style>
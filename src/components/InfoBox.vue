<template>
    <div class="infoBox">
        {{ formatTime(lastUpdate) }}
        <br />
        {{ getResources('inner') }}
        <br />
        {{ getResources('outer') }}
    </div>
</template>

<script>
  import formatTime from '../shared/helpers/format-time';

  export default {
    name: 'InfoBox',
    props: [
      'shownStations',
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

        return `${resSum[0]}-${resSum[1]}-${resSum[2]}-${resSum[3]}`;
      },
    }
  }
</script>

<style>
    .infoBox {
        position: fixed;
        top: 12px;
        left: 12px;
        background-color: rgba(255,255,255,.8);
        padding: 8px;
        border-radius: 4px;
    }
</style>

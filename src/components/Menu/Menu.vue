<template>
    <section class="menu">
        <div class="menu-reload">
            <md-button class="md-fab" @click="refresh">
                <md-icon>refresh</md-icon>
            </md-button>
        </div>
        <MenuResources
            v-bind:resourceMode="resourceMode"
             v-bind:mechBikeFilter="mechBikeFilter"
             v-bind:elecBikeFilter="elecBikeFilter"
             @resource-filter-changed="onResourceFilterChanged" />
        <MenuLocations @center-changed="onCenterChanged" />
    </section>
</template>

<script>
  import Vue from 'vue';

  import { MdButton, MdIcon } from 'vue-material/dist/components';

  Vue.use(MdButton);
  Vue.use(MdIcon);

  import MenuLocations from './MenuLocations.vue';
  import MenuResources from './MenuResources.vue';

  export default {
    name: 'Menu',
    components: {
      MenuLocations,
      MenuResources
    },
    props: [
      'resourceMode',
      'mechBikeFilter',
      'elecBikeFilter'
    ],
    methods: {
        refresh () {
            this.$emit('refresh-list');
        },
        onCenterChanged (coords) {
          this.$emit('center-changed', coords);
        },
        onResourceFilterChanged (data) {
          this.$emit('resource-filter-changed', data);
        }
    }
  }
</script>

<style lang="scss">
    .menu {
        position: fixed;
        bottom: 20px;
        left: 8px;
    }
</style>
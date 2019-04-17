<template>
    <section class="menu">
        <div class="menu-reload">
            <md-button class="md-fab" @click="refresh">
                <md-icon>refresh</md-icon>
            </md-button>
        </div>
        <div class="menu-resources">
            <div>
                <md-icon>local_parking</md-icon>
                <md-switch class="md-primary switch-resource" v-model="resourceVal" />
                <md-icon>directions_bike</md-icon>
            </div>
            <span class="divider"></span>
            <div class="menu-resources-bikeType" v-bind:class="{ 'menu-resources-bikeType--disabled': resourceMode === 'slots' }">
                <md-icon>settings</md-icon>
                <md-switch class="md-primary switch-bikeType" v-model="mechBikeVal" :disabled="resourceMode === 'slots'" />
            </div>
            <div class="menu-resources-bikeType" v-bind:class="{ 'menu-resources-bikeType--disabled': resourceMode === 'slots' }">
                <md-icon>power</md-icon>
                <md-switch class="md-primary switch-bikeType" v-model="elecBikeVal" :disabled="resourceMode === 'slots'" />
            </div>
        </div>
    </section>
</template>

<script>
  import Vue from 'vue';

  import { MdButton, MdIcon, MdSwitch } from 'vue-material/dist/components';

  Vue.use(MdButton);
  Vue.use(MdIcon);
  Vue.use(MdSwitch);

  export default {
    name: 'Menu',
    props: [
      'resourceMode',
      'mechBikeFilter',
      'elecBikeFilter'
    ],
    data: function () {
        return {
            resourceVal: true,
            mechBikeVal: true,
            elecBikeVal: true
        };
    },
    watch: {
      resourceVal: function (newVal) {
        this.$emit('resource-filter-changed', {type: 'resourceMode', value: newVal});
      },
      mechBikeVal: function (newVal) {
        this.$emit('resource-filter-changed', {type: 'mechBikeFilter', value: newVal});
      },
      elecBikeVal: function (newVal) {
        this.$emit('resource-filter-changed', {type: 'elecBikeFilter', value: newVal});
      }
    },
    methods: {
        refresh () {
            this.$emit('refresh-list');
        }
    }
  }
</script>

<style lang="scss">
    .menu {
        position: fixed;
        /*display: flex;*/
        bottom: 20px;
        left: 8px;
        /*align-items: center;*/

        &-resources {
            position: absolute;
             top: 14px;
             left: 72px;
             width: 264px;
            display: flex;
            height: 44px;
            padding: 8px 18px 8px 10px;
            align-items: center;
            border-radius: 22px;
            background-color: rgba(255,255,255,.8);
            box-shadow: 0px 2px 4px 1px rgba(0,0,0,.2);

            &-bikeType {
                margin-right: 8px;
                transition: opacity 200ms ease;

                &--disabled {
                    opacity: 0.2;
                }

                &:last-child {
                    margin-right: 0;
                }
            }

            .md-switch {
                position: relative;
                top: 4px;
                margin: 0;

                &.switch-resource {
                 margin: 0 8px;
                }

                &.switch-bikeType {
                     margin-left: 2px;
                 }
            }

            .md-icon {
                position: relative;
                top: -2px;
                width: 20px;
                min-width: 20px;
                height: 20px;
                font-size: 20px!important;
            }
        }
    }

    .divider {
        display: block;
        width: 1px;
        height: 100%;
        margin: 0 12px;
        border-left: 1px solid #808080;
    }
</style>
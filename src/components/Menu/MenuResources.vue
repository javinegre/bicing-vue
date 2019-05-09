<template>
    <div class="menu-resources">
        <div style="display: flex;">
            <md-icon>local_parking</md-icon>
            <md-switch class="md-primary switch-resource" v-model="resourceVal" />
            <md-icon>directions_bike</md-icon>
        </div>
        <span class="divider"></span>
        <md-button class="md-icon-button menu-resources-bikeType menu-resources-bikeType-mech"
            v-bind:class="{
                'menu-resources-bikeType--active': mechBikeVal,
                'menu-resources-bikeType--disabled': resourceMode === 'slots'
            }"
            @click="switchFilter('mech')">
            <md-icon class="menu-resources-filter-icon">settings</md-icon>
            <span class="menu-resources-filter-state">
                <span v-if="mechBikeVal"><md-icon>check</md-icon></span>
                <span v-else><md-icon>close</md-icon></span>
            </span>
        </md-button>
        <md-button class="md-icon-button menu-resources-bikeType menu-resources-bikeType-elec"
            v-bind:class="{
                'menu-resources-bikeType--active': elecBikeVal,
                'menu-resources-bikeType--disabled': resourceMode === 'slots'
            }"
            @click="switchFilter('elec')">
            <md-icon class="menu-resources-filter-icon">power</md-icon>
            <span class="menu-resources-filter-state">
                <span v-if="elecBikeVal"><md-icon>check</md-icon></span>
                <span v-else><md-icon>close</md-icon></span>
            </span>
        </md-button>
    </div>
</template>

<script>
  import Vue from 'vue';

  import { MdButton, MdIcon, MdSwitch } from 'vue-material/dist/components';

  Vue.use(MdButton);
  Vue.use(MdIcon);
  Vue.use(MdSwitch);

  export default {
    name: 'MenuResources',
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
    methods: {
      switchFilter (type) {
        const [filterType, valueProp, oppositeProp] = type === 'mech'
          ? ['mechBikeFilter', 'mechBikeVal', 'elecBikeVal']
          : ['elecBikeFilter', 'elecBikeVal', 'mechBikeVal'];

        this[valueProp] = !this[valueProp];

        if ( !this[valueProp] && !this[oppositeProp] ) {
          this[oppositeProp] = true;
        }

        return function () {
          this.$emit('resource-filter-changed', {type: filterType, value: this[valueProp]});
        }
      }
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
    }
  }
</script>

<style lang="scss">
    .menu-resources {
        position: absolute;
        top: 14px;
        right: 78px;
        display: flex;
        height: 44px;
        padding: 8px 4px 8px 10px;
        align-items: center;
        border-radius: 22px;
        background-color: rgba(255,255,255,.92);
        box-shadow: 0px 2px 4px 1px rgba(0,0,0,.2);

        &-bikeType {
             margin-right: 8px;
             transition: opacity 200ms ease;

            .menu-resources-filter-icon {
                opacity: .33;
            }

            &--disabled {
                 opacity: 0.2;
                 pointer-events: none;
             }

            &:last-child {
                 margin-right: 0;
             }

            &--active {
                .md-icon.md-theme-default.md-icon-font {
                    color: var(--md-theme-default-primary);
                }

                .menu-resources-filter-icon {
                    opacity: 1;
                }
            }
        }

        .md-switch {
            &.switch-resource {
              margin: 0 8px;
            }

            &.switch-bikeType {
              margin-left: 2px;
            }
        }

        .md-icon {
            position: relative;
            top: 0;
            width: 20px;
            min-width: 20px;
            height: 20px;
            font-size: 20px!important;
        }

        &-filter-state {
            .md-icon {
                position: relative;
                top: 0;
                width: 14px;
                min-width: 14px;
                height: 14px;
                font-size: 14px!important;
            }
        }
    }

    .divider {
        display: block;
        width: 1px;
        height: 100%;
        margin: 0 6px 0 12px;
        border-left: 1px solid #e0e0e0;
    }
</style>

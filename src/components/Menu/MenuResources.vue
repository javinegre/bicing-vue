<template>
    <div class="menu-resources">
        <div class="menu-resources-mode">
            <md-icon>local_parking</md-icon>
            <md-switch class="md-primary switch-resource" v-model="resourceVal" />
            <md-icon>directions_bike</md-icon>
        </div>
        <span class="divider"></span>
        <md-button class="md-icon-button menu-resources-bikeType menu-resources-bikeType-mech"
            v-bind:class="{
                'menu-resources-bikeType--active': mechBikeFilter,
                'menu-resources-bikeType--disabled': !resourceVal
            }"
            @click="switchFilter(BikeTypesEnum.mech)">
            <md-icon class="menu-resources-filter-icon">settings</md-icon>
            <span class="menu-resources-filter-state">
                <span v-if="mechBikeFilter"><md-icon>check</md-icon></span>
                <span v-else><md-icon>close</md-icon></span>
            </span>
        </md-button>
        <md-button class="md-icon-button menu-resources-bikeType menu-resources-bikeType-elec"
            v-bind:class="{
                'menu-resources-bikeType--active': elecBikeFilter,
                'menu-resources-bikeType--disabled': !resourceVal
            }"
            @click="switchFilter(BikeTypesEnum.elec)">
            <md-icon class="menu-resources-filter-icon">power</md-icon>
            <span class="menu-resources-filter-state">
                <span v-if="elecBikeFilter"><md-icon>check</md-icon></span>
                <span v-else><md-icon>close</md-icon></span>
            </span>
        </md-button>
    </div>
</template>

<script>
  import Vue from 'vue';
  import { mapState } from 'vuex';

  import { MdButton, MdIcon, MdSwitch } from 'vue-material/dist/components';

  import { ResourceTypesEnum, BikeTypesEnum } from '../../shared/enums';

  Vue.use(MdButton);
  Vue.use(MdIcon);
  Vue.use(MdSwitch);

  export default {
    name: 'MenuResources',
    props: [],
    data: function () {
      return {
        resourceVal: true,
        BikeTypesEnum
      };
    },
    methods: {
      switchFilter (type) {
        const [changedValue, oppositeValue] = type === BikeTypesEnum.mech
            ? ['mechBikeFilter', 'elecBikeFilter']
            : ['elecBikeFilter', 'mechBikeFilter'];

        const newFilterValues = {
            [changedValue]: !this[changedValue],
            [oppositeValue]: true
        }

        this.$store.dispatch('filters/changeBikeType', newFilterValues);
      }
    },
    watch: {
      resourceVal: function (newVal) {
        this.$store.dispatch('filters/changeResourceMode', newVal ? ResourceTypesEnum.bikes : ResourceTypesEnum.docks);
      },
    },
    computed: mapState({
      resourceMode: state => state.filters.resourceMode,
      mechBikeFilter: state => state.filters.mechBikeFilter,
      elecBikeFilter: state => state.filters.elecBikeFilter
    })
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

        &-mode {
            display: flex;
        }

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

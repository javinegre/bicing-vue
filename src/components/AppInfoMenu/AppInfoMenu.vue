<template>
    <section class="info-menu">
        <md-button class="md-fab info-menu-button"
            @click="openMenu">
            <md-icon>info</md-icon>
        </md-button>
        <md-drawer :md-active.sync="menuShown" @md-closed="closeMenu" class="info-menu-drawer">
            <AppInfoMenuLegend />
            <AppInfoMenuLocation />
            <AppInfoMenuAbout />
        </md-drawer>
    </section>
</template>

<script>
  import AppInfoMenuAbout from './AppInfoMenuAbout.vue';
  import AppInfoMenuLegend from './AppInfoMenuLegend.vue';
  import AppInfoMenuLocation from './AppInfoMenuLocation.vue';

  export default {
    name: 'AppInfoMenu',
    components: {
      AppInfoMenuAbout,
      AppInfoMenuLegend,
      AppInfoMenuLocation
    },
    data: function () {
      return {
        menuShown: false
      };
    },
    methods: {
        openMenu: function () {
          this.menuShown = true;
        },
        closeMenu: function () {
            this.menuShown = false;
        }
    }
  }
</script>

<style lang="scss">
    .info-menu {
        font-size: 12px;

        &-button {
            position: fixed;
            top: -16px;
            right: -16px;
            filter: saturate(0);
        }

        &-drawer {
            .md-icon {
                position: relative;
                font-size: 16px !important;
                width: 16px;
                height: 16px;
                top: -1px;
                color: #333333 !important;
            }
        }

        &-block { /* To be used by children components */
            padding: 1em;
            border-bottom: 1px solid #e0e0e0;
        }

        .md-title {
            margin-bottom: 0.6em;
            display: inline-block;
        }

        &-list {
            margin: 0;
            padding-top: 0;
            padding-bottom: 0;
            list-style: none;

            li {
                line-height: 1.4;
                margin-bottom: 1em;
            }
        }
    }
</style>
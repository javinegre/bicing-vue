<template>
    <section class="info-menu-location info-menu-block">
        <span class="md-title">Menu</span>
        <ul class="info-menu-list info-menu-location-list">
            <li class="info-menu-location-item">
                <div class="info-menu-location-icon">
                    <md-icon>my_location</md-icon>
                </div>
                Geolocate
            </li>
            <li class="info-menu-location-item">
                <div class="info-menu-location-icon">
                    <md-icon>star</md-icon>
                    <md-icon>work</md-icon>
                    <md-icon>home</md-icon>
                </div>
                Press to set location on current center of the map. Once set, hold press to change it.
            </li>
        </ul>
    </section>
</template>

<script>
    export default {
        name: 'AppInfoMenuLocation',
        data: function () {
            return {}
        }
    }
</script>

<style lang="scss">
    .info-menu-location {
        &-list {
            padding-left: 0;
        }

        &-item {
            position: relative;
            padding-left: 24px;
        }

        &-icon {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 1px;
            left: 0;

            .md-icon {
                width: 16px !important;
                min-width: auto;
            }
        }
    }
</style>

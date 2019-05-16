<template>
    <section class="info-menu-availability info-menu-block">
        <span class="md-title">Station Availability</span>
        <div class="info-menu-availability-row">
            <div class="info-menu-availability-legend">
                <div class="availability-resource availability-resource--mech">
                    Mechanical Bikes
                </div>
                <div class="availability-resource availability-resource--elec">
                    Electrical Bikes
                </div>
                <div class="availability-resource availability-resource--docks">
                    Docks
                </div>
            </div>
            <img v-bind:src="StationAvailabilityExampleImg" class="info-menu-availability-img" />
        </div>
    </section>
</template>

<script>
    import StationAvailabilityExampleImg from '../../assets/app-info-menu/station-availability-example.png';

    export default {
      name: 'AppInfoMenuAvailability',
      data: function () {
        return {
          StationAvailabilityExampleImg
        }
      }
    }
</script>

<style lang="scss">
    .info-menu-availability {
        &-row {
             display: flex;
             align-items: center;
        }

        &-legend {
             width: 50%;
             line-height: 1.4;
        }

        &-img {
             width: 50%;
             height: 100%;
        }

        .availability-resource {
            position: relative;
            padding-left: 20px;

            &::before {
                content: ' ';
                display: inline-block;
                width: 12px;
                height: 2px;
                background-color: gray;
                position: absolute;
                left: 0;
                top: 7px;
            }

            &--mech::before {
                background-color: crimson;
            }

            &--elec::before {
                background-color: gold;
            }
        }
    }
</style>

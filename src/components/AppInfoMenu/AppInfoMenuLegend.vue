<template>
    <section class="info-menu-legend info-menu-block">
        <span class="md-title">Legend</span>
        <div class="legend-types">
            <div>
                <md-icon>directions_bike</md-icon>
                Total Bikes
            </div>
            <div>
                <md-icon>settings</md-icon>
                Mechanical Bikes
            </div>
            <div>
                <md-icon>local_parking</md-icon>
                Docks
            </div>
            <div>
                <md-icon>power</md-icon>
                Electrical Bikes
            </div>
        </div>
        <hr class="legend-divider" />
        <div class="legend-sizes-availability-cols">
            <ul class="legend-sizes info-menu-list">
                <li>
                    <span class="legend-sizes-icon">
                        <img v-bind:src="icons.BbvIcon" alt="Bike map marker" />
                    </span>
                    <span class="legend-sizes-desc">
                        Bikes (mechanical and/or electrical) whithin 5 minutes walking distance
                    </span>
                </li>
                <li>
                    <span class="legend-sizes-icon">
                        <img v-bind:src="icons.SbvIcon" alt="Dock map marker" />
                    </span>
                    <span class="legend-sizes-desc">
                        Docks within 5 minutes walking distance
                    </span>
                </li>
                <li>
                    <span class="legend-sizes-icon">
                        <img v-bind:src="icons.BsvIcon" alt="Bike map marker" />
                        <img v-bind:src="icons.SsvIcon" alt="Dock map marker" />
                    </span>
                    <span class="legend-sizes-desc">
                        Bikes/Docks within 15 minutes walking distance
                    </span>
                </li>
            </ul>
            <ul class="legend-availability info-menu-list">
                <li>
                    <span class="legend-availability-swatch"
                        v-bind:style="{'background-color': swatches.black}"></span>
                    <span class="legend-availability-desc">
                        0 Bikes/Docks available
                    </span>
                </li>
                <li>
                    <span class="legend-availability-swatch"
                        v-bind:style="{'background-color': swatches.red}"></span>
                    <span class="legend-availability-desc">
                        1-2 available
                    </span>
                </li>
                <li>
                    <span class="legend-availability-swatch"
                        v-bind:style="{'background-color': swatches.orange}"></span>
                    <span class="legend-availability-desc">
                        3-5 available
                    </span>
                </li>
                <li>
                    <span class="legend-availability-swatch"
                        v-bind:style="{'background-color': swatches.green}"></span>
                    <span class="legend-availability-desc">
                        More than 5 available
                    </span>
                </li>
                <li>
                    <span class="legend-availability-swatch"
                        v-bind:style="{'background-color': swatches.gray}"></span>
                    <span class="legend-availability-desc">
                        Station not operative
                    </span>
                </li>
            </ul>
        </div>
        <hr class="legend-divider" />
        <div class="legend-summary">
            <img v-bind:src="InfoBoxExampleImg" class="legend-summary-img" />
            <p>Total resources available within 5 minutes walking distance.</p>
        </div>
    </section>
</template>

<script>
    import Vue from 'vue';

    import { MdList } from 'vue-material/dist/components';

    import BbvIcon from '../../assets/resource-icons/bikes-big-green.svg';
    import BsvIcon from '../../assets/resource-icons/bikes-small-green.svg';
    import SbvIcon from '../../assets/resource-icons/slots-big-green.svg';
    import SsvIcon from '../../assets/resource-icons/slots-small-green.svg';

    import InfoBoxExampleImg from '../../assets/app-info-menu/info-box-example.png';

    Vue.use(MdList);

    const icons = {
      BbvIcon,
      BsvIcon,
      SbvIcon,
      SsvIcon
    };

    const swatches = {
        black: '#222222',
        red: '#DD0033',
        orange: '#FF9900',
        green: '#AACC22',
        gray: '#BBBBBB',
    };

    export default {
        name: 'AppInfoMenuLegend',
        data: function () {
            return {
                icons,
                swatches,
                InfoBoxExampleImg
            };
        }
    }
</script>

<style lang="scss">
    .legend {
        &-types {
            display: flex;
            flex-wrap: wrap;

            & > div {
                width: 50%;
                margin-bottom: 0.4em;
            }
        }

        &-sizes-availability-cols {
            display: flex;
        }

        &-sizes,
        &-availability {
             padding-left: 26px;

            li {
                position: relative;
            }
        }


        &-sizes {
            width: 60%;
            padding-right: 16px;

            &-icon {
                position: absolute;
                left: -26px;
            }
        }

        &-availability {
            width: 40%;

             &-swatch {
                position: absolute;
                left: -26px;
                display: inline-block;
                width: 16px;
                height: 16px;
                background-color: black;
                border-radius: 2px;
             }
        }

        &-summary {
            min-height: 46px;

            &-img {
                 float: left;
                 width: 120px;
                 margin-right: 8px
            }

            p {
                margin: 0;
                line-height: 1.4;
            }
        }

        &-divider {
            margin: 1em 0;
            opacity: .1;
        }
    }
</style>
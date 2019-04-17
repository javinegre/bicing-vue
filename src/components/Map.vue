<template>
    <div>
        <div id="map"></div>
        <img :src="crosshairIcon" class="crosshairIcon" />
    </div>
</template>

<script>
  import scriptLoader from '../shared/helpers/script-loader';

  import mapConfig from '../shared/config/map';
  import apiKeys from '../shared/config/apis';

  import crosshairIcon from '../assets/crosshair.svg';

  import BbbIcon from '../assets/resource-icons/bikes-big-black.svg';
  import BbgIcon from '../assets/resource-icons/bikes-big-gray.svg';
  import BbvIcon from '../assets/resource-icons/bikes-big-green.svg';
  import BboIcon from '../assets/resource-icons/bikes-big-orange.svg';
  import BbrIcon from '../assets/resource-icons/bikes-big-red.svg';

  import BsbIcon from '../assets/resource-icons/bikes-small-black.svg';
  import BsgIcon from '../assets/resource-icons/bikes-small-gray.svg';
  import BsvIcon from '../assets/resource-icons/bikes-small-green.svg';
  import BsoIcon from '../assets/resource-icons/bikes-small-orange.svg';
  import BsrIcon from '../assets/resource-icons/bikes-small-red.svg';

  import SbbIcon from '../assets/resource-icons/slots-big-black.svg';
  import SbgIcon from '../assets/resource-icons/slots-big-gray.svg';
  import SbvIcon from '../assets/resource-icons/slots-big-green.svg';
  import SboIcon from '../assets/resource-icons/slots-big-orange.svg';
  import SbrIcon from '../assets/resource-icons/slots-big-red.svg';

  import SsbIcon from '../assets/resource-icons/slots-small-black.svg';
  import SsgIcon from '../assets/resource-icons/slots-small-gray.svg';
  import SsvIcon from '../assets/resource-icons/slots-small-green.svg';
  import SsoIcon from '../assets/resource-icons/slots-small-orange.svg';
  import SsrIcon from '../assets/resource-icons/slots-small-red.svg';

  const icons = {
    bikes: {
        big: {
            black: BbbIcon,
            gray: BbgIcon,
            green: BbvIcon,
            orange: BboIcon,
            red: BbrIcon
        },
        small: {
            black: BsbIcon,
            gray: BsgIcon,
            green: BsvIcon,
            orange: BsoIcon,
            red: BsrIcon
        }
    },
    slots: {
      big: {
        black: SbbIcon,
        gray: SbgIcon,
        green: SbvIcon,
        orange: SboIcon,
        red: SbrIcon
      },
      small: {
        black: SsbIcon,
        gray: SsgIcon,
        green: SsvIcon,
        orange: SsoIcon,
        red: SsrIcon
      }
    },
  }

  const getMarker = (activeResource, stationInfo) => {
    let color = '';
    const resourceNumber = stationInfo[activeResource];

    if (activeResource === 'mechanical_bikes' || activeResource === 'electrical_bikes') {
        activeResource = 'bikes';
    }

    if (stationInfo.status === 1) {
        if (resourceNumber === 0) {
            color = 'black';
        }
        else if (resourceNumber <= 2) {
            color = 'red';
        }
        else if (resourceNumber <= 5) {
          color = 'orange';
        }
        else {
            color = 'green';
        }
    }
    else {
      color = 'gray';
    }

    return icons[activeResource][stationInfo._radio === 'inner' ? 'big' : 'small'][color];
  };

  const renderMarkers = (mapHandler, shownStations, activeResource, clickFn) => {
    const markers = shownStations.map(it => {
      const marker = new window.google.maps.Marker({
        position: {lat: +it.latitude, lng: +it.longitude},
        icon: getMarker(activeResource, it),
        map: mapHandler
      });

      marker.addListener('click', function() {
        /* eslint-disable no-console */
        console.log(it[activeResource]);
        clickFn(it.id);
      });

      return marker;
    });

    return markers;
  };

  const initMap = (fns) => {
    const mapHandler = new window.google.maps.Map(document.getElementById('map'), mapConfig);

    mapHandler.addListener('dragstart', fns.onDragstart);
    mapHandler.addListener('dragend', fns.onDragend);

    return mapHandler;
  };

  const loadMap = () => {
    scriptLoader.url(`https://maps.googleapis.com/maps/api/js?key=${apiKeys.googleMaps.key}&callback=mapReady`);
  };

  export default {
    name: 'Map',
    props: [
        'shownStations',
        'resourceMode',
        'mechBikeFilter',
        'elecBikeFilter'
    ],
    data: function () {
        return {
            mapHandler: null,
            markers: [],
            crosshairIcon
        }
    },
    components: {},
    watch: {
      mapHandler: function () {
        this.renderMarkers();
      },
      shownStations: function () {
        if (this.mapHandler !== null) {
          this.renderMarkers();
        }
        else {
            /* eslint-disable no-console */
            console.warn('Map not ready while rendering markers');
        }
      },
      resourceMode: function () {
        this.renderMarkers();
      },
      mechBikeFilter: function () {
        this.renderMarkers();
      },
      elecBikeFilter: function () {
        this.renderMarkers();
      },
    },
    methods: {
      renderMarkers: function () {
        const vm = this;
        this.removeMarkers();
        this.markers = renderMarkers(this.mapHandler, this.shownStations, this.getActiveResource(), function (id) {
            vm.$emit('select-station', id);
        });
      },
      removeMarkers() {
        this.markers.map(it => { it.setMap(null) })
      },
      centerChanged (newCenter) {
        this.$emit('center-changed', newCenter);
      },
      getActiveResource() {
        let activeResource = '';
        if (this.resourceMode === 'bikes') {
            if (this.mechBikeFilter && !this.elecBikeFilter) {
              activeResource = 'mechanical_bikes';
            }
            else if (!this.mechBikeFilter && this.elecBikeFilter) {
              activeResource = 'electrical_bikes';
            }
            else {
              activeResource = 'bikes';
            }
        }
        else {
            activeResource = 'slots';
        }

        return activeResource;
      }
    },
    mounted () {
      loadMap();

      window.mapReady = () => {
        const vm =  this;
        this.mapHandler = initMap({
          onDragstart: function () {
            vm.removeMarkers();
          },
          onDragend: function () {
            vm.centerChanged({
              lat: this.center.lat(),
              lng: this.center.lng()
            });
          }
        });
      };
    }
  };
</script>

<style>
    #map {
        height: 100vh;
    }
    .crosshairIcon {
        position: fixed;
        top: 50vh;
        left: 50vw;
        top: calc(50vh - 12px);
        left: calc(50vw - 12px);
    }
</style>
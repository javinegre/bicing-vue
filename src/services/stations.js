import axios from 'axios';

const StationService = () => {
  const server = 'https://negre.co/';
  // const server = 'http://localhost:8080/'; // TODO: use config
  const apiUri = 'bicing/api/v1.0/';

  const getEndpointUrl = (endpoint) => `${server}${apiUri}${endpoint}`;

  // stationInfo cache
  let stationInfo = null;
  let stationInfoLastUpdate = -Infinity;
  const stationInfoTtl = 3 * 3600 * 1000; // 2h

  const getStationInfo = () => {
    // stationInfo is cached to avoid unnecesary XHR requests
    const now = +new Date();
    if (now - stationInfoLastUpdate > stationInfoTtl || stationInfo === null) {
      stationInfo = axios.get(getEndpointUrl('station-info'));
      stationInfoLastUpdate = now;
    }

    return stationInfo;
  };

  const getStationStatus = () => {
    return axios.get(getEndpointUrl('station-status'));
  };

  const getList = async () => {
    const info = getStationInfo();
    const status = getStationStatus();

    const infoResolved = await info;
    const statusResolved = await status;

    if (infoResolved.data === null || statusResolved.data === null) {
      return null;
    }

    const stationList = infoResolved.data.stations.map((st) => {
      const newStationData = statusResolved.data.stations.find((it) => it.i == st.id);
      if (newStationData) {
        st.slots = newStationData.d;
        st.bikes = newStationData.m + newStationData.e; // TODO: get rid of this field
        st.mechanical_bikes = newStationData.m;
        st.electrical_bikes = newStationData.e;
        st.slots = newStationData.d; // TODO: rename to docks
        st.status = newStationData.s;
        // TODO: fix mess below
        st.latitude = st.lat;
        st.longitude = st.lng;
        st.streetName = st.name;
      }

      return st;
    });

    return {
      updateTime: statusResolved.data.last_updated * 1000,
      stations: stationList
    };
  };

  return {
    getList
  };
}

export default StationService;

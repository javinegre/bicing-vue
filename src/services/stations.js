import axios from 'axios';

import apiConfig from '../shared/config/apis';

import { ResourceTypesEnum, BikeTypesEnum } from '../shared/enums';

const StationService = () => {
  const getEndpointUrl = (endpoint) => `${apiConfig.negreCo.host}${apiConfig.negreCo.baseUrl}${endpoint}`;

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
        st[ResourceTypesEnum.bikes] = newStationData.m + newStationData.e;
        st[ResourceTypesEnum.docks] = newStationData.d;
        st[BikeTypesEnum.mech] = newStationData.m;
        st[BikeTypesEnum.elec] = newStationData.e;
        st.status = newStationData.s;
      }

      return st;
    });

    return {
      updateTime: statusResolved.data.lastUpdated * 1000,
      stations: stationList
    };
  };

  return {
    getList
  };
}

export default StationService;

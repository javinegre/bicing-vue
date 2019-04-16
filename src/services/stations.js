import axios from 'axios';

const StationService = () => {
  const server = 'http://localhost:8080/';
  const apiUri = 'bicing/api/v1.0/';

  const getEndpointUrl = (endpoint) => `${server}${apiUri}${endpoint}`;

  const getList = () => {
    return axios.get(getEndpointUrl('stations')); // 'stations-simplified'
  };

  return {
    getList
  };
}

export default StationService;

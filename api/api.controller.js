const fetch = require('node-fetch');
const cache = require('memory-cache');

const transformers = require('./helpers/data-transformers');

class Api {

  constructor() {
    this.bicingApiBaseUrl = 'https://api.bsmsa.eu/ext/api/bsm/gbfs/v2/en/';

    this.endpoints = {
      info: 'station_information',
      status: 'station_status'
    };

    this.cacheConfig = {
      info: {
        key: 'stations-info',
        ttl: 2 * 3600 * 1000 // 2h
      },
      status: {
        key: 'stations-status',
        ttl: 60 * 1000 // 60s
      }
    };
  }

  async getStationInfo () {
    let result = cache.get(this.cacheConfig.info.key);

    if (!result) {
      const info = await fetch(`${this.bicingApiBaseUrl}${this.endpoints.info}`)
        .then(res => res.json())
        .then(data => {
          return data;
        }).catch(err => {
          console.error(err);
          return null;
        });

      if (info !== null) {
        result = {
          last_updated: info.last_updated,
          stations: info.data.stations.map(transformers.stationInfoTransform)
        };

        cache.put(this.cacheConfig.info.key, result, this.cacheConfig.info.ttl);
      }
    }

    return result;
  }

  async getStationStatus () {
    let result = cache.get(this.cacheConfig.status.key);

    if (!result) {
      const info = await fetch(`${this.bicingApiBaseUrl}${this.endpoints.status}`)
        .then(res => res.json())
        .then(data => {
          return data;
        }).catch(err => {
          console.error(err);
          return null;
        });

      if (info !== null) {
        result = {
          last_updated: info.last_updated,
          stations: info.data.stations.map(transformers.stationStatusTransform)
        };

        cache.put(this.cacheConfig.status.key, result, this.cacheConfig.status.ttl);
      }
    }

    return result;
  }
}

module.exports = Api;

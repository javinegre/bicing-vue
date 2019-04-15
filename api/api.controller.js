const fetch = require('node-fetch');
const cache = require('memory-cache');

class Api {

  constructor() {
    this.bicingApiUrl = 'https://www.bicing.barcelona/get-stations';

    this.cacheKey = 'stations-info';
    this.ttl = 600 * 1000; // 600s = 10min
  }

  async getSimplifiedStationList () {
    const info = await this.getCompleteStationList();
    const simplifiedStations = info.stations.map((station) => {
      return {
        id:     station.id,
        slots:  station.slots,
        bikes:  station.bikes,
        status: station.status
      };
    });

    return {
      stations: simplifiedStations,
      updateTime: info.updateTime
    };
  }

  async getCompleteStationList () {
    let info = cache.get(this.cacheKey);

    if ( !info ) {
      info = await fetch(this.bicingApiUrl)
        .then(res => res.json())
        .then(data => {
          data.updateTime = +new Date();
          return data;
        }).catch(err => {
          console.error(err);
          return {
            'stations': [],
            'updateTime': -1
          };
        });

      cache.put(this.cacheKey, info, this.ttl);
    }

    return info;
  }
}

module.exports = Api;

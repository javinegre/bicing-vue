const stationInfoTransform = st => {
  return {
    id: st.station_id,
    name: st.name,
    lat: st.lat,
    lng: st.lon
  }
};

const stationStatusTransform = st => {
  return {
    i: st.station_id,
    e: st.num_bikes_available_types.ebike,
    m: st.num_bikes_available_types.mechanical,
    d: st.num_docks_available,
    s: +(st.status === 'IN_SERVICE')
  }
}

module.exports = {
  stationInfoTransform,
  stationStatusTransform
}
const isInsideArea = (coord, center, offset) => {
  return coord.lat > center.lat - offset.lat
    && coord.lat < center.lat + offset.lat
    && coord.lng > center.lng - offset.lng
    && coord.lng < center.lng + offset.lng;
}

const isInsideOuterArea = (coord, center) => {
  const latOffset = 0.009;
  const lngOffset = 0.012;

  return isInsideArea(coord, center, { lat: latOffset, lng: lngOffset });
};

const inInsideInnerArea = (coord, center) => {
  const latOffset = 0.0045;
  const lngOffset = 0.006;

  return isInsideArea(coord, center, { lat: latOffset, lng: lngOffset });
};

const getStationDistance = (coord, center) => {
  return Math.sqrt(
    Math.pow(center.lat - coord.lat, 2) + Math.pow(center.lng - coord.lng, 2)
  );
};

const filterStations = (list, mapCenter, resourceMode) => {
  const stationsFiltered = list.reduce((filtered, item) => {
    let shownStation = Object.assign({}, item);

    const coord = {
      lat: +shownStation.latitude,
      lng: +shownStation.longitude
    };

    if ( isInsideOuterArea(coord, mapCenter) ) {
      shownStation._radio = inInsideInnerArea(coord, mapCenter)
        ? 'inner'
        : 'outer';

      shownStation._distance = getStationDistance(coord, mapCenter);

      shownStation.latitude = +shownStation.latitude;
      shownStation.longitude = +shownStation.longitude;

      // Pushed if inside outer area
      filtered.push(shownStation);
    }

    return filtered;
  }, []);

  // Sort stations so stations with more resources are on top
  const shownStations = stationsFiltered.sort((a, b) => {
    const [resourcesA, resourcesB] = resourceMode === 'bikes'
      ? [+a.bikes, +b.bikes]
      : [+a.slots, +b.slots];

    return resourcesA - resourcesB;
  });

  return shownStations;
};

export default filterStations;

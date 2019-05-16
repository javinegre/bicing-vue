import { ResourceTypesEnum } from '../../shared/enums';

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
  const latOffset = 0.003;
  const lngOffset = 0.004;

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
      lat: shownStation.lat,
      lng: shownStation.lng
    };

    if ( isInsideOuterArea(coord, mapCenter) ) {
      shownStation._radio = inInsideInnerArea(coord, mapCenter)
        ? 'inner'
        : 'outer';

      shownStation._distance = getStationDistance(coord, mapCenter);

      // Pushed if inside outer area
      filtered.push(shownStation);
    }

    return filtered;
  }, []);

  // Sort stations so stations with more resources are on top
  const shownStations = stationsFiltered.sort((a, b) => {
    const [resourcesA, resourcesB] = resourceMode === ResourceTypesEnum.bikes
      ? [a[ResourceTypesEnum.bikes], b[ResourceTypesEnum.bikes]]
      : [a[ResourceTypesEnum.docks], b[ResourceTypesEnum.docks]];

    return resourcesA - resourcesB;
  });

  return shownStations;
};

export default filterStations;

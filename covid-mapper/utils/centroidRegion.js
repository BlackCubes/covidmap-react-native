import coordinates from "./coordinates.json";

const centroidRegion = (location, initialRegion, windowWidth, windowHeight) => {
  if (!coordinates[location]) return initialRegion;

  const aspectRatio = windowWidth / windowHeight;
  const { bounding_box, centroid } = coordinates[location];

  const lat = parseFloat(centroid.latitude);
  const lng = parseFloat(centroid.longitude);
  const northEastLat = parseFloat(bounding_box.north_east.latitude);
  const southWestLat = parseFloat(bounding_box.south_west.latitude);
  const latDelta = northEastLat - southWestLat;
  const lngDelta = latDelta * aspectRatio;

  return {
    latitude: lat,
    longitude: lng,
    latitudeDelta: latDelta,
    longitudeDelta: lngDelta,
  };
};

export default centroidRegion;

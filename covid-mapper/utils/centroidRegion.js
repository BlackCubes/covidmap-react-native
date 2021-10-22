import coordinates from "./coordinates.json";

const centroidRegion = (location, initialRegion, windowWidth, windowHeight) => {
  const lowercaseLocation = location.toLowerCase();
  if (!coordinates[lowercaseLocation]) return initialRegion;

  const aspectRatio = windowWidth / windowHeight;
  const { bounding_box, centroid } = coordinates[lowercaseLocation];

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

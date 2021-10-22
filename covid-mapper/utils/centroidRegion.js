import coordinates from "./coordinates.json";

/**
 * Centers the map of the selected location based on the viewable map area of the device. If
 * the location does not exist in the coordinates JSON, then it returns the previous region.
 * Otherwise, it returns an object of the center location (latitude, longitude) and the
 * calculated viewable map area (latitudeDelta, longitudeDelta).
 * @param {String} location
 * @param {{latitude:Number, longitude:Number, latitudeDelta:Number, longitudeDelta:Number}} initialRegion
 * @param {Number} windowWidth
 * @param {Number} windowHeight
 * @returns {{latitude:Number, longitude:Number, latitudeDelta:Number, longitudeDelta:Number}}
 * An object of the center location and viewable map area.
 */
const centroidRegion = (location, initialRegion, windowWidth, windowHeight) => {
  const lowercaseLocation = location.toLowerCase();
  if (!coordinates[lowercaseLocation]) return initialRegion;

  // To calculate the
  const aspectRatio = windowWidth / windowHeight;
  const { bounding_box, centroid } = coordinates[lowercaseLocation];

  // Parse the JSON.
  const lat = parseFloat(centroid.latitude);
  const lng = parseFloat(centroid.longitude);
  const northEastLat = parseFloat(bounding_box.north_east.latitude);
  const southWestLat = parseFloat(bounding_box.south_west.latitude);

  // The amount of the y-axis on the map to display on the device. No aspect ratio for this
  // since we want to display the height of the state/country/county/etc.
  const latDelta = northEastLat - southWestLat;
  // The amount of the x-axis on the map to display on the device. Since each state, country,
  // county, etc. have different widths, this should be calculated based on the height of that
  // location multiplied by the device's aspect ratio to fit on the device.
  const lngDelta = latDelta * aspectRatio;

  return {
    latitude: lat,
    longitude: lng,
    latitudeDelta: latDelta,
    longitudeDelta: lngDelta,
  };
};

export default centroidRegion;

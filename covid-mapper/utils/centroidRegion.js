import coordinates from "./coordinates.json";

/**
 * Centers the map of the selected location and landmass based on the viewable map area of
 * the device. If the location or landmass does not exist in the coordinates JSON, then it
 * returns the previous region. If the provided landmass is 'mainland' (meaning no
 * provinces), then return the previous region. Otherwise, it returns an object of the center
 * location (latitude, longitude) and the calculated viewable map area (latitudeDelta,
 * longitudeDelta).
 * @param {String} landmass
 * @param {String} location
 * @param {{latitude:Number, longitude:Number, latitudeDelta:Number, longitudeDelta:Number}} initialRegion
 * @param {Number} windowWidth
 * @param {Number} windowHeight
 * @returns {{latitude:Number, longitude:Number, latitudeDelta:Number, longitudeDelta:Number}}
 * An object of the center location and viewable map area.
 */
const centroidRegion = (
  landmass,
  location,
  initialRegion,
  windowWidth,
  windowHeight
) => {
  const lowercaseLocation = location.toLowerCase();

  if (!coordinates[landmass]) return initialRegion;
  if (coordinates[landmass] === "mainland") return initialRegion;
  if (!coordinates[landmass][lowercaseLocation]) return initialRegion;

  // Aspect ratio of the device.
  const aspectRatio = windowWidth / windowHeight;
  const { bounding_box, centroid } = coordinates[landmass][lowercaseLocation];

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

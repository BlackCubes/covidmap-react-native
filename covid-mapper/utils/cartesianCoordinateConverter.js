/**
 * Retrieves the incoming data and transforms it into cartesian coordiantes.
 * @param {Array<object>} data
 * @returns {Array<{x:String, y:Number}>|Array} An array of objects in cartesian coordinates.
 */
const cartesianCoordinateConverter = (data) => {
  if (!data) return [];
  if (!data.length) return [];

  const cartesianCoordinates = [];

  Object.keys(data).forEach((dataKey) => {
    cartesianCoordinates.push({ x: dataKey, y: data[dataKey] });
  });

  return cartesianCoordinates;
};

export default cartesianCoordinateConverter;

/**
 * Finds the selected county inside an array of counties inside the US State.
 * If it can't find the county, it return undefined. If it does, returns the county's
 * data as an object.
 * @param {String} county
 * @param {Array<object>} stateCounties
 * @returns {Null|object} Null or an object.
 */
const retrieveCountyData = (county, stateCounties) => {
  // If the string length is empty, return undefined.
  if (!county.length) return null;
  // Checks to see if it is undefined or null from the API.
  if (!stateCounties) return null;
  // Checks to see if there is even an array length.
  if (!stateCounties.length) return null;

  // Returns that county's data as an object, or undefined if nothing.
  const countyData = stateCounties.find(
    (state) => state.county.toLowerCase() === county.toLowerCase()
  );

  // Nullish coalescing operator that checks if it is undefined. If it is undefined,
  // return null instead for better functionality checks in the future. If there is
  // data, return that data.
  return countyData ?? null;
};

export default retrieveCountyData;

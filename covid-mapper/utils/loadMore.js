/**
 * Simulates an infinite scroll for the given array of data, if the API has no pagination.
 * @param {Array<object>} data
 * @param {Number} page
 * @param {Number} pageSize Default of 10.
 * @param {Function} setPage
 * @returns {Array<object>} A slice of the original data.
 */
const loadMore = (data, page, pageSize = 10, setPage) => {
  const start = page * pageSize;
  const end = start + pageSize;

  // Don't run the function if the start equals the length, or else it will be out of bounds.
  if (start !== data.length - 1) setPage((page += 1));

  return data.slice(start, end);
};

export default loadMore;

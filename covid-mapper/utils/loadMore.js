const loadMore = (data, page, pageSize = 10) => {
  const start = page * pageSize;
  const end = start + (pageSize - 1);

  return data.slice(start, end);
};

export default loadMore;

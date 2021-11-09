const loadMore = (data, page, pageSize = 10, setPage) => {
  const start = page * pageSize;
  const end = start + pageSize;

  if (start !== data.length - 1) setPage((page += 1));

  return data.slice(start, end);
};

export default loadMore;

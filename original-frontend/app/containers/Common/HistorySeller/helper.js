export const doQuery = (entities, query = {}) => {
  if (!entities) return [];
  let queriedEntities = [...entities];
  /* sort */
  const { sort } = query;
  if (sort) {
    queriedEntities = queriedEntities.sort((a, b) => {
      if (a[sort.by].toLowerCase() > b[sort.by].toLowerCase())
        return sort.asc ? 1 : -1;
      if (a[sort.by].toLowerCase() < b[sort.by].toLowerCase())
        return sort.asc ? -1 : 1;
      return 0;
    });
  }
  return queriedEntities;
};

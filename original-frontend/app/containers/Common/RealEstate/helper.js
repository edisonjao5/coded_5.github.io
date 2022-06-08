export const doQuery = (entities, query = {}) => {
  if (!entities) return [];
  let queriedEntities = [...entities];
  /* sort */
  const { sort } = query;
  if (sort) {
    queriedEntities = queriedEntities.sort((a, b) => {
      if (['RazonSocial', 'Rut'].includes(sort.by)) {
        if (a[sort.by].toLowerCase() > b[sort.by].toLowerCase())
          return sort.asc ? 1 : -1;
        if (a[sort.by].toLowerCase() < b[sort.by].toLowerCase())
          return sort.asc ? -1 : 1;
        return 0;
      }
      if (sort.by === 'IsActive') {
        if (a[sort.by] > b[sort.by]) return sort.asc ? 1 : -1;
        if (a[sort.by] < b[sort.by]) return sort.asc ? -1 : 1;
        return 0;
      }
      return 0;
    });
    queriedEntities = [
      ...queriedEntities.filter(item => item.RazonSocial === 'Pendiente'),
      ...queriedEntities.filter(item => item.RazonSocial !== 'Pendiente'),
    ];
  }
  return queriedEntities;
};

export const doQuery = (entities, query = {}) => {
  if (!entities) return [];
  let queriedEntities = [...entities];
  /* sort */
  const { sort, mustIn } = query;
  if (sort) {
    queriedEntities = queriedEntities.sort((a, b) => {
      if (['Name', 'LastNames', 'Rut'].includes(sort.by)) {
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
  }
  /* search by roles */
  let { roles } = query;
  if (roles) {
    if (!Array.isArray(roles)) roles = [roles];
    queriedEntities = queriedEntities.filter(user =>
      user.Roles.some(role => roles.length < 1 || roles.includes(role.Name)),
    );
  }
  /* mustIn */
  if (mustIn && Array.isArray(mustIn)) {
    queriedEntities = queriedEntities.filter(user =>
      mustIn.some(needed => needed.UserID === user.UserID),
    );
  }
  return queriedEntities;
};

export const userFullname = user =>
  user ? `${user.Name} ${user.LastNames} / ${user.Rut}` : '';

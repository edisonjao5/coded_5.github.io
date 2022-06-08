import { PROMESA_STATE, PROMESA_REFUND_STATE } from 'containers/App/constants';
import { UserProject } from 'containers/Project/helper';
import { getFileName } from 'containers/App/helpers';

export const initReports = () =>
  PROMESA_STATE.reduce(
    (acc, state) => {
      acc[state] = { Label: state, Count: 0 };
      return acc;
    },
    {
      All: { Label: 'Todas', Count: 0 },
    },
  );

export const getReports = (entities = []) =>
  entities.reduce((acc, item) => {
    acc.All.Count += 1;
    const key = item.PromesaState;
    acc[key] = acc[key] || {
      Label: key,
      Count: 0,
    };
    acc[key].Label = key;
    acc[key].Count += 1;
    return acc;
  }, initReports());

export const doQuery = (entities, query = {}) => {
  if (!entities) return [];
  let queriedEntities = [...entities];
  /* sort */
  const { sort } = query;
  if (sort) {
    queriedEntities = queriedEntities.sort((a, b) => {
      let aa = a[sort.by], bb = b[sort.by];
      if (sort.by === "Cliente") {
        aa = `${aa['Name']} ${aa['LastNames']} ${aa['Rut']}`;
        bb = `${bb['Name']} ${bb['LastNames']} ${bb['Rut']}`;
      }
      if (aa.toLowerCase() > bb.toLowerCase())
        return sort.asc ? 1 : -1;
      if (aa.toLowerCase() < bb.toLowerCase())
        return sort.asc ? -1 : 1;
      return 0;
    });
  }

  return queriedEntities;
};
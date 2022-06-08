/*
 *
 * Promesa reducer
 *
 */
import Fuse from 'fuse.js';
import produce from 'immer';
import {
  FETCH_ESCRITURAS,
  FETCH_ESCRITURAS_ERROR,
  FETCH_ESCRITURAS_SUCCESS,
  SEARCH_ESCRITURAS,
  QUERY_ESCRITURAS,
  CONFIRM_ESCRITURA,
  CONFIRM_ESCRITURA_ERROR,
  CONFIRM_ESCRITURA_SUCCESS,
} from './constants';
import { getReports, initReports, doQuery } from '../helper';

export const initialState = {
  loading: false,
  error: false,
  escrituras: false,
  reports: initReports(),
  origin_escrituras: false,
  filter: { txtSearch: '' },
  query: { sort: { by: 'Date', asc: true } },
};
/* eslint-disable default-case, no-param-reassign */
const escrituraReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SEARCH_ESCRITURAS:
        draft.filter = { ...state.filter, ...action.filter };
        draft.escrituras = [...(state.origin_escrituras || [])];

        /* eslint-disable-next-line */
        const fuse = new Fuse(draft.escrituras, {
          keys: ['Folio', 'ClienteName', 'ClienteLastNames', 'ClienteRut'],
        });

        if (draft.filter.textSearch)
          draft.escrituras = fuse.search(draft.filter.textSearch);
        draft.reports = getReports(draft.escrituras);

        if (draft.filter.status && draft.filter.status !== 'All') {
          draft.escrituras = draft.escrituras.filter(
            item => item.PromesaState === draft.filter.status,
          );
        }

        break;
      case QUERY_ESCRITURAS:
        draft.query = !action.query
          ? initialState.query
          : { ...draft.query, ...action.query };
        draft.escrituras = doQuery(state.origin_escrituras, draft.query);
        break;
      case FETCH_ESCRITURAS:
      case CONFIRM_ESCRITURA:
        draft.loading = true;
        draft.error = false;
        break;
      case FETCH_ESCRITURAS_ERROR:
      case CONFIRM_ESCRITURA_ERROR:
        draft.loading = false;
        draft.error = action.error;
        break;
      case FETCH_ESCRITURAS_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.origin_escrituras = action.escrituras;
        draft.escrituras = doQuery(draft.origin_escrituras, draft.query);
        draft.reports = getReports(draft.escrituras);
        break;
      case CONFIRM_ESCRITURA_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.success=action.response.detail;
        draft.proyecto=action.response.proyecto;
        break;
    }
  });

export default escrituraReducer;

/*
 *
 * Quotation reducer
 *
 */
import Fuse from 'fuse.js';
import produce from 'immer';
import moment from 'components/moment';
import {
  QUERY_QUOTATIONS,
  FETCH_QUOTATIONS,
  FETCH_QUOTATIONS_ERROR,
  FETCH_QUOTATIONS_SUCCESS,
  RESET_CONTAINER,
  SEARCH_QUOTATIONS,
  TOGGLE_QUOTATION_FORM,
} from './constants';
import { getReports, doQuery } from './helper';

export const initialState = {
  query: { sort: { by: 'Date', asc: false } },
  show_form: false,
  loading: false,
  error: false,
  reports: { clients: [], states: {} },
  quotations: false,
  origin_quotations: false,
  filter: { textSearch: '' },
};
/* eslint-disable default-case, no-param-reassign */
const quotationReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case RESET_CONTAINER:
        return initialState;
      case QUERY_QUOTATIONS:
        draft.query = !action.query
          ? initialState.query
          : { ...draft.query, ...action.query };
        draft.quotations = doQuery(state.origin_quotations, draft.query);
        break;
      case SEARCH_QUOTATIONS:
        draft.filter = { ...state.filter, ...action.filter };
        draft.quotations = [...(draft.origin_quotations || [])];
        if (action.filter.textSearch) {
          const fuse = new Fuse([...draft.origin_quotations], {
            keys: [
              'Cliente.Name',
              'Cliente.Rut',
              'Proyecto',
              'Folio',
              'Inmuebles.InmuebleType',
              'Inmuebles.Number',
            ],
          });
          draft.quotations = fuse.search(action.filter.textSearch);
        }
        if (draft.filter.dates && draft.filter.dates[0])
          draft.quotations = draft.quotations.filter(
            item =>
              item.Date >= moment(draft.filter.dates[0]).format('YYYY-MM-DD'),
          );
        if (draft.filter.dates && draft.filter.dates[1])
          draft.quotations = draft.quotations.filter(
            item =>
              item.Date <= moment(draft.filter.dates[1]).format('YYYY-MM-DD'),
          );

        if (draft.filter.client)
          draft.quotations = draft.quotations.filter(
            item => item.ClienteID === draft.filter.client,
          );

        draft.reports.states = getReports(draft.quotations).states;

        if (draft.filter.status)
          draft.quotations = draft.quotations.filter(
            item => item.CotizacionState === draft.filter.status,
          );

        break;
      case TOGGLE_QUOTATION_FORM:
        draft.show_form = action.toggle;
        break;
      case FETCH_QUOTATIONS:
        draft.loading = true;
        draft.error = false;
        draft.show_form = false;
        break;
      case FETCH_QUOTATIONS_ERROR:
        draft.loading = false;
        draft.error = action.error;
        break;
      case FETCH_QUOTATIONS_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.quotations = action.quotations;
        draft.query = action.query || initialState.query;
        draft.origin_quotations = doQuery(action.quotations, draft.query);
        draft.reports = getReports(draft.origin_quotations);
        break;
    }
  });

export default quotationReducer;

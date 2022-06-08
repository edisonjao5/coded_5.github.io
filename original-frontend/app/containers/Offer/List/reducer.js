/*
 *
 * Offer reducer
 *
 */
import Fuse from 'fuse.js';
import produce from 'immer';
import {
  FETCH_OFFERS,
  FETCH_OFFERS_ERROR,
  FETCH_OFFERS_SUCCESS,
  SEARCH_OFFERS,
  QUERY_OFFERS,
} from './constants';
import {
  getReports,
  initReports,
  formatOffer,
  isPendienteContacto,
  doQuery,
} from '../helper';

export const initialState = {
  loading: false,
  error: false,
  offers: false,
  reports: initReports(),
  origin_offers: false,
  filter: { txtSearch: '' },
  query: { sort: { by: 'Date', asc: true } },
};
/* eslint-disable default-case, no-param-reassign */
const offerReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SEARCH_OFFERS:
        draft.filter = { ...state.filter, ...action.filter };
        draft.offers = [...(state.origin_offers || [])];

        /* eslint-disable-next-line */
        const fuse = new Fuse(draft.offers, {
          keys: ['Folio', 'ClienteName', 'ClienteLastNames', 'ClienteRut'],
        });

        if (draft.filter.textSearch)
          draft.offers = fuse.search(draft.filter.textSearch);
        draft.reports = getReports(draft.offers);

        if (draft.filter.status && draft.filter.status !== 'All') {
          if (draft.filter.status === 'Pendiente Contacto') {
            draft.offers = draft.offers.filter(item =>
              isPendienteContacto(item),
            );
          } else {
            draft.offers = draft.offers.filter(
              item =>
                item.OfertaState === draft.filter.status &&
                !isPendienteContacto(item),
            );
          }
        }

        break;
      case QUERY_OFFERS:
        draft.query = !action.query
          ? initialState.query
          : { ...draft.query, ...action.query };
        draft.offers = doQuery(state.origin_offers, draft.query);
        break;
      case FETCH_OFFERS:
        draft.loading = true;
        draft.error = false;
        break;
      case FETCH_OFFERS_ERROR:
        draft.loading = false;
        draft.error = action.error;
        break;
      case FETCH_OFFERS_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.origin_offers = action.offers.map(offer => formatOffer(offer));
        draft.offers = doQuery(draft.origin_offers, draft.query);
        draft.reports = getReports(draft.offers);
        break;
    }
  });

export default offerReducer;

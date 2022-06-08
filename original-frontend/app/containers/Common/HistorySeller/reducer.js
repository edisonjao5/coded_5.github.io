/*
 *
 * Histories reducer
 *
 */
import produce from 'immer';
import {
  FETCH_HISTORIES,
  FETCH_HISTORIES_ERROR,
  FETCH_HISTORIES_SUCCESS,
  QUERY_HISTORIES,
} from './constants';
import { doQuery } from './helper';

export const initialState = {
  query: { sort: { by: 'Folio', asc: false } },
  loading: false,
  error: false,
  histories: false,
  origin_histories: false,
};

/* eslint-disable default-case, no-param-reassign */
const historyReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case QUERY_HISTORIES:
        draft.query = !action.query
          ? initialState.query
          : { ...draft.query, ...action.query };
        draft.histories = doQuery(draft.origin_histories, draft.query);
        break;
      case FETCH_HISTORIES:
        draft.loading = true;
        draft.error = false;
        draft.histories = false;
        draft.origin_histories = false;
        break;
      case FETCH_HISTORIES_ERROR:
        draft.loading = false;
        draft.error = action.error;
        break;
      case FETCH_HISTORIES_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.origin_histories = action.histories;
        draft.histories = doQuery(draft.origin_histories, state.query);
        break;
    }
  });

export default historyReducer;

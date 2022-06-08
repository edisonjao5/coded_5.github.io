/*
 *
 * Logs reducer
 *
 */
import produce from 'immer';
import {
  FETCH_LOGS,
  FETCH_LOGS_ERROR,
  FETCH_LOGS_SUCCESS,
  QUERY_LOGS,
} from './constants';
import { doQuery } from './helper';

export const initialState = {
  query: {},
  loading: false,
  error: false,
  logs: false,
  origin_logs: false,
};

/* eslint-disable default-case, no-param-reassign */
const logReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case QUERY_LOGS:
        draft.query = !action.query
          ? initialState.query
          : { ...draft.query, ...action.query };
        draft.logs = doQuery(draft.origin_logs, draft.query);
        break;
      case FETCH_LOGS:
        draft.loading = true;
        draft.error = false;
        draft.logs = false;
        draft.origin_logs = false;
        break;
      case FETCH_LOGS_ERROR:
        draft.loading = false;
        draft.error = action.error;
        break;
      case FETCH_LOGS_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.origin_logs = action.logs;
        draft.logs = doQuery(draft.origin_logs, draft.query);
        break;
    }
  });

export default logReducer;

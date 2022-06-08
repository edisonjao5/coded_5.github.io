/*
 *
 * Global reducer
 *
 */
import produce from 'immer';
import {
  FETCH_PRELOAD_DATA,
  FETCH_PRELOAD_DATA_ERROR,
  FETCH_PRELOAD_DATA_SUCCESS,
  LOGOUT,
} from './constants';
import { Auth } from './helpers';

export const initialState = {
  loading: false,
  error: false,
  preload: {},
};

/* eslint-disable default-case, no-param-reassign */
const globalReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOGOUT:
        draft.loading = false;
        draft.error = false;
        Auth.logout();
        break;
      case FETCH_PRELOAD_DATA:
        draft.loading = true;
        draft.error = false;
        break;
      case FETCH_PRELOAD_DATA_ERROR:
        draft.loading = false;
        draft.error = action.error;
        break;
      case FETCH_PRELOAD_DATA_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.preload = action.preload;
        break;
    }
  });

export default globalReducer;

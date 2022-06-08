/*
 *
 * Users reducer
 *
 */
import produce from 'immer';
import {
  FETCH_USER_INMOBILIARIAS,
  FETCH_USER_INMOBILIARIAS_ERROR,
  FETCH_USER_INMOBILIARIAS_SUCCESS,
} from './constants';

export const initialState = {
  loading: false,
  error: false,
  users: false,
};

/* eslint-disable default-case, no-param-reassign */
const userInmobiliariasReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case FETCH_USER_INMOBILIARIAS:
        draft.loading = true;
        draft.error = false;
        break;
      case FETCH_USER_INMOBILIARIAS_ERROR:
        draft.loading = false;
        draft.error = action.error;
        break;
      case FETCH_USER_INMOBILIARIAS_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.users = action.users;
        break;
    }
  });

export default userInmobiliariasReducer;

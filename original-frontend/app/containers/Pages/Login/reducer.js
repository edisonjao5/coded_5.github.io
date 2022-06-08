/*
 *
 * LoginPage reducer
 *
 */
import produce from 'immer';
import { Auth } from 'containers/App/helpers';
import { DO_LOGIN, DO_LOGIN_ERROR, DO_LOGIN_SUCCESS } from './constants';

export const initialState = {
  loading: false,
  error: false,
};

/* eslint-disable default-case, no-param-reassign */
const authReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DO_LOGIN:
        draft.loading = true;
        draft.error = false;
        break;
      case DO_LOGIN_SUCCESS:
        draft.loading = false;
        draft.error = false;
        Auth.logout();
        Auth.logIn(action.auth, action.remember);
        break;
      case DO_LOGIN_ERROR:
        draft.loading = false;
        draft.error = action.error;
        break;
    }
  });

export default authReducer;

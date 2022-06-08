/*
 *
 * Users reducer
 *
 */
import produce from 'immer';
import {
  ACTIVE_USER,
  ACTIVE_USER_ERROR,
  ACTIVE_USER_SUCCESS,
  FETCH_USERS,
  FETCH_USERS_ERROR,
  FETCH_USERS_SUCCESS,
  GET_USER,
  GET_USER_ERROR,
  GET_USER_SUCCESS,
  QUERY_USERS,
  RESET_PASSWORD_USER,
  RESET_PASSWORD_USER_ERROR,
  RESET_PASSWORD_USER_SUCCESS,
  RESET_QUERY_USERS,
  SAVE_USER,
  SAVE_USER_ERROR,
  SAVE_USER_SUCCESS,
  SELECT_USER,
  TOGGLE_FORM,
} from './constants';
import { doQuery } from './helper';

export const initialState = {
  query: { sort: { by: 'Name', asc: true } },
  loading: false,
  error: false,
  success: false,
  users: false,
  origin_users: false,
  roles: false,
  permissions: false,
  user: false,
  screen: false,
};

/* eslint-disable default-case, no-param-reassign */
const userReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case RESET_QUERY_USERS:
        draft.query = initialState.query;
        draft.users = doQuery(state.origin_users, draft.query);
        break;
      case QUERY_USERS:
        draft.query = !action.query
          ? initialState.query
          : { ...draft.query, ...action.query };
        draft.users = doQuery(state.origin_users, draft.query);
        break;
      case FETCH_USERS:
        draft.loading = true;
        draft.error = false;
        draft.success = false;
        break;
      case FETCH_USERS_ERROR:
        draft.loading = false;
        draft.error = action.error;
        draft.success = false;
        break;
      case FETCH_USERS_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.origin_users = action.users;
        draft.users = doQuery(action.users, draft.query);
        draft.roles = action.roles;
        draft.permissions = action.permissions;
        break;
      case GET_USER:
      case SAVE_USER:
        draft.loading = true;
        draft.error = false;
        draft.success = false;
        break;
      case GET_USER_ERROR:
      case SAVE_USER_ERROR:
      case RESET_PASSWORD_USER_ERROR:
      case ACTIVE_USER_ERROR:
        draft.loading = false;
        draft.error = {
          body: (action.error.body.Email ||
            action.error.body.Rut || [action.error.body])[0],
        };
        draft.success = false;
        break;
      case GET_USER_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.user = action.user;
        break;
      case RESET_PASSWORD_USER:
      case ACTIVE_USER:
        draft.loading = true;
        draft.error = false;
        draft.success = false;
        draft.screen = action.screen;
        draft.user = { UserID: action.UserID };
        break;
      case SAVE_USER_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.success = action.response.detail;
        draft.user = action.response.user;
        draft.origin_users = [
          ...draft.origin_users.filter(
            user => user.UserID !== action.response.user.UserID,
          ),
          action.response.user,
        ];
        draft.users = doQuery(draft.origin_users, draft.query);
        break;
      case RESET_PASSWORD_USER_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.success = action.response.detail;
        break;
      case ACTIVE_USER_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.success = action.response.active
          ? 'El usuario está activado.'
          : 'El usuario está desactivado.';
        draft.origin_users = draft.origin_users.map(user => ({
          ...user,
          IsActive:
            user.UserID === draft.user.UserID
              ? action.response.active
              : user.IsActive,
        }));
        draft.users = doQuery(draft.origin_users, state.query);
        break;
      case SELECT_USER:
        draft.loading = false;
        draft.error = false;
        draft.success = false;
        draft.user = action.user;
        break;
      case TOGGLE_FORM:
        draft.screen = action.screen;
        draft.loading = false;
        draft.error = false;
        draft.success = false;
        draft.user = { UserID: action.UserID };
        break;
    }
  });

export default userReducer;

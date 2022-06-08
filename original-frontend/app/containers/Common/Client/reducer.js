/*
 *
 * Clients reducer
 *
 */
import produce from 'immer';
import {
  FETCH_CLIENTS,
  FETCH_CLIENTS_ERROR,
  FETCH_CLIENTS_SUCCESS,
  GET_CLIENT,
  GET_CLIENT_ERROR,
  GET_CLIENT_SUCCESS,
  DELETE_CLIENT,
  DELETE_CLIENT_ERROR,
  DELETE_CLIENT_SUCCESS,
  QUERY_CLIENTS,
  SAVE_CLIENT,
  SAVE_CLIENT_ERROR,
  SAVE_CLIENT_SUCCESS,
  SELECT_CLIENT,
  TOGGLE_FORM,
} from './constants';
import { doQuery } from './helper';

export const initialState = {
  query: { sort: { by: 'Name', asc: true } },
  loading: false,
  error: false,
  success: false,
  clients: false,
  origin_clients: false,
  client: false,
  screen: false,
};

/* eslint-disable default-case, no-param-reassign */
const clientReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case QUERY_CLIENTS:
        draft.query = !action.query
          ? initialState.query
          : { ...draft.query, ...action.query };
        draft.clients = doQuery(state.origin_clients, draft.query);
        break;
      case FETCH_CLIENTS:
        draft.loading = true;
        draft.error = false;
        draft.success = false;
        break;
      case FETCH_CLIENTS_ERROR:
        draft.loading = false;
        draft.error = action.error;
        draft.success = false;
        break;
      case FETCH_CLIENTS_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.origin_clients = action.clients.map(client => ({
          ...client,
          BirthDate: client.BirthDate || null,
        }));
        draft.clients = doQuery(draft.origin_clients, draft.query);
        break;
      case GET_CLIENT:
      case DELETE_CLIENT:
      case SAVE_CLIENT:
        draft.loading = true;
        draft.error = false;
        draft.success = false;
        break;
      case GET_CLIENT_ERROR:
      case DELETE_CLIENT_ERROR:
      case SAVE_CLIENT_ERROR:
        draft.loading = false;
        draft.error = action.error;
        draft.success = false;
        break;
      case GET_CLIENT_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.client = action.client;
        break;
      case DELETE_CLIENT_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.success = action.response.detail;
        draft.UserID = action.response.cliente;
        draft.origin_clients = [
          ...draft.origin_clients.filter(
            client => client.UserID !== action.response.cliente,
          )
        ];
        draft.clients = doQuery(draft.origin_clients, draft.query);
        break;
      case SAVE_CLIENT_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.success = action.response.detail;
        draft.client = action.response.cliente;
        draft.origin_clients = [
          ...draft.origin_clients.filter(
            client => client.UserID !== action.response.cliente.UserID,
          ),
          action.response.cliente,
        ];
        draft.clients = doQuery(draft.origin_clients, draft.query);
        break;
      case SELECT_CLIENT:
        draft.loading = false;
        draft.error = false;
        draft.success = false;
        draft.client = action.client;
        break;
      case TOGGLE_FORM:
        draft.screen = action.screen;
        draft.loading = !!(
          action.client &&
          action.client.UserID &&
          action.screen
        );
        draft.error = false;
        draft.success = false;
        draft.client = action.client;
        break;
    }
  });

export default clientReducer;

/*
 *
 * Dashboard reducer
 *
 */
import produce from 'immer';
import { SortPendingAction, SortUserPendingAction, doQuery } from './helper';
import {
  FETCH_ENTITIES,
  FETCH_ENTITIES_ERROR,
  FETCH_ENTITIES_SUCCESS,
  FETCH_LOGS,
  FETCH_LOGS_ERROR,
  FETCH_LOGS_SUCCESS,
  QUERY_CONTROL_USER,
} from './constants';

export const initialState = {
  query: { sort: { by: 'Date', asc: true }, modal: false },
  loading: false,
  error: false,
  entities: false,
  Logs: false,
  Counter: false,
  PendingActions: false,
  ControlUser: false,
  origin_ControlUser: false,
  origin_ControlModalUser: false,
};

/* eslint-disable default-case, no-param-reassign */
const dashboardReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case QUERY_CONTROL_USER:
        draft.query = !action.query
          ? initialState.query
          : { ...draft.query, ...action.query };
        if (draft.query.modal === true)
          draft.origin_ControlModalUser = doQuery(state.origin_ControlUser, draft.query);
        else
          draft.ControlUser = doQuery(state.origin_ControlUser, draft.query);
        break;
      case FETCH_ENTITIES:
        draft.loading = true;
        draft.error = false;
        draft.entities = false;
        break;
      case FETCH_ENTITIES_ERROR:
        draft.loading = false;
        draft.error = action.error;
        break;
      case FETCH_ENTITIES_SUCCESS:
        draft.loading = true;
        draft.error = false;
        draft.entities = action.entities;
        break;
      case FETCH_LOGS:
        draft.loading = true;
        draft.error = false;
        draft.Logs = false;
        break;
      case FETCH_LOGS_ERROR:
        draft.loading = false;
        draft.error = action.error;
        break;
      case FETCH_LOGS_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.Logs = action.logs;
        draft.Counter = action.pendingActions.count;
        const Actions = action.pendingActions.PendingAction;
        const arr_action = [...Actions.Reserva, ...Actions.Ofertas, ...Actions.Promesa];
        draft.PendingActions = SortPendingAction(arr_action);
        draft.origin_ControlUser = SortUserPendingAction(action.allUsers, draft.PendingActions);
        draft.ControlUser = doQuery(draft.origin_ControlUser, draft.query);
        draft.origin_ControlUser = draft.ControlUser;
        draft.origin_ControlModalUser = draft.ControlUser;
        break;
    }
  });

export default dashboardReducer;

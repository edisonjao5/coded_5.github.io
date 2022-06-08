/*
 *
 * Entities reducer
 *
 */
import produce from 'immer';
import {
  FETCH_ENTITIES,
  FETCH_ENTITIES_ERROR,
  FETCH_ENTITIES_SUCCESS,
  QUERY_ENTITIES,
  SAVE_ENTITY,
  SAVE_ENTITY_ERROR,
  SAVE_ENTITY_SUCCESS,
  SELECT_ENTITY,
  TOGGLE_FORM,
} from './constants';
import { doQuery } from './helper';

export const initialState = {
  query: { sort: { by: 'RazonSocial', asc: true } },
  loading: false,
  error: false,
  success: false,
  constructoras: false,
  inmobiliarias: false,
  entities: false,
  entity: false,
  screen: false,
};

/* eslint-disable default-case, no-param-reassign */
const realEstateReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case QUERY_ENTITIES:
        draft.query = !action.query
          ? initialState.query
          : { ...draft.query, ...action.query };
        draft.entities = doQuery(state[`${draft.query.type}s`], draft.query);
        break;
      case FETCH_ENTITIES:
        draft.loading = true;
        draft.error = false;
        draft.success = false;
        break;
      case FETCH_ENTITIES_ERROR:
        draft.loading = false;
        draft.error = action.error;
        draft.success = false;
        break;
      case FETCH_ENTITIES_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.constructoras = action.constructoras;
        draft.inmobiliarias = action.inmobiliarias;
        draft.entities = doQuery(action[`${draft.query.type}s`], draft.query);
        break;
      case SAVE_ENTITY:
        draft.loading = true;
        draft.error = false;
        draft.success = false;
        break;
      case SAVE_ENTITY_ERROR:
        draft.loading = false;
        draft.error = action.error;
        draft.success = false;
        break;
      case SAVE_ENTITY_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.success = action.response.detail;
        draft.entity = action.response.entity;
        draft.constructoras = action.response.constructoras;
        draft.inmobiliarias = action.response.inmobiliarias;
        draft.entities = doQuery(
          action.response[`${draft.query.type}s`],
          draft.query,
        );
        break;

      case SELECT_ENTITY:
        draft.loading = false;
        draft.error = false;
        draft.success = false;
        draft.realEstate = action.realEstate;
        break;
      case TOGGLE_FORM:
        draft.screen = action.screen;
        draft.loading = false;
        draft.error = false;
        draft.success = false;
        draft.entity = {
          ...(draft.constructoras.find(
            item => item.RazonSocial === action.entity.RazonSocial,
          ) || {}),
          ...(draft.inmobiliarias.find(
            item => item.RazonSocial === action.entity.RazonSocial,
          ) || {}),
          ...action.entity,
        };
        break;
    }
  });

export default realEstateReducer;

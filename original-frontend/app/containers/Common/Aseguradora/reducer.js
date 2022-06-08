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
  TOGGLE_FORM,
} from './constants';
import { doQuery } from './helper';

export const initialState = {
  query: { sort: { by: 'Name', asc: true } },
  loading: false,
  error: false,
  success: false,
  entities: false,
  origin_entities: false,
  entity: false,
  screen: false,
};

/* eslint-disable default-case, no-param-reassign */
const entityReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case QUERY_ENTITIES:
        draft.query = !action.query
          ? initialState.query
          : { ...draft.query, ...action.query };
        draft.entities = doQuery(state.origin_entities, draft.query);
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
        draft.origin_entities = action.entities;
        draft.entities = doQuery(action.entities, draft.query);
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
        draft.success = 'Guardar el éxito';
        draft.entity = action.entity;
        draft.origin_entities = [
          ...draft.origin_entities.filter(
            entity => entity.AseguradoraID !== action.entity.AseguradoraID,
          ),
          action.entity,
        ];
        draft.entities = doQuery(draft.origin_entities, draft.query);
        break;
      case TOGGLE_FORM:
        draft.screen = action.screen;
        draft.loading = false;
        draft.error = false;
        draft.success = false;
        draft.entity = action.entity;
        break;
    }
  });

export default entityReducer;

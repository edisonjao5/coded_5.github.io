/*
 *
 * Restriction reducer
 *
 */
import produce from 'immer';
import {
  DELETE_RESTRICTION,
  DELETE_RESTRICTION_ERROR,
  DELETE_RESTRICTION_SUCCESS,
  FETCH_ENTITIES,
  FETCH_ENTITIES_ERROR,
  FETCH_ENTITIES_SUCCESS,
  RESET_CONTAINER,
  SAVE_RESTRICTION,
  SAVE_RESTRICTION_ERROR,
  SAVE_RESTRICTION_SUCCESS,
  SET_RESTRICTION,
} from './constants';

export const initialState = {
  loading: false,
  error: false,
  entities: false,
  entity: false,
  deleteEntity: false,
};

/* eslint-disable default-case, no-param-reassign */
const restrictionReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case RESET_CONTAINER:
        draft.loading = false;
        draft.error = false;
        draft.success = false;
        draft.entity = false;
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
        draft.entities = action.response;
        draft.entities = draft.entities.sort((a, b) => {
          if (a.Inmueble > b.Inmueble) return 1;
          if (a.Inmueble < b.Inmueble) return -1;
          return 0;
        });
        break;

      case SET_RESTRICTION:
        if (action.data) {
          if (action.data.Restrictions) draft.entity = action.data;
          else
            draft.entity =
              draft.entities.find(
                item => item.InmuebleAID === action.data.InmuebleAID,
              ) || action.data;
        } else draft.entity = action.data;
        break;
      case SAVE_RESTRICTION:
        draft.loading = true;
        draft.error = false;
        draft.success = false;
        break;
      case SAVE_RESTRICTION_ERROR:
        draft.loading = false;
        draft.error = action.error;
        draft.success = false;
        break;
      case SAVE_RESTRICTION_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.success = action.response.detail;
        draft.entities = (draft.entities || []).filter(
          item => item.InmuebleAID !== draft.entity.InmuebleAID,
        );
        if (action.response.inmueble_restriction.length > 0) {
          draft.entities.push(
            action.response.inmueble_restriction.reduce(
              (acc, item) => {
                acc.Restrictions.push({
                  InmuebleBID: item.InmuebleBID,
                  Inmueble: item.InmuebleB,
                  InmuebleInmuebleTypeID: item.InmuebleInmuebleTypeID,
                  InmuebleInmuebleType: item.InmuebleInmuebleType,
                });
                return acc;
              },
              { ...draft.entity, Restrictions: [] },
            ),
          );
        }
        draft.entities = draft.entities.sort((a, b) => {
          if (a.Inmueble > b.Inmueble) return 1;
          if (a.Inmueble < b.Inmueble) return -1;
          return 0;
        });
        draft.entity = false;
        break;
      case DELETE_RESTRICTION:
        draft.deleteEntity = action.entity;
        draft.loading = true;
        draft.error = false;
        draft.success = false;
        break;
      case DELETE_RESTRICTION_ERROR:
        draft.loading = false;
        draft.error = action.error;
        draft.success = false;
        draft.deleteEntity = false;
        break;
      case DELETE_RESTRICTION_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.success = action.response.detail;
        draft.entities = (draft.entities || []).filter(
          item => item.InmuebleAID !== draft.deleteEntity.InmuebleAID,
        );
        draft.entities = draft.entities.sort((a, b) => {
          if (a.Inmueble > b.Inmueble) return 1;
          if (a.Inmueble < b.Inmueble) return -1;
          return 0;
        });
        draft.deleteEntity = false;
        break;
    }
  });

export default restrictionReducer;

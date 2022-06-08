/*
 *
 * Entities actions
 *
 */

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

export function queryEntities(query) {
  return {
    type: QUERY_ENTITIES,
    query,
  };
}

export function fetchEntities() {
  return {
    type: FETCH_ENTITIES,
  };
}

export function fetchEntitiesError(error) {
  return {
    type: FETCH_ENTITIES_ERROR,
    error,
  };
}

export function fetchEntitiesSuccess(response) {
  return {
    type: FETCH_ENTITIES_SUCCESS,
    ...response,
  };
}
export function saveEntity(values) {
  return {
    type: SAVE_ENTITY,
    values: {
      ...values,
      IsInmobiliaria: !!values.IsInmobiliaria,
      IsConstructora: !!values.IsConstructora,
      UsersInmobiliaria: values.UsersInmobiliaria.map(user => ({
        ...user,
        UserInmobiliariaTypeName:
          user.UserInmobiliariaTypeName || user.UserInmobiliariaType,
      })),
      Contact: values.Contact.map(contact => ({
        ...contact,
        ContactInfoTypeID: contact.ContactInfoTypeID || contact.ContactInfoType,
      })),
    },
  };
}

export function saveEntityError(error) {
  return {
    type: SAVE_ENTITY_ERROR,
    error,
  };
}

export function saveEntitySuccess(response) {
  return {
    type: SAVE_ENTITY_SUCCESS,
    response,
  };
}

export function toggleScreen(screen, entity) {
  return {
    type: TOGGLE_FORM,
    screen,
    entity,
  };
}

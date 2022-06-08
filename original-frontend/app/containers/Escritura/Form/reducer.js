/*
 *
 * Promesa reducer
 *
 */
import produce from 'immer';
import {
  GET_ESCRITURA,
  GET_ESCRITURA_ERROR,
  GET_ESCRITURA_SUCCESS,
  UPDATE_ESCRITURA,
  UPDATE_ESCRITURA_ERROR,
  UPDATE_ESCRITURA_SUCCESS,
  CHECK_PROMESA,
  CHECK_PROMESA_ERROR,
  CHECK_PROMESA_SUCCESS,
  NOTIFICAR_COMPRADO,
  NOTIFICAR_COMPRADO_ERROR,
  NOTIFICAR_COMPRADO_SUCCESS,
  APROVA_HIPOTECARIOS,
  APROVA_HIPOTECARIOS_ERROR,
  APROVA_HIPOTECARIOS_SUCCESS,
  CHECK_HIPOTECARIOS,
  CHECK_HIPOTECARIOS_ERROR,
  CHECK_HIPOTECARIOS_SUCCESS,
  APROVA_BANK,
  APROVA_BANK_ERROR,
  APROVA_BANK_SUCCESS,
  UPDATE_SALE,
  UPDATE_SALE_ERROR,
  UPDATE_SALE_SUCCESS,
} from './constants';

export const initialState = {
  loading: false,
  error: false,
  success: false,
  escritura: false,
  promesa: false,
  project: false,
  redirect: '',
};

/* eslint-disable default-case, no-param-reassign */
const escrituraReducer = (state = initialState, action) =>
  /* eslint-disable-next-line */
  produce(state, draft => {
    switch (action.type) {
      case GET_ESCRITURA:
      case UPDATE_ESCRITURA:
      case CHECK_PROMESA:
      case NOTIFICAR_COMPRADO:
      case APROVA_HIPOTECARIOS:
      case CHECK_HIPOTECARIOS:
      case APROVA_BANK:
      case UPDATE_SALE:
        draft.loading = true;
        draft.error = false;
        draft.success = false;
        draft.escritura = false;
        draft.promesa = false;
        draft.redirect = '';
        break;
      case GET_ESCRITURA_ERROR:
      case UPDATE_ESCRITURA_ERROR:
      case CHECK_PROMESA_ERROR:
      case NOTIFICAR_COMPRADO_ERROR:
      case APROVA_HIPOTECARIOS_ERROR:
      case CHECK_HIPOTECARIOS_ERROR:
      case APROVA_BANK_ERROR:
      case UPDATE_SALE_ERROR:
        draft.loading = false;
        draft.error = action.error;
        draft.success = false;
        draft.redirect = '';
        break;
      case GET_ESCRITURA_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.success = true;
        draft.redirect = '';      
        draft.escritura = action.response.escritura;
        draft.promesa = action.response.promesa;
        break;
      case UPDATE_ESCRITURA_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.success = action.response.detail;
        draft.project = action.response.proyecto;
        break;        
      case CHECK_PROMESA_SUCCESS:
      case NOTIFICAR_COMPRADO_SUCCESS:
      case APROVA_HIPOTECARIOS_SUCCESS:
      case CHECK_HIPOTECARIOS_SUCCESS:
      case APROVA_BANK_SUCCESS:
      case UPDATE_SALE_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.success = true;        
        draft.escritura = action.response.escritura;
        draft.promesa = action.response.promesa;
        draft.redirect = '';
        break;
    }
  });

export default escrituraReducer;

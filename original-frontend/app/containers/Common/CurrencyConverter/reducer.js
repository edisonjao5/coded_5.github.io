/*
 *
 * CurrencyConverter reducer
 *
 */
import produce from 'immer';
import {
  CONVERT_ACTION,
  CONVERT_ACTION_ERROR,
  CONVERT_ACTION_SUCCESS,
  UPDATE_CONVERTS,
} from './constants';
import { convertStringToNumber } from '../../App/helpers';

export const initialState = {
  loading: false,
  error: false,
  entity: {
    fecha: '',
    valor: 0,
    monto: 1,
  },
  converts: {
    fromUF: 0,
    toCLP: 0,
    fromCLP: 0,
    toUF: 0,
  },
};

const doConvert = (rate, converts) => ({
  ...converts,
  toCLP: convertStringToNumber(converts.fromUF) * rate,
  toUF: convertStringToNumber(converts.fromCLP) / rate,
});
/* eslint-disable default-case, no-param-reassign */
const currencyConverterReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CONVERT_ACTION:
        draft.loading = true;
        draft.error = false;
        break;
      case CONVERT_ACTION_ERROR:
        draft.loading = false;
        draft.error = true;
        break;
      case CONVERT_ACTION_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.entity = action.response;
        draft.converts = doConvert(draft.entity.valor, state.converts);
        break;
      case UPDATE_CONVERTS:
        draft.converts = doConvert(state.entity.valor, {
          ...state.converts,
          ...action.converts,
        });
        break;
    }
  });

export default currencyConverterReducer;

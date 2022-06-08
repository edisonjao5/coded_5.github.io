import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { API_ROOT } from 'containers/App/constants';
import { RECEPCION_GRANTIA } from './constants';
import { recepcionGarantiaError, recepcionGarantiaSuccess } from './actions';

export function* sagaRecepcionGarantian(action) {
  const requestURL = `${API_ROOT}/ventas/ofertas-register-guarantee/${
    action.OfertaID
  }/`;
  try {
    const response = yield call(request, requestURL, {
      method: 'PATCH',
      body: JSON.stringify({ Refund: action.refund }),
    });
    yield put(recepcionGarantiaSuccess(action.OfertaID, response));
  } catch (error) {
    yield put(recepcionGarantiaError(action.OfertaID, error));
  }
}

export default function* offerSaga() {
  yield takeLatest(RECEPCION_GRANTIA, sagaRecepcionGarantian);
}

import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { API_ROOT } from 'containers/App/constants';
import { updatePromesa } from 'containers/Promesa/Form/actions';
import { REFUND_GRANTIA } from './constants';
import { refundGarantiaError, refundGarantiaSuccess } from './actions';

export function* sagaRefundGarantian(action) {
  const requestURL = `${API_ROOT}/ventas/promesas-refund/${action.PromesaID}/`;
  try {
    const response = yield call(request, requestURL, {
      method: 'PATCH',
    });
    yield put(refundGarantiaSuccess(action.PromesaID, response));
    yield put(updatePromesa(response.promesa));
  } catch (error) {
    yield put(refundGarantiaError(action.PromesaID, error));
  }
}

export default function* promesaRefundGarantiaSaga() {
  yield takeLatest(REFUND_GRANTIA, sagaRefundGarantian);
}

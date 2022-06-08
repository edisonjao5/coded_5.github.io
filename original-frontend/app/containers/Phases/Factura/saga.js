import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { API_ROOT } from 'containers/App/constants';
import FileSaver from 'file-saver';
import { PAID_FACTURA, RESUME_FACTURA } from './constants';
import {
  paidFacturaError,
  paidFacturaSuccess,
  resumeFacturaError,
  resumeFacturaSuccess,
} from './actions';

export function* sagaResumeFactura(action) {
  const requestURL = `${API_ROOT}/ventas/${
    action.noteCredit ? 'facturas-nota-credito-download' : 'facturas-download'
  }/${action.factura.FacturaID}/`;
  try {
    const response = yield call(request, requestURL, {
      method: 'PATCH',
    });
    FileSaver.saveAs(
      response,
      `${action.noteCredit ? 'NoteCredit' : 'Factura'}${
        action.factura.Number
      }.pdf`,
    );
    yield put(resumeFacturaSuccess(action.factura, response));
  } catch (error) {
    yield put(resumeFacturaError(action.factura, error));
  }
}

export function* sagaPaidFactura(action) {
  const requestURL = `${API_ROOT}/ventas/${
    action.noteCredit
      ? 'facturas-register-nota-credito'
      : 'facturas-register-payment'
  }/${action.factura.FacturaID}/`;
  try {
    const response = yield call(request, requestURL, {
      method: 'PATCH',
    });
    yield put(paidFacturaSuccess(action.factura, response));
  } catch (error) {
    yield put(paidFacturaError(action.factura, error));
  }
}

export default function* facturaSaga() {
  yield takeLatest(RESUME_FACTURA, sagaResumeFactura);
  yield takeLatest(PAID_FACTURA, sagaPaidFactura);
}

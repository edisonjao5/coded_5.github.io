import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
// import moment from 'components/moment';

import { API_ROOT } from 'containers/App/constants';
import {
  GET_ESCRITURA,
  UPDATE_ESCRITURA,
  CHECK_PROMESA,
  NOTIFICAR_COMPRADO,
  APROVA_HIPOTECARIOS,
  CHECK_HIPOTECARIOS,
  APROVA_BANK,
  UPDATE_SALE
} from './constants';

import {
  getEscrituraError,
  getEscrituraSuccess,
  updateEscrituraError,
  updateEscrituraSuccess,
  checkPromesaError,
  checkPromesaSuccess,
  notificarCompradoresError,
  notificarCompradoresSuccess,
  aprobaHipotecariosError,
  aprobaHipotecariosSuccess,
  checkHipotecariosError,
  checkHipotecariosSuccess,
  aprovaBankError,
  aprovaBankSuccess,
  updateSaleSuccess,
  updateSaleError
} from './actions';

function* sagaGetEscritura(action) {
  const requestURL = `${API_ROOT}/ventas/escrituras/${action.EscrituraID}/`;
  try {
    const response = yield call(request, requestURL);
    yield put(getEscrituraSuccess(response));
  } catch (error) {
    yield put(getEscrituraError(error));
  }
}

function* sagaUpdateEscritura(action) {
  const requestURL = `${API_ROOT}/ventas/escritura-proyecto/${action.ProyectoID}/`;
  try {
    const response = yield call(
      request,
      requestURL,
      {
        method: 'PATCH',
        body: action.values,
        headers: {
          'content-type': null,
        },
      }
    );

    yield put(updateEscrituraSuccess(response));
  } catch (error) {
    yield put(updateEscrituraError(error));
  }
}

function* sagaCheckPromesa(action) {
  try {
    const response = yield call(
      request,
      `${API_ROOT}/ventas/escrituras/${action.EscrituraID}/`,
      {
        method: 'PATCH',
        body: action.values,
        headers: {
          'content-type': null,
        },
      }
    );

    yield put(checkPromesaSuccess(response));
  } catch (error) {
    yield put(checkPromesaError(error));
  }
}

function* sagaNotificarCompradores(action) {
  const requestURL = `${API_ROOT}/ventas/escrituras/${action.EscrituraID}/notificar/`;
  try {
    const response = yield call(
      request,
      requestURL,
      {
        method: 'PATCH',
        body: JSON.stringify(action.values),
      }
    );

    yield put(notificarCompradoresSuccess(response));
  } catch (error) {
    yield put(notificarCompradoresError(error));
  }
}

function* sagaAprobaHipotecarios(action) {
  const requestURL = `${API_ROOT}/ventas/escrituras/${action.EscrituraID}/aprova_credit/`;
  try {
    const response = yield call(
      request,
      requestURL,
      {
        method: 'PATCH',
        body: action.values,
        headers: {
          'content-type': null,
        },
      }
    );

    yield put(aprobaHipotecariosSuccess(response));
  } catch (error) {
    yield put(aprobaHipotecariosError(error));
  }
}

function* sagaCheckHipotecarios(action) {
  const requestURL = `${API_ROOT}/ventas/escrituras/${action.EscrituraID}/check_credit/`;
  try {
    const response = yield call(
      request,
      requestURL,
      {
        method: 'PATCH',
        body: action.values,
        headers: {
          'content-type': null,
        },
      }
    );

    yield put(checkHipotecariosSuccess(response));
  } catch (error) {
    yield put(checkHipotecariosError(error));
  }
}

function* sagaAprovaBank(action) {
  try {
    const response = yield call(
      request,
      `${API_ROOT}/ventas/escrituras/${action.EscrituraID}/`,
      {
        method: 'PATCH',
        body: action.values,
        headers: {
          'content-type': null,
        },
      }
    );

    yield put(aprovaBankSuccess(response));
  } catch (error) {
    yield put(aprovaBankError(error));
  }
}

function* sagaUpdateSale(action) {
  const requestURL = `${API_ROOT}/ventas/escrituras/${action.EscrituraID}/`;
  try {
    const response = yield call(
      request,
      requestURL,
      {
        method: 'PATCH',
        body: JSON.stringify(action.values),
      }
    );

    yield put(updateSaleSuccess(response));
  } catch (error) {
    yield put(updateSaleError(error));
  }
}

export default function* projectSaga() {
  yield takeLatest(GET_ESCRITURA, sagaGetEscritura);
  yield takeLatest(UPDATE_ESCRITURA, sagaUpdateEscritura);
  yield takeLatest(CHECK_PROMESA, sagaCheckPromesa);
  yield takeLatest(NOTIFICAR_COMPRADO, sagaNotificarCompradores);
  yield takeLatest(APROVA_HIPOTECARIOS, sagaAprobaHipotecarios);
  yield takeLatest(CHECK_HIPOTECARIOS, sagaCheckHipotecarios);
  yield takeLatest(APROVA_BANK, sagaAprovaBank);
  yield takeLatest(UPDATE_SALE, sagaUpdateSale);
}

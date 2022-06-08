import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { API_ROOT } from 'containers/App/constants';
import { updatePromesa } from 'containers/Promesa/Form/actions';
import { DESISTIMIENTO, UPLOAD_CONFECCION } from './constants';
import {
  desistimentoError,
  desistimentoSuccess,
  uploadConfeccionError,
  uploadConfeccionSuccess,
} from './actions';

export function* sagaDesistimento(action) {
  const requestURL = `${API_ROOT}/ventas/promesas-register-desistimiento/${
    action.values.PromesaID
  }/`;
  try {
    const response = yield call(request, requestURL, {
      method: 'PATCH',
      body: JSON.stringify(action.values),
    });
    yield put(desistimentoSuccess(response));
    yield put(updatePromesa(response.promesa));
  } catch (error) {
    yield put(desistimentoError(error));
  }
}

function* sagaUploadConfeccion(action) {
  const data = new FormData();
  Object.keys(action.values).forEach(name => {
    if (action.values[name].name) data.append(name, action.values[name]);
  });
  try {
    const response = yield call(
      request,
      `${API_ROOT}/ventas/promesas-upload-confeccion-desistimiento/${
        action.PromesaID
      }/`,
      {
        method: 'PATCH',
        body: data,
        headers: {
          'content-type': null,
        },
      },
    );

    yield put(uploadConfeccionSuccess(response));
    yield put(updatePromesa(response.promesa));
  } catch (error) {
    yield put(uploadConfeccionError(error));
  }
}

export default function* desistimientoSaga() {
  yield takeLatest(DESISTIMIENTO, sagaDesistimento);
  yield takeLatest(UPLOAD_CONFECCION, sagaUploadConfeccion);
}

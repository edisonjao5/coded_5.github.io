import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { API_ROOT, PROYECTO_DOCUMENT_STATE } from 'containers/App/constants';
import { updateProject } from '../../Init/actions';
import { GET_ENTITY, REVIEW_FINANZA, SAVE_ENTITY } from './constants';
import {
  getEntityError,
  getEntitySuccess,
  reviewFinanzaError,
  reviewFinanzaSuccess,
  saveEntityError,
  saveEntitySuccess,
} from './actions';

function* sagaGetEntity(action) {
  const requestURL = `${API_ROOT}/ventas/comisiones/?q=${action.ProyectoID}`;
  try {
    const response = yield call(request, requestURL);
    yield put(getEntitySuccess(response));
    // yield put(updateProject(response.proyecto));
  } catch (error) {
    yield put(getEntityError(error));
  }
}

function* sagaSaveEntity(action) {
  const requestURL = `${API_ROOT}/ventas/comisiones/`;
  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify({
        ProyectoID: action.ProyectoID,
        ...action.values,
      }),
    });
    yield put(saveEntitySuccess(response));
    yield put(
      updateProject({
        IngresoComisionesState: PROYECTO_DOCUMENT_STATE[1],
      }),
    );
  } catch (error) {
    yield put(saveEntityError(error));
  }
}

function* sagaReviewFinanza(action) {
  const requestURL = `${API_ROOT}/ventas/comisiones-update/${
    action.ProyectoID
  }`;
  try {
    const response = yield call(request, requestURL, {
      method: 'PATCH',
      body: JSON.stringify({
        State: action.State,
      }),
    });
    yield put(reviewFinanzaSuccess(response));
  } catch (error) {
    yield put(reviewFinanzaError(error));
  }
}

export default function* projectSaga() {
  yield takeLatest(SAVE_ENTITY, sagaSaveEntity);
  yield takeLatest(REVIEW_FINANZA, sagaReviewFinanza);
  yield takeLatest(GET_ENTITY, sagaGetEntity);
}

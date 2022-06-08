import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { API_ROOT } from 'containers/App/constants';
import { FETCH_ENTITIES, SAVE_ENTITY } from './constants';
import {
  fetchEntitiesError,
  fetchEntitiesSuccess,
  saveEntityError,
  saveEntitySuccess,
} from './actions';

function* fetchEntities() {
  try {
    const response = yield call(
      request,
      `${API_ROOT}/empresas-proyectos/instituciones-financieras/`,
    );

    yield put(fetchEntitiesSuccess(response));
  } catch (error) {
    yield put(fetchEntitiesError(error));
  }
}

function* saveEntity({ values }) {
  const requestURL = !values.InstitucionFinancieraID
    ? `${API_ROOT}/empresas-proyectos/instituciones-financieras/`
    : `${API_ROOT}/empresas-proyectos/instituciones-financieras/${
      values.InstitucionFinancieraID
    }/`;
  try {
    const response = yield call(request, requestURL, {
      method: !values.InstitucionFinancieraID ? 'POST' : 'PATCH',
      body: JSON.stringify(values),
    });
    yield put(saveEntitySuccess(response));
  } catch (error) {
    yield put(saveEntityError(error));
  }
}

export default function* institucionesFinancierasSaga() {
  yield takeLatest(FETCH_ENTITIES, fetchEntities);
  yield takeLatest(SAVE_ENTITY, saveEntity);
}

import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { API_ROOT } from 'containers/App/constants';
import { FETCH_ENTITIES } from './constants';
import { fetchEntitiesError, fetchEntitiesSuccess } from './actions';

function* fetchEntities() {
  const requestURL = `${API_ROOT}/empresas-proyectos/proyectos/`;
  try {
    const response = yield call(request, requestURL);
    yield put(fetchEntitiesSuccess(response));
  } catch (error) {
    yield put(fetchEntitiesError(error));
  }
}

export default function* projectListSaga() {
  yield takeLatest(FETCH_ENTITIES, fetchEntities);
}

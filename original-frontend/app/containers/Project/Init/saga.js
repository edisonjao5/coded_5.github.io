import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { API_ROOT } from 'containers/App/constants';
import { FETCH_PROJECT } from './constants';
import { fetchProjectError, fetchProjectSuccess } from './actions';

function* sagaFetchProject(action) {
  const requestURL = `${API_ROOT}/empresas-proyectos/proyectos/${action.id}/`;
  try {
    const response = yield call(request, requestURL);
    yield put(fetchProjectSuccess(response));
  } catch (error) {
    yield put(fetchProjectError(error));
  }
}

export default function* projectSaga() {
  yield takeLatest(FETCH_PROJECT, sagaFetchProject);
}

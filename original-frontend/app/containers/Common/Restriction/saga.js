import { select, call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { API_ROOT } from 'containers/App/constants';
import {
  DELETE_RESTRICTION,
  FETCH_ENTITIES,
  SAVE_RESTRICTION,
} from './constants';
import {
  fetchEntitiesSuccess,
  fetchEntitiesError,
  saveRestrictionSuccess,
  saveRestrictionError,
  deleteRestrictionSuccess,
  deleteRestrictionError,
} from './actions';
import makeSelectRestriction from './selectors';

export function* sagaFetchRestrictions(action) {
  try {
    const response = yield call(
      request,
      `${API_ROOT}/empresas-proyectos/proyectos/${
        action.ProyectoID
      }/restrictions/`,
    );
    yield put(fetchEntitiesSuccess(response));
  } catch (error) {
    yield put(fetchEntitiesError(error));
  }
}

export function* sagaSaveRestrictions() {
  const selector = yield select(makeSelectRestriction());
  try {
    const response = yield call(
      request,
      `${API_ROOT}/empresas-proyectos/inmuebles-restrictions/`,
      { method: 'POST', body: JSON.stringify(selector.entity) },
    );
    yield put(saveRestrictionSuccess(response));
  } catch (error) {
    yield put(saveRestrictionError(error));
  }
}

export function* sagaDeleteRestrictions(action) {
  try {
    const response = yield call(
      request,
      `${API_ROOT}/empresas-proyectos/inmuebles-restrictions/`,
      {
        method: 'POST',
        body: JSON.stringify({ ...action.entity, Restrictions: [] }),
      },
    );
    yield put(deleteRestrictionSuccess(response));
  } catch (error) {
    yield put(deleteRestrictionError(error));
  }
}

export default function* RestrictionSaga() {
  yield takeLatest(FETCH_ENTITIES, sagaFetchRestrictions);
  yield takeLatest(SAVE_RESTRICTION, sagaSaveRestrictions);
  yield takeLatest(DELETE_RESTRICTION, sagaDeleteRestrictions);
}

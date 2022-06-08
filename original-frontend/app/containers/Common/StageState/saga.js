import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { API_ROOT } from 'containers/App/constants';
import { FETCH_STAGE_STATES } from './constants';
import { fetchStageStatesError, fetchStageStatesSuccess } from './actions';

export function* fetchStageStates() {
  const requestURL = `${API_ROOT}/empresas-proyectos/proyectos-etapas-states/`;
  try {
    const response = yield call(request, requestURL);
    yield put(fetchStageStatesSuccess(response));
  } catch (error) {
    yield put(fetchStageStatesError(error));
  }
}

export default function* stageStatesSaga() {
  yield takeLatest(FETCH_STAGE_STATES, fetchStageStates);
}

import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { API_ROOT } from 'containers/App/constants';
import { SIMULATOR_ACTION } from './constants';
import { simulatorActionError, simulatorActionSuccess } from './actions';

function* simulatorAction(action) {
  try {
    const response = yield call(
      request,
      `${API_ROOT}/uf-simulador/`,
      {
        method: 'POST',
        body: JSON.stringify(action.values),
      }
    );
    yield put(simulatorActionSuccess(response));
  } catch (error) {
    yield put(simulatorActionError(error));
  }
}

export default function* simulatorCreditoSaga() {
  yield takeLatest(SIMULATOR_ACTION, simulatorAction);
}

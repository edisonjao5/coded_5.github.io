import { all, select, call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { API_ROOT } from 'containers/App/constants';
import moment from 'components/moment';
import {
  FETCH_CLIENTS,
  GET_CLIENT,
  SAVE_CLIENT,
  DELETE_CLIENT,
  TOGGLE_FORM,
} from './constants';
import {
  fetchClientsError,
  fetchClientsSuccess,
  getClientError,
  getClientSuccess,
  deleteClientError,
  deleteClientSuccess,
  saveClientError,
  saveClientSuccess,
} from './actions';
import makeSelectClient from './selectors';

function* fetchClients() {
  try {
    const [clients] = yield all([
      call(request, `${API_ROOT}/ventas/clientes/`),
    ]);
    yield put(fetchClientsSuccess({ clients }));
  } catch (error) {
    yield put(fetchClientsError(error));
  }
}

function* getClient(action) {
  const requestURL = `${API_ROOT}/ventas/clientes/${action.UserID}/`;
  try {
    const response = yield call(request, requestURL);
    yield put(getClientSuccess(response));
  } catch (error) {
    yield put(getClientError(error));
  }
}

function* deleteClient(action) {
  const requestURL = `${API_ROOT}/ventas/clientes/${action.UserID}`;
  try {
    const response = yield call(request, requestURL, {
      method: 'DELETE',
    });
    yield put(deleteClientSuccess(response));
  } catch (error) {
    yield put(deleteClientError(error));
  }
}

function* saveClient(action) {
  const selector = yield select(makeSelectClient());
  const oldClient = selector.client || {};
  const newClient = { ...oldClient, ...action.values };

  newClient.BirthDate =
    newClient.BirthDate === ''
      ? null
      : moment(newClient.BirthDate).format('YYYY-MM-DD');
  newClient.RegionID = newClient.RegionID === null ? '' : newClient.RegionID;
  console.log(newClient);
  newClient.ComunaID = newClient.ComunaID === null ? '' : newClient.ComunaID;

  const requestURL = !newClient.UserID
    ? `${API_ROOT}/ventas/clientes/`
    : `${API_ROOT}/ventas/clientes/${newClient.push(UserID)}/`;
  try {
    const response = yield call(request, requestURL, {
      method: !newClient.UserID ? 'POST' : 'PATCH',
      body: JSON.stringify(newClient),
    });
    yield put(saveClientSuccess(response));
  } catch (error) {
    yield put(saveClientError(error));
  }
}

function* toggleScreen(action) {
  if (action.client && action.client.UserID && action.screen) {
    yield call(getClient, { UserID: action.client.UserID || action.client });
  }
}

export default function* clientSaga() {
  yield takeLatest(FETCH_CLIENTS, fetchClients);
  yield takeLatest(GET_CLIENT, getClient);
  yield takeLatest(DELETE_CLIENT, deleteClient);
  yield takeLatest(SAVE_CLIENT, saveClient);
  yield takeLatest(TOGGLE_FORM, toggleScreen);
}

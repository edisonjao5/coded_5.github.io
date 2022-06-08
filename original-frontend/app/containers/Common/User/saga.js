import { all, select, call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { API_ROOT } from 'containers/App/constants';
import {
  ACTIVE_USER,
  FETCH_USERS,
  GET_USER,
  RESET_PASSWORD_USER,
  SAVE_USER,
  TOGGLE_FORM,
} from './constants';
import {
  activeUserError,
  activeUserSuccess,
  fetchUsersError,
  fetchUsersSuccess,
  getUserError,
  getUserSuccess,
  resetPasswordUserError,
  resetPasswordUserSuccess,
  saveUserError,
  saveUserSuccess,
} from './actions';
import makeSelectUser from './selectors';

function* fetchUsers() {
  try {
    const [users, roles, permission] = yield all([
      call(request, `${API_ROOT}/user-profiles/`),
      call(request, `${API_ROOT}/role-permissions/`),
      call(request, `${API_ROOT}/permissions/`),
    ]);
    yield put(fetchUsersSuccess({ users, roles, permission }));
  } catch (error) {
    yield put(fetchUsersError(error));
  }
}

function* getUser(action) {
  const requestURL = `${API_ROOT}/user-profiles/${action.UserID}/`;
  try {
    const response = yield call(request, requestURL);
    yield put(getUserSuccess(response));
  } catch (error) {
    yield put(getUserError(error));
  }
}

function* saveUser(action) {
  const selector = yield select(makeSelectUser());
  const oldUser = selector.user || {};
  const newUser = { ...oldUser, ...action.values };

  const requestURL = !newUser.UserID
    ? `${API_ROOT}/user-profiles/`
    : `${API_ROOT}/user-profiles/${newUser.UserID}/`;
  try {
    const response = yield call(request, requestURL, {
      method: !newUser.UserID ? 'POST' : 'PATCH',
      body: JSON.stringify(newUser),
    });
    yield put(saveUserSuccess(response));
  } catch (error) {
    yield put(saveUserError(error));
  }
}

function* resetPasswordUser(action) {
  const requestURL = `${API_ROOT}/password-reset/${action.UserID}`;
  try {
    const response = yield call(request, requestURL);
    yield put(resetPasswordUserSuccess(response));
  } catch (error) {
    yield put(resetPasswordUserError(error));
  }
}

function* activeUser(action) {
  const requestURL = `${API_ROOT}/user-activate/${action.UserID}`;
  try {
    const response = yield call(request, requestURL);
    yield put(activeUserSuccess(response));
  } catch (error) {
    yield put(activeUserError(error));
  }
}

function* toggleScreen(action) {
  if (action.user && action.user.UserID) {
    yield call(getUser, { UserID: action.user.UserID || action.user });
  }
}

export default function* userSaga() {
  yield takeLatest(FETCH_USERS, fetchUsers);
  yield takeLatest(GET_USER, getUser);
  yield takeLatest(SAVE_USER, saveUser);
  yield takeLatest(RESET_PASSWORD_USER, resetPasswordUser);
  yield takeLatest(ACTIVE_USER, activeUser);
  yield takeLatest(TOGGLE_FORM, toggleScreen);
}

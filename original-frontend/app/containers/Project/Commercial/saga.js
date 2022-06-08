import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { API_ROOT } from 'containers/App/constants';
import { updateProject } from '../Init/actions';
import { SAVE_PROJECT } from './constants';
import { saveProjectError, saveProjectSuccess } from './actions';

function* sagaSaveProject(action) {
  const requestURL = action.values.ProyectoID
    ? `${API_ROOT}/empresas-proyectos/proyectos/${action.values.ProyectoID}/`
    : `${API_ROOT}/empresas-proyectos/proyectos/`;
  try {
    const response = yield call(request, requestURL, {
      method: action.values.ProyectoID ? 'PATCH' : 'POST',
      body: JSON.stringify(action.values),
    });
    yield put(saveProjectSuccess(response));
    yield put(updateProject(response.proyecto));
  } catch (error) {
    yield put(saveProjectError(error));
  }
}

export default function* projectSaga() {
  yield takeLatest(SAVE_PROJECT, sagaSaveProject);
}

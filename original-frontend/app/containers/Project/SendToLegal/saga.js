import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { API_ROOT, PROYECTO_APPROVAL_STATE } from 'containers/App/constants';
import { updateProject } from '../Init/actions';
import { SEND_TO_LEGAL } from './constants';
import { sendToLegalError, sendToLegalSuccess } from './actions';

function* strickApproveDocuments(action) {
  return yield call(
    request,
    `${API_ROOT}/empresas-proyectos/proyectos-add-borrador/${
      action.ProyectoID
    }/`,
    {
      method: 'PATCH',
      body: JSON.stringify({
        Resolution: true,
      }),
    },
  );
}

function* sagaSendToApproveLegal(action) {
  const requestURL = `${API_ROOT}/empresas-proyectos/notifications-legal/${
    action.ProyectoID
  }/`;
  try {
    yield call(strickApproveDocuments, action);
    const response = yield call(request, requestURL, {
      method: 'PATCH',
    });
    yield put(sendToLegalSuccess(response));
    yield put(
      updateProject({ ProyectoApprovalState: PROYECTO_APPROVAL_STATE[1] }),
    );
  } catch (error) {
    yield put(sendToLegalError(error));
  }
}

export default function* projectSaga() {
  yield takeLatest(SEND_TO_LEGAL, sagaSendToApproveLegal);
}

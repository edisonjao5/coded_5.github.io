import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { API_ROOT } from 'containers/App/constants';
import { 
  FETCH_ESCRITURAS,
  CONFIRM_ESCRITURA, 
} from './constants';
import { 
  fetchEscriturasError, 
  fetchEscriturasSuccess,
  confirmEscrituraError,
  confirmEscrituraSuccess,
 } from './actions';
import { ESCRITURA_STATE } from 'containers/App/constants';

export function* sagaFetchEscrituras(action) {
  const requestURL = `${API_ROOT}/ventas/escrituras/?q=${action.projectId}`;
  try {
    const response = yield call(request, requestURL);
    yield put(fetchEscriturasSuccess(response));
  } catch (error) {
    yield put(fetchEscriturasError(error));
  }
}

function* sagaConfirmEscritura(action) {
  const requestURL = `${API_ROOT}/ventas/escritura-proyecto/${
    action.ProyectoID
  }/confirm_escritura/`;
  try {
    const response = yield call(
      request,
      requestURL,
      {
        method: 'PATCH',
        body: JSON.stringify({
          ProyectoID:action.ProyectoID,
          EscrituraProyectoState: ESCRITURA_STATE.Recep_Mun,
        }),
      }
    );

    yield put(confirmEscrituraSuccess(response));
  } catch (error) {
    yield put(confirmEscrituraError(error));
  }
}

export default function* escrituraSaga() {
  yield takeLatest(FETCH_ESCRITURAS, sagaFetchEscrituras);
  yield takeLatest(CONFIRM_ESCRITURA, sagaConfirmEscritura);
}

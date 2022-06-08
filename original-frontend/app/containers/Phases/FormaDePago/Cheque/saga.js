import { takeLatest, all, call, put } from 'redux-saga/effects';
import request from 'utils/request';
import FileSaver from 'file-saver';
import { API_ROOT } from 'containers/App/constants';
import moment from 'moment';
import { GENERATE_CHEQUE } from './constants';
import { generateChequeError, generateChequeSuccess } from './actions';

function* generateCheque(cheque) {
  const requestURL = `${API_ROOT}/ventas/generate-check/`;
  const response = yield call(request, requestURL, {
    method: 'POST',
    body: JSON.stringify(cheque),
  });
  FileSaver.saveAs(
    response,
    `cheque-${moment(cheque.Date).format('YYYY_MM_DD')}.pdf`,
  );
  return response;
}

function* sagaGenerateCheque(action) {
  try {
    const genCheques = [];
    for (let i = 0; i < action.cheques.length; i += 1) {
      genCheques.push(yield call(generateCheque, action.cheques[i]));
    }
    const files = yield all(genCheques);
    yield put(generateChequeSuccess(files));
  } catch (error) {
    yield put(generateChequeError(error));
  }
}

export default function* chequeSaga() {
  yield takeLatest(GENERATE_CHEQUE, sagaGenerateCheque);
}

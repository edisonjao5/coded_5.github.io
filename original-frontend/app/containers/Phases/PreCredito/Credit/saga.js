import { all, call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { API_ROOT } from 'containers/App/constants';
import { updateOffer } from 'containers/Offer/Form/actions';
import FileSaver from 'file-saver';
import { FETCH_IF, REGISTER_IF, REGISTER_SELECT_IF, DOWNLOAD_PRE_APPROBATION } from './constants';
import {
  fetchIFError,
  fetchIFSuccess,
  registerIFError,
  registerIFSuccess,
  registerSelectIFError,
  registerSelectIFSuccess,
} from './actions';

function* sagaFetchIF(action) {
  try {
    const response = yield call(
      request,
      `${API_ROOT}/ventas/ofertas-pre-aprobaciones/?q=${action.EntityID}`,
    );
    yield put(fetchIFSuccess(response));
  } catch (error) {
    yield put(fetchIFError(error));
  }
}

function* registerIFAc(values) {
  if (values.length < 1) return { InstitucionFinancieras: [] };
  // return yield call(
  //   request,
  //   `${API_ROOT}/ventas/ofertas-register-instituciones-financieras/`,
  //   {
  //     method: 'post',
  //     body: JSON.stringify(
  //       values.map(value => {
  //         delete value.DocumentCredit;
  //         delete value.DocumentPreApprobal;
  //         return value;
  //       }),
  //     ),
  //   },
  // );
  const requestURL = `${API_ROOT}/ventas/ofertas-register-instituciones-financieras/`;
  const requests = [];
  for (let i = 0; i < values.length; i += 1) {
    const data = new FormData();
    Object.keys(values[i]).forEach(name => {
      if(name !== 'DocumentCredit') data.append(name, values[i][name]);
    });
    requests.push(
      yield call(request, requestURL, {
        method: 'post',
        body: data,
        headers: {
          'content-type': null,
        },
      }),
    );
  }
  const responseComprador = yield all(requests);
  return {
    detail: responseComprador[0].detail,
    InstitucionFinancieras: responseComprador.map(
      item => item.InstitucionFinancieras,
    ),
  };
}

function* registerIFComprador(values) {
  if (values.length < 1) return { InstitucionFinancieras: [] };
  const requestURL = `${API_ROOT}/ventas/ofertas-register-instituciones-financieras/`;
  const requests = [];
  for (let i = 0; i < values.length; i += 1) {
    const data = new FormData();
    Object.keys(values[i]).forEach(name => {
      data.append(name, values[i][name]);
    });
    requests.push(
      yield call(request, requestURL, {
        method: 'post',
        body: data,
        headers: {
          'content-type': null,
        },
      }),
    );
  }
  const responseComprador = yield all(requests);
  return {
    detail: responseComprador[0].detail,
    InstitucionFinancieras: responseComprador.map(
      item => item.InstitucionFinancieras,
    ),
  };
}

function* sagaRegisterIF(action) {
  try {
    const responseAC = yield call(
      registerIFAc,
      action.values.filter(value => value.Type === 'ac'),
    );
    const responseComprador = yield call(
      registerIFComprador,
      action.values.filter(value => value.Type === 'comprador'),
    );
    yield put(
      registerIFSuccess({
        detail: responseAC.detail || responseComprador.detail,
        InstitucionFinancieras: [
          ...responseAC.InstitucionFinancieras,
          ...responseComprador.InstitucionFinancieras,
        ],
      }),
    );
  } catch (error) {
    yield put(registerIFError(error));
  }
}

function* sagaRegisterSelectIF(action) {
  try {
    const response = yield call(
      request,
      `${API_ROOT}/ventas/ofertas-register-result-pre-aprobaciones/${
        action.values.OfertaID
      }/`,
      {
        method: 'PATCH',
        body: JSON.stringify(action.values),
      },
    );

    yield put(registerSelectIFSuccess(response));
  } catch (error) {
    yield put(registerSelectIFError(error));
  }
}

function* sagaDownloadPreApprobation(action) {
  const requestURL = `${API_ROOT}/ventas/pre-approbation-download/`;
  try {
    const response = yield call(request, requestURL, {
      method: 'post',
      body: JSON.stringify({
        ReservaID: action.values.ReservaID,
        LetterSize: 80,
      }),
    });
    FileSaver.saveAs(response, `Pre approbation${action.values.ReservaID}.pdf`);
  } catch (error) {
    console.log(error)
  }
}

// Individual exports for testing
export default function* creditSaga() {
  yield takeLatest(FETCH_IF, sagaFetchIF);
  yield takeLatest(REGISTER_IF, sagaRegisterIF);
  yield takeLatest(REGISTER_SELECT_IF, sagaRegisterSelectIF);
  yield takeLatest(DOWNLOAD_PRE_APPROBATION, sagaDownloadPreApprobation);
}

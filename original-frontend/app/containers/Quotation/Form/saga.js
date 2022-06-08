import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { API_ROOT } from 'containers/App/constants';
import FileSaver from 'file-saver';
import { SAVE_QUOTATION, GET_QUOTATION, DOWNLOAD_QUOTATION } from './constants';
import {
  saveQuotationError,
  saveQuotationSuccess,
  getQuotationError,
  getQuotationSuccess,
  downloadQuotationSuccess,
  downloadQuotationError,
} from './actions';
import {
  resumeFacturaError,
  resumeFacturaSuccess,
} from '../../Phases/Factura/actions';

function* sagaGetQuotation(action) {
  const requestURL = `${API_ROOT}/ventas/cotizaciones/${action.CotizacionID}/`;
  try {
    const response = yield call(request, requestURL);
    yield put(getQuotationSuccess(response));
  } catch (error) {
    yield put(getQuotationError(error));
  }
}

function* sagaSaveQuotation(action) {
  const requestURL = action.values.CotizacionID
    ? `${API_ROOT}/ventas/cotizaciones/${action.values.CotizacionID}/`
    : `${API_ROOT}/ventas/cotizaciones/`;
  try {
    const response = yield call(request, requestURL, {
      method: action.values.CotizacionID ? 'PATCH' : 'POST',
      body: JSON.stringify({
        ...action.values,
        Cuotas: action.values.Cuotas.filter(cuota => cuota.Amount),
      }),
    });

    if(action.redirect === 'list')
      yield call(sagaDownloadQuotation, 
        {
          Cotizacion:{CotizacionID:response.cotizacion.CotizacionID},
          method:"open"
        }
      );

    yield put(saveQuotationSuccess(response));
  } catch (error) {
    yield put(saveQuotationError(error));
  }
}

function* sagaDownloadQuotation(action) {
  const requestURL = `${API_ROOT}/ventas/cotizaciones-download/`;
  try {
    const response = yield call(request, requestURL, {
      method: 'post',
      body: JSON.stringify({
        CotizacionID: action.Cotizacion.CotizacionID,
        LetterSize: 80,
      }),
    });

    if (action.method === "open"){
      var blobURL = URL.createObjectURL(response);
      window.open(blobURL);
    }
    else
      FileSaver.saveAs(response, `Cotizacion_${action.Cotizacion.Folio}.pdf`);

    yield put(downloadQuotationSuccess(response));
  } catch (error) {
    yield put(downloadQuotationError(error));
  }
}

export default function* quotationformSaga() {
  yield takeLatest(SAVE_QUOTATION, sagaSaveQuotation);
  yield takeLatest(GET_QUOTATION, sagaGetQuotation);
  yield takeLatest(DOWNLOAD_QUOTATION, sagaDownloadQuotation);
}

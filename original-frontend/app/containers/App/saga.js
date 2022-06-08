import { takeLatest, call, put, all } from 'redux-saga/effects';
import request from 'utils/request';
import { API_ROOT, FETCH_PRELOAD_DATA } from 'containers/App/constants';
import { fetchPreloadDataError, fetchPreloadDataSuccess } from './actions';

/* Comunas, Provincias y Regiones */
export function* fetchLocal() {
  const [comunas, provincias, regiones] = yield all([
    call(request, `${API_ROOT}/comunas/`),
    call(request, `${API_ROOT}/provincias/`),
    call(request, `${API_ROOT}/regiones/`),
  ]);
  const matchedComunas = [];

  let remainProvincias = [...provincias];
  let remainComunas = [...comunas];
  const local = regiones.map(regione => {
    const reg = { ...regione };
    // match provincias to regione
    reg.provincias = remainProvincias
      .filter(provincia => provincia.RegionID === regione.RegionID)
      .map(provincia => {
        const pro = { ...provincia };
        // match comunas to provincia
        pro.comunas = remainComunas
          .filter(comuna => comuna.ProvinciaID === provincia.ProvinciaID)
          .map(comuna => {
            const formatComuna = {
              ...comuna,
              Provincia: provincia.Name,
              Regione: regione.Name,
            };

            matchedComunas.push(formatComuna);
            return formatComuna;
          });
        // unmatched comunas
        remainComunas = remainComunas.filter(
          comuna => comuna.ProvinciaID !== provincia.ProvinciaID,
        );
        return pro;
      });
    // unmatched provincias
    remainProvincias = remainProvincias.filter(
      provincia => provincia.RegionID !== regione.RegionID,
    );

    return reg;
  });
  return { local, comunas: matchedComunas };
}

export function* fetchContactTypes() {
  return yield call(request, `${API_ROOT}/contact-info-types/`);
}

export function* fetchClientUtils() {
  return yield call(request, `${API_ROOT}/ventas/utils-clientes/`);
}

export function* fetchQuotationUtils() {
  return yield call(request, `${API_ROOT}/ventas/utils-cotizaciones/`);
}

export function* fetchPaymentUtils() {
  return yield all([
    call(request, `${API_ROOT}/ventas/utils-payment/`),
    call(request, `${API_ROOT}/uf/`),
    call(request, `${API_ROOT}/constants-numerics/?q=Tasa`),
  ]);
}

/* Usuarios, Roles y Permisos */

/* Inmobiliarias */
export function* fetchRealEstate() {
  return yield all([
    call(request, `${API_ROOT}/inmobiliarias/`),
    call(request, `${API_ROOT}/constructoras/`),
    call(request, `${API_ROOT}/inmobiliarias-users-types/`),
  ]);
}

/* Aseguradoras y Bancos */
export function* fetchInsurancesAndBanks() {
  return yield call(request, `${API_ROOT}/empresas-proyectos/instituciones-financieras/`);
  // return yield all([
  //   call(request, `${API_ROOT}/empresas-proyectos/aseguradoras/`),
  //   call(request, `${API_ROOT}/empresas-proyectos/instituciones-financieras/`),
  // ]);
}

export function* fetchProjectPreloadData() {
  return yield all([
    /* users-types */
    call(request, `${API_ROOT}/empresas-proyectos/proyectos-users-types/`),
    call(request, `${API_ROOT}/inmobiliarias-users-types/`),

    /* Tipologias y Tipos de Inmuebles */
    // call(request, `${API_ROOT}/empresas-proyectos/inmuebles-types/`),
    // call(request, `${API_ROOT}/empresas-proyectos/inmuebles-tipologias/`),
    /* Tipos de Bitácoras de un proyecto */
    // call(request, `${API_ROOT}/empresas-proyectos/proyectos-logs-types/`),
  ]);
}

export function* fetchInmueblePreloadData() {
  return yield all([
    call(request, `${API_ROOT}/empresas-proyectos/inmuebles-types/`),
    call(request, `${API_ROOT}/empresas-proyectos/inmuebles-tipologias/`),
    call(request, `${API_ROOT}/empresas-proyectos/inmuebles-orientations/`),
    call(request, `${API_ROOT}/empresas-proyectos/inmuebles-states/`),
    call(
      request,
      `${API_ROOT}/empresas-proyectos/inmuebles-restriction-types/`,
    ),
  ]);
}

export function* sagaFetchPreloadData() {
  try {
    const [
      { local, comunas },
      contactTypes,
      [userProjectTypes, userInmobiliariaTypes],
      clientUtils,
      quotationUtils,
      [paymentUtils, uf, tasa],
      [
        inmueblesTypes,
        inmueblesTipologias,
        inmueblesOrientations,
        inmueblesStates,
        inmueblesRestrictionTypes,
      ],
      institucionFinanciera,
    ] = yield all([
      call(fetchLocal),
      call(fetchContactTypes),
      call(fetchProjectPreloadData),
      call(fetchClientUtils),
      call(fetchQuotationUtils),
      call(fetchPaymentUtils),
      call(fetchInmueblePreloadData),
      call(fetchInsurancesAndBanks),
    ]);
    yield put(
      fetchPreloadDataSuccess({
        local,
        comunas,
        contactTypes,
        clientUtils,
        quotationUtils,
        paymentUtils,
        uf,
        tasa,
        userProjectTypes,
        userInmobiliariaTypes,
        inmueblesTypes,
        inmueblesTipologias,
        inmueblesOrientations,
        inmueblesStates,
        inmueblesRestrictionTypes,
        institucionFinanciera,
      }),
    );
  } catch (error) {
    yield put(fetchPreloadDataError(error));
  }
}

// Individual exports for testing
export default function* initialDataSaga() {
  yield takeLatest(FETCH_PRELOAD_DATA, sagaFetchPreloadData);
}

import { all, select, call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { API_ROOT } from 'containers/App/constants';
import { FETCH_ENTITIES, SAVE_ENTITY } from './constants';
import {
  fetchEntitiesError,
  fetchEntitiesSuccess,
  saveEntityError,
  saveEntitySuccess,
} from './actions';
import makeSelectRealEstate from './selectors';

function* fetchEntities() {
  return yield all([
    call(request, `${API_ROOT}/constructoras/`),
    call(request, `${API_ROOT}/inmobiliarias/`),
  ]);
}

function* sagaFetchEntities() {
  try {
    const [constructoras, inmobiliarias] = yield call(fetchEntities);
    yield put(fetchEntitiesSuccess({ constructoras, inmobiliarias }));
  } catch (error) {
    yield put(fetchEntitiesError(error));
  }
}

function* saveEntity(action) {
  const selector = yield select(makeSelectRealEstate());
  const { type } = selector.query;
  const IdName = type === 'constructora' ? 'ConstructoraID' : 'InmobiliariaID';
  const apiName = type === 'constructora' ? 'constructoras' : 'inmobiliarias';
  const oldEntity = selector.entity || {};
  const newEntity = { ...oldEntity, ...action.values };
  const { RazonSocial } = newEntity;

  if (oldEntity.RazonSocial === newEntity.RazonSocial)
    delete newEntity.RazonSocial;
  if (oldEntity.Rut === newEntity.Rut) delete newEntity.Rut;

  if (!newEntity.IsInmobiliaria) {
    delete newEntity.ComunaID;
    delete newEntity.Contact;
    delete newEntity.Direccion;
    delete newEntity.Rut;
    delete newEntity.UsersInmobiliaria;
  }

  const requestURL = !newEntity[IdName]
    ? `${API_ROOT}/${apiName}/`
    : `${API_ROOT}/${apiName}/${newEntity[IdName]}/`;
  try {
    const response = yield call(request, requestURL, {
      method: !newEntity[IdName] ? 'POST' : 'PATCH',
      body: JSON.stringify(newEntity),
    });
    // recall list
    const [constructoras, inmobiliarias] = yield call(fetchEntities);
    const constructora =
      constructoras.find(item => item.RazonSocial === RazonSocial) || {};
    const inmobiliaria =
      inmobiliarias.find(item => item.RazonSocial === RazonSocial) || {};
    const entity =
      type === 'constructora'
        ? { ...inmobiliaria, ...constructora }
        : { ...constructora, ...inmobiliaria };
    yield put(
      saveEntitySuccess({
        detail: response.detail,
        entity,
        constructoras,
        inmobiliarias,
      }),
    );
  } catch (error) {
    yield put(saveEntityError(error));
  }
}

export default function* inmobiliariaSaga() {
  yield takeLatest(FETCH_ENTITIES, sagaFetchEntities);
  yield takeLatest(SAVE_ENTITY, saveEntity);
}

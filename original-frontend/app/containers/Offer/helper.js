import React from 'react';
import {
  APROBACION_INMOBILIARIA_STATE,
  OFERTA_STATE,
  PRE_APROBACION_CREDITO_STATE,
  RECEPCION_GARANTIA_STATE,
  PERMISSIONS,
  API_ROOT,
} from 'containers/App/constants';
import { UserProject } from 'containers/Project/helper';
import { Auth } from 'containers/App/helpers';
import { isValidLabor } from 'containers/Phases/PreCredito/helper';
import { calculates, isCreditType } from 'containers/Phases/FormaDePago/helper';
import { isValidClient } from 'containers/Phases/Client/helper';

export const initReports = () =>
  OFERTA_STATE.reduce(
    (acc, state) => {
      // exclude Promesa
      if (state !== OFERTA_STATE[3]) acc[state] = { Label: state, Count: 0 };
      return acc;
    },
    {
      All: { Label: 'Todas', Count: 0 },
      'Pendiente Contacto': { Label: 'Todas', Count: 0 },
    },
  );

export const getReports = (entities = []) =>
  entities.reduce((acc, item) => {
    acc.All.Count += 1;
    let key = item.OfertaState;
    if (
      item.OfertaState === OFERTA_STATE[0] &&
      item.AprobacionInmobiliariaState === APROBACION_INMOBILIARIA_STATE[0]
    )
      key = 'Pendiente Contacto';

    acc[key] = acc[key] || {
      Label: item.OfertaStateFormat[0].Label,
      Count: 0,
    };
    acc[key].Label = item.OfertaStateFormat[0].Label;
    acc[key].Count += 1;
    return acc;
  }, initReports());

export const formatOffer = offer => {
  const OfertaStateFormat = [
    {
      Label: offer.OfertaState,
      Color: '',
    },
  ];

  switch (offer.OfertaState) {
    case OFERTA_STATE[0]:
      if (isPendienteContacto(offer)) {
        OfertaStateFormat[0] = {
          Label: 'Pendiente Contacto',
          Color: 'badge-warning',
        };
      } else {
        OfertaStateFormat[0].Color = 'badge-caution';
        OfertaStateFormat.push({
          Label: 'IN',
          Color: isAprobacionInmobiliariaState(offer)
            ? 'badge-success'
            : offer.AprobacionInmobiliariaState ===
              APROBACION_INMOBILIARIA_STATE[3]
              ? 'badge-danger'
              : 'badge-warning',
        });
        OfertaStateFormat.push({
          Label: 'FI',
          Color:
            offer.RecepcionGarantiaState === RECEPCION_GARANTIA_STATE[1]
              ? 'badge-success'
              : 'badge-warning',
        });

        if (isCreditType(offer.PayType))
          OfertaStateFormat.push({
            Label: 'AC',
            Color:
              offer.PreAprobacionCreditoState ===
              PRE_APROBACION_CREDITO_STATE[2]
                ? 'badge-success'
                : offer.PreAprobacionCreditoState ===
                  PRE_APROBACION_CREDITO_STATE[3]
                  ? 'badge-danger'
                  : 'badge-warning',
          });
      }
      break;
    case 'Pendiente control':
    case OFERTA_STATE[1]: //'Pendiente legal'
      OfertaStateFormat[0].Color = 'badge-caution';
      break;
    case OFERTA_STATE[2]: //'Rechazada por legal'
      OfertaStateFormat[0].Color = 'badge-danger';
      if (offer.AprobacionInmobiliariaState === 'Rechazada')
        OfertaStateFormat[0].Label = 'Rechazada IN';
      break;
    case OFERTA_STATE[3]: //Promesa
        OfertaStateFormat[0].Color = 'badge-info';
        break;
    case OFERTA_STATE[4]: //'Cancelada'
      OfertaStateFormat[0].Color = 'badge-warning';
      OfertaStateFormat[0].Label = 'Cancelada JP';
      break;
    case OFERTA_STATE[5]: //'Modificado'
      OfertaStateFormat[0].Color = 'badge-caution';
      break;
    case OFERTA_STATE[6]: //'Desistimiento'
      OfertaStateFormat[0].Color = 'badge-danger';
      OfertaStateFormat[0].Label = 'Desistimiento';
      break;
    default:
      OfertaStateFormat[0].Color = 'badge-caution';
      break;
  }
  return {
    ...offer,
    OfertaStateFormat,
  };
};

export const isPendienteContacto = offer =>
  [OFERTA_STATE[0], OFERTA_STATE[2]].includes(offer.OfertaState) &&
  offer.AprobacionInmobiliariaState === APROBACION_INMOBILIARIA_STATE[0];

export const isPendienteAprobacion = offer =>
  offer.AprobacionInmobiliariaState !== APROBACION_INMOBILIARIA_STATE[2] ||
  offer.RecepcionGarantiaState !== PRE_APROBACION_CREDITO_STATE[2];

export const isWaitAprobacionInmobiliariaState = offer =>
  offer.AprobacionInmobiliariaState === APROBACION_INMOBILIARIA_STATE[1];

export const isAprobacionInmobiliariaState = offer =>
  offer.AprobacionInmobiliariaState === APROBACION_INMOBILIARIA_STATE[2];

export const isRejectAprobacionInmobiliariaState = offer =>
  offer.AprobacionInmobiliariaState === APROBACION_INMOBILIARIA_STATE[3];

export const isModified = offer => offer.OfertaState === OFERTA_STATE[5];

export const canConfirmOffer = offer =>
  isPendienteContacto(offer) &&
  UserProject.in(window.project) &&
  UserProject.isPM(window.project);

export const getActionTitle = (offer = {}) => {
  const { Graph } = offer;
  if (offer.OfertaState === OFERTA_STATE[4])
    return <span className="color-warning">Cancelar Oferta</span>;

  if (offer.AprobacionInmobiliariaState === APROBACION_INMOBILIARIA_STATE[3])
    return <span class="font-16-rem line-height-1 color-success">Rechazada</span>;

  if (offer.OfertaState === OFERTA_STATE[2])
    return <span className="color-warning">Rechazada por legal</span>;
  
  if (offer.OfertaState === OFERTA_STATE[6])
    return <span className="color-warning">Oferta Desistida</span>;

  if (Auth.isInmobiliario())
    return <span className="color-caution-03">Confirmar Oferta</span>;

  if (canConfirmOffer(offer))
    return <span className="color-warning-magent">Confirmar Oferta</span>;

  if (isPendienteContacto(offer)) return <span>Pendiente Contacto</span>;

  if (Graph) {
    if (Graph.Node) {
      const node = Graph.Node.find(
        item =>
          item.Color === 'red' ||
          item.Color === 'white' ||
          item.Color === 'orange',
      );
      if (node) {
        switch (node.Description.trim()) {
          case 'Pendiente legal':
            return 'Pendiente Aprueba Confeccion Promesa';
          default:
            return node.Description.trim();
        }
      }
      return 'Oferta';
    }
  }
  return 'Oferta';
};

export const canApproveConfeccionPromesa = (offer = {}) =>
  UserProject.in() &&
  Auth.hasPermission(PERMISSIONS[21]) &&
  offer.OfertaState === OFERTA_STATE[1];

export const canEditOffer = offer =>
  !window.project
    ? false
    : !!(
      UserProject.in(window.project) &&
        (Auth.hasOneOfPermissions(['Es vendedor']) ||
         Auth.hasOneOfPermissions(['Es asistente comercial']) ||
         Auth.isPM() ) &&
        offer.OfertaState !== OFERTA_STATE[3] &&
        offer.OfertaState !== OFERTA_STATE[4]
    );

export const canApproveModifyOffer = offer =>
  !window.project ? false : UserProject.isPM() && isModified(offer);

export const isValidData = offer => {
  const { moneyErr } = calculates(offer);
  
  return isValidClient(offer) && !moneyErr && isValidLabor(offer, offer.PayType);
};

export const doQuery = (entities, query = {}) => {
  if (!entities) return [];
  let queriedEntities = [...entities];
  /* sort */
  const { sort } = query;
  if (sort) {
    queriedEntities = queriedEntities.sort((a, b) => {
      let aa = a[sort.by];
      let bb = b[sort.by];
      if (sort.by === 'Cliente') {
        aa = `${aa.Name} ${aa.LastNames} ${aa.Rut}`;
        bb = `${bb.Name} ${bb.LastNames} ${bb.Rut}`;
      }
      if (aa.toLowerCase() > bb.toLowerCase()) return sort.asc ? 1 : -1;
      if (aa.toLowerCase() < bb.toLowerCase()) return sort.asc ? -1 : 1;
      return 0;
    });
  }

  return queriedEntities;
};

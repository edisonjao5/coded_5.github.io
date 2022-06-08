/* eslint-disable array-callback-return */
import React from 'react';
import {
  RESERVA_STATE,
  APROBACION_INMOBILIARIA_STATE,
} from 'containers/App/constants';
import { Auth } from 'containers/App/helpers';
import { UserProject } from '../../Project/helper';

export const canReviewOffer = offer =>
  !window.project
    ? false
    : UserProject.in(window.project) &&
      Auth.hasOneOfPermissions(['Es asistente comercial']) &&
      offer.OfertaState === RESERVA_STATE[1];

export const canUploadOffer = offer =>
  !window.project
    ? false
    : UserProject.in(window.project) &&
      Auth.hasOneOfPermissions(['Es vendedor']) &&
      (!offer.OfertaState ||
        [RESERVA_STATE[0], RESERVA_STATE[3]].includes(offer.OfertaState));

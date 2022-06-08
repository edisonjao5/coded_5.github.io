/* eslint-disable array-callback-return */
import React from 'react';
import { RESERVA_STATE } from 'containers/App/constants';
import { Auth } from 'containers/App/helpers';
import { UserProject } from 'containers/Project/helper';
import { isValidClient } from 'containers/Phases/Client/helper';
import { calculates } from 'containers/Phases/FormaDePago/helper';
import { isValidLabor } from 'containers/Phases/PreCredito/helper';

export const currentResevationStep = (reservation = {}) => {
  const { ReservaID, ReservaState } = reservation;

  // 1. create new (general)
  if (!ReservaID) return 1;

  // 2. Have reserva but dont send to control
  if (ReservaID && ReservaState === RESERVA_STATE[0]) return 2;

  // 3. Reserva send to control
  if (ReservaID && ReservaState === RESERVA_STATE[1]) return 3;

  // 4. Reserva cancel
  if (ReservaID && ReservaState === RESERVA_STATE[4]) return 4;

  // 5. Reserva oferta
  if (ReservaID && ReservaState === RESERVA_STATE[2]) return 5;

  // 5. Reserva rechazada
  if (ReservaID && ReservaState === RESERVA_STATE[3]) return 6;

  return 1;
};

export const isValidData = reservation => {
  const { moneyErr } = calculates(reservation);
  const isValid = isValidClient(reservation) && !moneyErr;
  if(reservation.ReservaState){
    return isValid && isValidLabor(reservation, reservation.PayType);
  }
  return isValid;
};

export const canReviewReservation = reservation => 
  !window.project
    ? false
    : UserProject.in(window.project) &&
      Auth.isAC() &&
      [RESERVA_STATE[1], RESERVA_STATE[5]].includes(reservation.ReservaState);

export const canApproveModification = reservation => 
  !window.project
    ? false
    : UserProject.in(window.project) &&
      Auth.isPM() &&
      reservation.ReservaState == RESERVA_STATE[6];

export const canUploadReservation = reservation =>
  !window.project
    ? false
    : UserProject.in(window.project) &&
      Auth.hasOneOfPermissions(['Es vendedor']) &&
      (!reservation.ReservaState ||
        [RESERVA_STATE[0], RESERVA_STATE[3]].includes(
          reservation.ReservaState,
        ));

export const canEditReservation = reservation =>
  !window.project
    ? false
    : UserProject.in(window.project) &&
      Auth.hasOneOfPermissions(['Es vendedor']) &&
      (!reservation.ReservaID ||
        [RESERVA_STATE[0]].includes(reservation.ReservaState));

export const canConfirmReservation = reservation =>
  !window.project
    ? false
    : UserProject.in(window.project) &&
      Auth.hasOneOfPermissions(['Es vendedor']) &&
      !reservation.ReservaID;

export const getActionTitle = (reservation = {}) => {
  const { Graph } = reservation;
  if (reservation.ReservaState === RESERVA_STATE[3])
    return <span className="color-warning-magent">Confirmar </span>;
  if (Graph) {
    if (Graph.Node) {
      const node = Graph.Node.find(item => item.Color === 'red');
      if (node)
        return node.Description.trim() === 'Pendiente información/Rechazada'
          ? 'Pendiente información'
          : node.Description;
      return reservation.ReservaState;
    }
  }
  return 'Crear reserva';
};

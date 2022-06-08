/* eslint-disable jsx-a11y/anchor-has-content */
/**
 *
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { push } from 'connected-react-router';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from 'reactstrap';
import {
  inmuebleWithRestrictions,
  matchRestrictionsFromAList,
} from 'containers/Common/Inmueble/helper';
import moment from 'components/moment';
import { canEditReservation } from '../Form/helper';

const Item = ({ project, reservation, dispatch }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const {
    Proyecto,
    Folio,
    Inmuebles,
    ReservaState,
    ReservaStateColor,
    ReservaStateLabel,
    Date,
    OfertaID
  } = reservation;

  const tmpInmuebles = matchRestrictionsFromAList(Inmuebles);
  let dateAgo;
  if (!OfertaID && ReservaState === 'Pendiente control') {
    dateAgo = moment.utc(Date).fromNow();
  }

  return (
    <tr className="font-14 align-middle-group">
      <td className="px-3 main_color">
        <Link
          to={`/proyectos/${project.ProyectoID}/reserva?ReservaID=${
            reservation.ReservaID
          }`}
        >
          <b>{`${Proyecto} / ${Folio}`}</b>
        </Link>
      </td>
      <td className="px-3">
        {tmpInmuebles.map(Inmueble => (
          <div className="d-block" key={Inmueble.InmuebleID}>
            {inmuebleWithRestrictions(Inmueble)}
          </div>
        ))}
      </td>
      <td className="">
        Cliente: {reservation.ClienteName} {reservation.ClienteLastNames} /{' '}
        {reservation.ClienteRut}
      </td>
      <td>{Date}</td>
      <td className="px-3">
        <div className="badge-group d-flex justify-content-end align-items-center rounded overflow-hidden">
          {dateAgo && (
            <span className="badge px-2 badge-danger icon icon-alert mr-2">
              <span>{dateAgo.toUpperCase()}</span>
            </span>
          )}
          <span className={`badge p-1 ${ReservaStateColor}`}>
            {ReservaStateLabel.toUpperCase()}
          </span>
        </div>
      </td>
      <td className="font-21 px-3">
        <Dropdown
          isOpen={dropdownOpen}
          toggle={() => setDropdownOpen(!dropdownOpen)}
        >
          <DropdownToggle tag="a" className="icon icon-dots main_color ml-1" />
          <DropdownMenu right positionFixed>
            { !OfertaID &&
              <DropdownItem
                tag="a"
                onClick={() => {
                  dispatch(
                    push(`/proyectos/${project.ProyectoID}/reserva?ReservaID=${reservation.ReservaID}`),
                  );
                }}
              >
                Ver datos
              </DropdownItem>
            }
            { OfertaID && (
              <DropdownItem
                tag="a"
                onClick={() => {
                  dispatch(
                    push(`/proyectos/${project.ProyectoID}/oferta?OfertaID=${OfertaID}`,),
                  );
                }}
              >
                Detalle Oferta
              </DropdownItem>)
            }
            {canEditReservation(reservation) && (
              <DropdownItem
                tag="a"
                onClick={() =>
                  dispatch(
                    push(
                      `/proyectos/${
                        project.ProyectoID
                      }/reserva/edit?ReservaID=${reservation.ReservaID}`,
                    ),
                  )
                }
              >
                Editar
              </DropdownItem>
            )}
          </DropdownMenu>
        </Dropdown>
      </td>
    </tr>
  );
};

Item.propTypes = {
  reservation: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  project: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  dispatch: PropTypes.func,
};
export default Item;

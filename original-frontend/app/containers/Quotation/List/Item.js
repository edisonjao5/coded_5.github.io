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
import { inmuebleWithRestrictions } from 'containers/Common/Inmueble/helper';
import moment from '../../../components/moment';


const date = moment().format('YYYY-MM-DD');
const Item = ({ quotation, reservation, dispatch, value }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const {
    CotizacionID,
    ProyectoID,
    Proyecto,
    Folio,
    Cliente = {},
    Inmuebles = [],
    CotizacionState,
    Date,
  } = quotation;


  let ColorBadge = 'badge-secondary';
  switch (CotizacionState) {
    case 'Reserva':
      ColorBadge = 'badge-success';
      break;
    case 'Vigente':
      ColorBadge = 'badge-danger';
      break;
    case "Vencida":
      ColorBadge = 'badge-warning';
      break;
    default:
      ColorBadge = 'badge-caution';
  }

  return (
    <tr className="font-14 align-middle-group">
      <td className="px-3 main_color">
        <Link to={`/proyectos/${ProyectoID}/cotizacion/${CotizacionID}`}>
          <b>{`${Proyecto} / ${Folio}`}</b>
        </Link>
      </td>
      <td className="px-3">
        {Inmuebles.map(Inmueble => (
          <div className="d-block" key={Inmueble.InmuebleID}>
            {inmuebleWithRestrictions(Inmueble)}
          </div>
        ))}
      </td>
      <td className="">
        Cliente: {Cliente.Name} {Cliente.LastNames} / {Cliente.Rut}
      </td>
      <td>{Date}</td>
      <td className="px-3">
        <div className="badge-group d-flex justify-content-end align-items-center rounded overflow-hidden">
          <span className={`badge ${ColorBadge} p-1`}>{CotizacionState}</span>
          {/* {Date >= date ? (
          <span className={`badge ${ColorBadge} p-1`}>{CotizacionState && ('Vigente')}</span>
          ) : (<span className={`badge ${ColorBadge = 'badge-warning'} p-2`}>{CotizacionState && ('Vencida')}</span>)} */}
        </div>
      </td>
      <td className="px-3 text-right">
        {(CotizacionState !== 'Reserva' && CotizacionState !== "Vencida") && (
          <Link
          to={`/proyectos/${ProyectoID}/reserva/crear?CotizacionID=${CotizacionID}`}
          className="m-btn font-14 d-inline-block"
          >
            Reserva
          </Link>
        )}
      </td>
      <td className="font-21 px-3">
        <Dropdown
          isOpen={dropdownOpen}
          toggle={() => setDropdownOpen(!dropdownOpen)}
          >
          <DropdownToggle tag="a" className="icon icon-dots main_color ml-1" />
          <DropdownMenu right positionFixed>
            <DropdownItem
              tag="a"
              onClick={() => {
                dispatch(
                  push(`/proyectos/${ProyectoID}/cotizacion/${CotizacionID}`),
                  );
                }}
                >
              Ver datos
            </DropdownItem>
            {reservation && (
              <DropdownItem
              tag="a"
              onClick={() => {
                dispatch(
                  push(
                    `/proyectos/${project.ProyectoID}/reserva?ReservaID=${
                      reservation.ReservaID
                    }`,
                    ),
                  );
                }}
                >
                Detalle Reserva
              </DropdownItem>
            )}
          </DropdownMenu>
        </Dropdown>
      </td>
    </tr>
  );
};

Item.propTypes = {
  quotation: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  dispatch: PropTypes.func,
};
export default Item;

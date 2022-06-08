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
import { clientFullname } from 'containers/Common/Client/helper';
import { APROBACION_INMOBILIARIA_STATE } from 'containers/App/constants';
import { Auth } from 'containers/App/helpers';

const InItem = ({ project, numberIN, offer, dispatch }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { Proyecto, Folio, Inmuebles, Cliente, Condition = [] } = offer;
  const tmpInmuebles = matchRestrictionsFromAList(Inmuebles);
  const firmaIN = () => {
    let firm = 0;
    if (offer.AprobacionInmobiliaria["Autorizador"]){
      for (var key in offer.AprobacionInmobiliaria["Autorizador"]) {
        if (offer.AprobacionInmobiliaria["Autorizador"][key] == true) firm += 1
      }
    }
    if (offer.AprobacionInmobiliaria["Aprobador"]){
      for (var key in offer.AprobacionInmobiliaria["Aprobador"]) {
        if (offer.AprobacionInmobiliaria["Aprobador"][key] == true) firm += 1
      }
    }
    return firm;
  }

  let State = '';
  if (offer.AprobacionInmobiliariaState === APROBACION_INMOBILIARIA_STATE[3]) {
    State = <span className="badge px-2 badge-danger">Oferta Rechazada</span>; //RECHAZADA
  } else if (offer.AprobacionInmobiliariaState === APROBACION_INMOBILIARIA_STATE[2]) {
    State = <span className="badge px-2 badge-success">Oferta Aprobada</span>; //CONTROL APROBADO
  } else {
    State = (
      <span className="badge px-2 badge-warning">
        {Condition.length > 0 && 'CONTROL APROBADO CON OBS.'}
        {Condition.length < 1 && 'Pendiente Aprobacion'}
      </span>
    );
  }
  return (
    <tr className="font-14 align-middle-group">
      <td className="px-3 main_color">
        <Link
          to={`/proyectos/${project.ProyectoID}/oferta?OfertaID=${
            offer.OfertaID
          }`}
        >
          <b>{`${Proyecto} / ${Folio}`}</b>
        </Link>
      </td>
      <td>
        {tmpInmuebles.map(Inmueble => (
          <div className="d-block" key={Inmueble.InmuebleID}>
            {inmuebleWithRestrictions(Inmueble)}
          </div>
        ))}
      </td>
      <td>Cliente: {clientFullname(Cliente)}</td>
      <td>
        <div className="badge-group d-flex justify-content-end align-items-center rounded overflow-hidden">
          {State}
        </div>
      </td>
      <td className="no-whitespace">
        <span>
          <b>FIRMAS</b> | {`${firmaIN()} de ${numberIN}`}
        </span>
      </td>
      <td className="px-3 font-21">
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
                  push(
                    `/proyectos/${project.ProyectoID}/oferta?OfertaID=${
                      offer.OfertaID
                    }`,
                  ),
                );
              }}
            >
              Ver datos
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </td>
    </tr>
  );
};

InItem.propTypes = {
  numberIN: PropTypes.number,
  offer: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  project: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  dispatch: PropTypes.func,
};
export default InItem;

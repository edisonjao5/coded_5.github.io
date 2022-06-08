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
import {
  OFERTA_STATE,
  APROBACION_INMOBILIARIA_STATE,
  RECEPCION_GARANTIA_STATE,
} from 'containers/App/constants';
import { isCreditType } from 'containers/Phases/FormaDePago/helper';
import moment from 'components/moment';

// import Button from 'components/Button';
import { canEditOffer } from '../helper';

const Item = ({ project, offer, dispatch }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const {
    Proyecto,
    Folio,
    Inmuebles,
    PromesaID = '',
    OfertaStateFormat = [],
    Cliente,
    Date,
    AprobacionInmobiliariaState,
    RecepcionGarantiaState,
    PayType,
    OfertaState,
  } = offer;
  const tmpInmuebles = matchRestrictionsFromAList(Inmuebles);

  let responsible = '';
  let State = OfertaStateFormat.map((state, index) => (
    <span
      key={String(index)}
      className={`badge px-2 ${state.Color} ${index > 0 ? 'rounded-0' : ''} ${
        index === 0 && OfertaStateFormat.length > 1
          ? 'rounded-left rounded-0'
          : ''
      }`}
    >
      {state.Label.toUpperCase()}
    </span>
  ));

  switch (AprobacionInmobiliariaState) {
    case APROBACION_INMOBILIARIA_STATE[0]:
      responsible = 'JP';
      break;
    case APROBACION_INMOBILIARIA_STATE[1]:
      responsible = 'IN';
      break;
    case APROBACION_INMOBILIARIA_STATE[2]:
      if (RecepcionGarantiaState === RECEPCION_GARANTIA_STATE[0])
        responsible = 'FI';
      else if (isCreditType(PayType) && OfertaState === OFERTA_STATE[0])
        responsible = 'AC';
      else if (OfertaState === OFERTA_STATE[1]) responsible = 'LG';
      else responsible = '';
      break;
    case APROBACION_INMOBILIARIA_STATE[3]:
      responsible = '';
      State = <span className="badge px-2 badge-danger">RECHAZADA</span>;
      break;
    default:
      responsible = '';
  }

  return (
    <tr className="font-14 align-middle-group">
      <td className="px-3 main_color">
        {!PromesaID && (
          <Link
            to={`/proyectos/${project.ProyectoID}/oferta?OfertaID=${
              offer.OfertaID
            }`}
          >
            <b>{`${Proyecto} / ${Folio}`}</b>
          </Link>
        )}
        {PromesaID && (
          <Link
            to={`/proyectos/${
              project.ProyectoID
            }/promesa?PromesaID=${PromesaID}`}
          >
            <b>{`${Proyecto} / ${Folio}`}</b>
          </Link>
        )}
      </td>
      <td className="px-3">
        {tmpInmuebles.map(Inmueble => (
          <div className="d-block" key={Inmueble.InmuebleID}>
            {inmuebleWithRestrictions(Inmueble)}
          </div>
        ))}
      </td>
      <td className="">Cliente: {clientFullname(Cliente)}</td>
      <td>{moment(Date).format('YYYY-MM-DD hh:mm')}</td>
      <td className="px-3">{responsible}</td>
      <td className="px-3">
        <div className="badge-group d-flex justify-content-end align-items-center rounded overflow-hidden">
          {State}
        </div>
      </td>
      <td className="font-21 px-3">
        <Dropdown
          isOpen={dropdownOpen}
          toggle={() => setDropdownOpen(!dropdownOpen)}
        >
          <DropdownToggle tag="a" className="icon icon-dots main_color ml-1" />
          <DropdownMenu right positionFixed>
            {!PromesaID && (
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
            )}
            {PromesaID && (
              <DropdownItem
                tag="a"
                onClick={() => {
                  dispatch(
                    push(
                      `/proyectos/${
                        project.ProyectoID
                      }/promesa?PromesaID=${PromesaID}`,
                    ),
                  );
                }}
              >
                Ver datos
              </DropdownItem>
            )}
            {!PromesaID && canEditOffer(offer) && (
              <DropdownItem
                tag="a"
                onClick={() =>
                  dispatch(
                    push(
                      `/proyectos/${
                        project.ProyectoID
                      }/oferta/editar?OfertaID=${offer.OfertaID}`,
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
  offer: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  project: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  dispatch: PropTypes.func,
};
export default Item;

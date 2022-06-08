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
import RefundGrantiaButton from 'containers/Phases/Promesa/RefundGarantia/Buttons';
import { UserProject, countIN } from 'containers/Project/helper';
import FacturaButton from 'containers/Phases/Factura/Buttons';
import { canEditPromesa, canRefund, isRefund } from '../helper';
import { PROMESA_STATE } from 'containers/App/constants';

const Item = ({ project, promesa, dispatch }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { Proyecto, Folio, PromesaState, Inmuebles, Cliente, Date } = promesa;

  const tmpInmuebles = matchRestrictionsFromAList(Inmuebles);
  let ColorBadge = 'badge-caution';
  switch (PromesaState) {
    case 'Reserva':
      ColorBadge = 'badge-success';
      break;
    case 'Vigente':
      ColorBadge = 'badge-danger';
      break;
    default:
      ColorBadge = 'badge-caution';
      break;
  }

  const index = PROMESA_STATE.findIndex(state => PromesaState===state);  
  const backColor = index==-1 ? "": `rgb(255,${255-50*index},${20*index})`;
  const color = index > 3 ? "white" : "#6a7175";

  return (
    <tr className="font-14 align-middle-group">
      <td className="px-3 main_color">
        <Link
          to={`/proyectos/${project.ProyectoID}/promesa?PromesaID=${
            promesa.PromesaID
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
      <td>Cliente: {clientFullname(Cliente)}</td>
      <td>{Date}</td>
      <td>
        <div className="badge-group d-flex justify-content-end align-items-center rounded overflow-hidden">
          <span className={`badge ${ColorBadge} px-2`} style={{backgroundColor:backColor,color: color}}>{PromesaState}</span>
        </div>
      </td>
      <td>
        {UserProject.isFinanza() && promesa.Factura && (
          <div className="justify-content-end d-flex align-items-center ">
            <FacturaButton promesa={promesa} />
          </div>
        )}
        {(canRefund(promesa) || isRefund(promesa)) && (
          <div className="justify-content-end d-flex align-items-center">
            <RefundGrantiaButton promesa={promesa} />
          </div>
        )}
      </td>
      <td className="no-whitespace">
        {UserProject.isInmobiliario() &&
          (promesa.PromesaState === PROMESA_STATE[14] && (
            <span>
              <b>FIRMAS</b>{' '}
              {` | ${
                Object.keys(promesa.AprobacionInmobiliaria || {}).length
              } de ${countIN()}`}
            </span>
          ))}
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
                  push(
                    `/proyectos/${project.ProyectoID}/promesa?PromesaID=${
                      promesa.PromesaID
                    }`,
                  ),
                );
              }}
            >
              Ver datos
            </DropdownItem>
            {canEditPromesa(promesa) && (
              <DropdownItem
                tag="a"
                onClick={() =>
                  dispatch(
                    push(
                      `/proyectos/${
                        project.ProyectoID
                      }/promesa/editar?PromesaID=${promesa.PromesaID}`,
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
  promesa: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  project: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  dispatch: PropTypes.func,
};
export default Item;

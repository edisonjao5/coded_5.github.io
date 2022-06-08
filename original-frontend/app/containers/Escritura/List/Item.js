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

const Item = ({ project, escritura, dispatch }) => {
  // const [dropdownOpen, setDropdownOpen] = useState(false);
  const { Proyecto, Folio, EscrituraState, Inmuebles, Cliente } = escritura;
  const tmpInmuebles = matchRestrictionsFromAList(Inmuebles);
  let ColorBadge = 'badge-caution';
  switch (EscrituraState) {
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
  return (
    <tr className="font-14 align-middle-group">
      <td className="px-3 main_color">
        <Link
          to={`/proyectos/${project.ProyectoID}/escritura?EscrituraID=${
            escritura.EscrituraID
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
      <td>
        <div className="badge-group d-flex justify-content-end align-items-center rounded overflow-hidden">
          {/* <span className={`badge ${ColorBadge} px-2`}>{EscrituraState}</span> */}
          <span className={`badge ${ColorBadge} px-2`}>{""}</span>
        </div>
      </td>
      {/* <td className="font-21 px-3">
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
                    `/proyectos/${project.ProyectoID}/escritura?EscrituraID=${
                      escritura.EscrituraID
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
      </td> */}
    </tr>
  );
};

Item.propTypes = {
  escritura: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  project: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  dispatch: PropTypes.func,
};
export default Item;

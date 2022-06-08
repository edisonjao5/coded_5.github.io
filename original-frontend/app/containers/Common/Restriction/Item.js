import React from 'react';
import PropTypes from 'prop-types';
import {
  UncontrolledDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from 'reactstrap';
import { shortType } from 'containers/Common/Inmueble/helper';
const Item = ({ viewOnly, entity, editRestriction, deleteRestriction }) => {
  const Required = entity.Restrictions.filter(
    item => item.InmuebleInmuebleType === 'Required',
  ).map(item => item.Inmueble);
  const Forbidden = entity.Restrictions.filter(
    item => item.InmuebleInmuebleType === 'Forbidden',
  ).map(item => item.Inmueble);
  return (
    <tr className="align-middle-group ">
      <td className="pl-3 no-whitespace">
        <span className="color-main font-14-rem">
          <b>{shortType(entity.Inmueble)}</b>
        </span>
      </td>
      <td className="no-whitespace">
        {Required.length > 0 && (
          <div className="d-flex">
            <span
              className="font-14-rem color-regular"
              style={{ width: '5.5em' }}
            >
              <b>Required</b>
            </span>
            <span className="font-14-rem color-regular">
              <b>{shortType(Required.join(', '))}</b>
            </span>
          </div>
        )}
        {Forbidden.length > 0 && (
          <div className="d-flex">
            <span
              className="font-14-rem color-regular"
              style={{ width: '5.5em' }}
            >
              <b>Forbidden</b>
            </span>
            <span className="font-14-rem color-regular">
              <b>{shortType(Forbidden.join(', '))}</b>
            </span>
          </div>
        )}
      </td>
      <td className="w-100" />
      <td className="no-whitespace pr-3">
        {!viewOnly && (
          <UncontrolledDropdown>
            <DropdownToggle
              tag="a"
              className="icon icon-dots main_color ml-1"
            />
            <DropdownMenu right positionFixed>
              <DropdownItem tag="a" onClick={() => editRestriction(entity)}>
                Editar
              </DropdownItem>
              <DropdownItem
                tag="a"
                onClick={() => {
                  deleteRestriction(entity);
                }}
              >
                Eliminar
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        )}
      </td>
    </tr>
  );
};
Item.propTypes = {
  viewOnly: PropTypes.bool,
  entity: PropTypes.object,
  editRestriction: PropTypes.func,
  deleteRestriction: PropTypes.func,
};
export default Item;

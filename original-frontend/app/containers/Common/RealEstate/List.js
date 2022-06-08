/**
 *
 * EntityList
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Button from 'components/Button';
import {
  Table,
  UncontrolledDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from 'reactstrap';
import Thead from 'components/Table/Thead';
import { Auth } from 'containers/App/helpers';
import { PERMISSIONS } from 'containers/App/constants';

const List = ({ selector, onQuery, onCreate, onEdit, onView, onSelect }) => {
  const { entities, query = {} } = selector;
  const { selected = [], type } = query;
  const canManage = Auth.isAdmin() || Auth.hasPermission(PERMISSIONS[2]);
  let ths = [
    {
      field: 'RazonSocial',
      label: 'Nombre Constructora',
      sortable: true,
    },
    {},
  ];
  if (type === 'inmobiliaria') {
    ths = [
      {
        field: 'RazonSocial',
        label: 'Nombre Inmobiliaria',
        sortable: true,
      },
      { field: 'Rut', label: 'RUT', sortable: true },
      { field: 'Representante', label: 'Representante' },
      {},
    ];
  }

  if (onSelect) {
    ths.push({});
  }
  return (
    <div>
      <div className="d-flex align-items-end justify-content-between after-expands-2">
        <h4 className="font-21 color-regular mt-3 order-1">
          {type === 'inmobiliaria' ? 'Inmobiliarias' : 'Constructoras'}
        </h4>
        {canManage && (
          <Button className="m-btn-plus order-3 mr-3" onClick={onCreate}>
            Agregar {type}
          </Button>
        )}
      </div>
      <div className="mt-3 table-responsive-md background-color-white rounded shadow-sm py-3">
        <Table size="sm" className="m-0">
          <Thead onQuery={onQuery} query={query} ths={ths} />
          <tbody>
            {entities &&
              entities.map(entity => (
                <tr
                  key={entity.ConstructoraID || entity.InmobiliariaID}
                  className="align-middle-group border-bottom"
                >
                  <td className="pl-3 no-whitespace">
                    <span className="font-14-rem">
                      <b>{entity.RazonSocial}</b>
                    </span>
                  </td>
                  {type === 'inmobiliaria' && (
                    <td className="no-whitespace">
                      <span className="font-14-rem">{entity.Rut}</span>
                    </td>
                  )}
                  {type === 'inmobiliaria' && (
                    <td className="no-whitespace">
                      <span className="font-14-rem">
                        {(entity.UsersInmobiliaria || [])
                          .sort((a, b) => {
                            if (a.UserInmobiliariaType > b.UserInmobiliariaType)
                              return -1;
                            if (a.UserInmobiliariaType < b.UserInmobiliariaType)
                              return 1;
                            return 0;
                          })
                          .map(user => (
                            <div
                              key={`${user.UserInmobiliariaType}_${
                                user.UserID
                              }`}
                            >
                              {`${user.UserInmobiliariaType}: ${user.Name} / ${
                                user.Rut
                              }`}
                            </div>
                          ))}
                      </span>
                    </td>
                  )}
                  <td className="no-whitespace text-right pr-3">
                    <UncontrolledDropdown>
                      <DropdownToggle
                        tag="a"
                        className="icon icon-dots main_color ml-1"
                      />
                      <DropdownMenu right positionFixed>
                        <DropdownItem tag="a" onClick={() => onView(entity)}>
                          Ver datos
                        </DropdownItem>
                        {canManage && (
                          <DropdownItem tag="a" onClick={() => onEdit(entity)}>
                            Editar
                          </DropdownItem>
                        )}
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </td>
                  {onSelect && (
                    <td className="no-whitespace text-right" width="1%">
                      {selected.includes(entity.EntityID) && 'Seleccionada'}
                      {!selected.includes(entity.EntityID) && (
                        <Button size="sm" onClick={() => onSelect(entity)}>
                          Selecciona
                        </Button>
                      )}
                    </td>
                  )}
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

List.propTypes = {
  selector: PropTypes.object,
  onQuery: PropTypes.func,
  onCreate: PropTypes.func,
  onEdit: PropTypes.func,
  onView: PropTypes.func,
  onSelect: PropTypes.func,
};

export default List;

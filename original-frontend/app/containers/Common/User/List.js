/**
 *
 * UserList
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
import WithLoading from 'components/WithLoading';
import { Auth } from 'containers/App/helpers';
import { PERMISSIONS } from 'containers/App/constants';

const SyncMassage = WithLoading();

const List = ({
  selector,
  onQuery,
  onActive,
  onCreate,
  onEdit,
  onView,
  onResetPassword,
  onSelect,
}) => {
  const { users, loading, query = {} } = selector;
  const selected = (query.selected || [])
    .filter(user => user)
    .map(user => user.UserID || user);

  const canManage = Auth.hasOneOfPermissions([PERMISSIONS[1]]);
  const ths = [
    { field: 'Name', label: 'Nombres', sortable: true },
    { field: 'LastNames', label: 'Apellidos', sortable: true },
    { field: 'Rut', label: 'RUT', sortable: true },
    { field: 'Roles', label: 'Roles' },
    {
      field: 'IsActive',
      label: 'Activos',
      className: 'text-center',
      sortable: true,
    },
    {},
  ];
  if (onSelect) {
    ths.push({});
  }
  return (
    <div>
      <div className="d-flex align-items-end justify-content-between after-expands-2">
        <h4 className="font-21 color-regular mt-3 order-1">Usuarios</h4>
        {canManage && (
          <Button className="m-btn-plus order-3 mr-3" onClick={onCreate}>
            Agregar usuario
          </Button>
        )}
      </div>
      <div className="mt-3 table-responsive-md background-color-white rounded shadow-sm py-3">
        {loading && !users && <SyncMassage {...selector} />}
        {users && (
          <Table size="sm" className="m-0">
            <Thead onQuery={onQuery} query={query} ths={ths} />
            <tbody>
              {users &&
                users.map(user => (
                  <tr
                    key={user.UserID}
                    className="align-middle-group border-bottom"
                  >
                    <td className="pl-3 no-whitespace">
                      <span className="font-14-rem">
                        <b>{user.Name}</b>
                      </span>
                    </td>
                    <td className="no-whitespace">
                      <span className="font-14-rem">{user.LastNames}</span>
                    </td>
                    <td className="no-whitespace">
                      <span className="font-14-rem">{user.Rut}</span>
                    </td>
                    <td>
                      <span className="font-14-rem">
                        {user.Roles.map(role => role.Name).join(', ')}
                      </span>
                    </td>
                    <td className="no-whitespace">
                      {canManage && (
                        <div className="d-flex align-items-center justify-content-center">
                          <div className="checkbox-01">
                            <span>
                              <input
                                type="checkbox"
                                addon="true"
                                defaultChecked={user.IsActive}
                                onChange={evt =>
                                  onActive(user, evt.currentTarget.checked)
                                }
                              />
                              {/* eslint-disable-next-line */}
                              <label/>
                            </span>
                          </div>
                        </div>
                      )}
                    </td>
                    <td className="no-whitespace text-right pr-3">
                      <UncontrolledDropdown>
                        <DropdownToggle
                          tag="a"
                          className="icon icon-dots main_color ml-1"
                        />
                        <DropdownMenu right positionFixed>
                          <DropdownItem tag="a" onClick={() => onView(user)}>
                            Ver datos
                          </DropdownItem>
                          {canManage && (
                            <>
                              <DropdownItem
                                tag="a"
                                onClick={() => onEdit(user)}
                              >
                                Editar
                              </DropdownItem>
                              <DropdownItem divider />
                              <DropdownItem
                                tag="a"
                                onClick={() => onResetPassword(user)}
                              >
                                Restablecer contraseña
                              </DropdownItem>
                            </>
                          )}
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </td>
                    {onSelect && (
                      <td className="no-whitespace text-right" width="1%">
                        {selected.includes(user.UserID) && 'Seleccionada'}
                        {!selected.includes(user.UserID) && (
                          <Button size="sm" onClick={() => onSelect(user)}>
                            Selecciona
                          </Button>
                        )}
                      </td>
                    )}
                  </tr>
                ))}
            </tbody>
          </Table>
        )}
      </div>
    </div>
  );
};

List.propTypes = {
  selector: PropTypes.object,
  onQuery: PropTypes.func,
  onActive: PropTypes.func,
  onCreate: PropTypes.func,
  onEdit: PropTypes.func,
  onView: PropTypes.func,
  onResetPassword: PropTypes.func,
  onSelect: PropTypes.func,
};

export default List;

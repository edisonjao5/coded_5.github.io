/**
 *
 * ClientList
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'components/Button';
import {
  Table,
  UncontrolledDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
} from 'reactstrap';
import Thead from 'components/Table/Thead';
import { Auth } from 'containers/App/helpers';
// import { PERMISSIONS } from 'containers/App/constants';
import DeleteConfirm from './DeleteConfirm';

const List = ({
  canEdit = true,
  selector,
  onQuery,
  onCreate,
  onEdit,
  onView,
  onSelect,
  onDelete,
  canAdd = false,
}) => {
  const { clients, query = {} } = selector;
  const canManage = Auth.isAdmin() && canEdit;

  const { selected = [] } = query;
  const ths = [
    { field: 'Name', label: 'Nombres', sortable: true },
    { field: 'Rut', label: 'RUT', sortable: true },
    { field: 'Comuna', label: 'Comuna', sortable: true },
    {},
  ];
  if (onSelect) {
    ths.push({});
  }
  const [isOpen, setIsOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState();

  return (
    <div>
      <div className="d-flex align-items-end justify-content-between after-expands-2">
        <h4 className="font-21 color-regular mt-3 order-1">Clientes</h4>
        <div
          className="search-filter icon icon-search order-3"
          style={{ maxWidth: 200 }}
        >
          <Input
            className="form-control form-control-sm"
            type="text"
            onChange={evt => onQuery({ textSearch: evt.currentTarget.value })}
            placeholder="Escribe lo que deseas buscar..."
          />
        </div>
        {(canManage || canAdd) && (
          <Button className="m-btn-plus order-3 mr-3" onClick={onCreate}>
            Agregar cliente
          </Button>
        )}
      </div>
      <div className="mt-3 table-responsive-md background-color-white rounded shadow-sm py-3">
        <Table size="sm" className="m-0">
          <Thead onQuery={onQuery} query={query} ths={ths} />
          <tbody>
            {clients &&
              clients.map(client => (
                <tr
                  key={client.UserID}
                  className="align-middle-group border-bottom"
                  onClick={(event) => {
                    if (event.target.tagName === "A" || event.target.tagName === "BUTTON" ) event.preventDefault();
                    else onView(client)
                  }}
                >
                  <td className="pl-3 no-whitespace">
                    <span className="font-14-rem" >
                      <b>{`${client.Name} ${client.LastNames}`}</b>
                    </span>
                  </td>
                  <td className="no-whitespace">
                    <span className="font-14-rem">{client.Rut}</span>
                  </td>
                  <td className="no-whitespace">
                    <span className="font-14-rem">
                      {client.Comuna && client.Comuna.Name}
                    </span>
                  </td>
                  {canManage && (
                    <td className="no-whitespace text-right pr-3">
                      <UncontrolledDropdown>
                        <DropdownToggle
                          tag="a"
                          className="icon icon-dots main_color ml-1"
                        />
                        <DropdownMenu right positionFixed>
                          <DropdownItem tag="a" onClick={() => onEdit(client)}>
                            Editar
                          </DropdownItem>
                          <DropdownItem tag="a" onClick={() => {
                            setIsOpen(true);
                            setSelectedClient(client);
                            // onView(client)
                          }}>
                            {/* Ver datos */}
                            Eliminar
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </td>
                  )}

                  {onSelect && (
                    <td className="no-whitespace text-right" width="1%">
                      {selected.includes(client.UserID) && 'Seleccionada'}
                      {!selected.includes(client.UserID) && (
                        <Button size="sm" onClick={() => onSelect(client)}>
                          Selecciona
                        </Button>
                      )}
                    </td>
                  )}
                </tr>
              ))}
          </tbody>
        </Table>
        {canManage && (
          <DeleteConfirm
            isOpen={isOpen}
            onHide={() => setIsOpen(false)}
            onConfirm={() => {
              setIsOpen(false);
              onDelete(selectedClient.UserID);
            }}
            client={selectedClient}
          />
        )}
      </div>
    </div>
  );
};

List.propTypes = {
  canEdit: PropTypes.bool,
  selector: PropTypes.object,
  onQuery: PropTypes.func,
  onCreate: PropTypes.func,
  onEdit: PropTypes.func,
  onView: PropTypes.func,
  onSelect: PropTypes.func,
  onDelete: PropTypes.func,
};

export default List;

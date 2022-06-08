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

const List = ({ selector, onQuery, onCreate, onEdit, onSelect }) => {
  const { entities, query = {} } = selector;
  const { selected = [] } = query;
  const ths = [{ field: 'Name', label: 'Nombres', sortable: true }, {}];
  if (onSelect) {
    ths.push({});
  }
  return (
    <div>
      <div className="d-flex align-items-end justify-content-between after-expands-2">
        <h4 className="font-21 color-regular mt-3 order-1">
          Institucion Financieras
        </h4>
        <Button className="m-btn-plus order-3 mr-3" onClick={onCreate}>
          Agregar institucionFinanciera
        </Button>
      </div>
      <div className="mt-3 table-responsive-md background-color-white rounded shadow-sm py-3">
        <Table size="sm" className="m-0">
          <Thead onQuery={onQuery} query={query} ths={ths} />
          <tbody>
            {entities &&
              entities.map(entity => (
                <tr
                  key={entity.InstitucionFinancieraID}
                  className="align-middle-group border-bottom"
                >
                  <td className="pl-3 no-whitespace">
                    <span className="font-14-rem">
                      <b>{entity.Name}</b>
                    </span>
                  </td>
                  <td className="no-whitespace text-right pr-3">
                    <UncontrolledDropdown>
                      <DropdownToggle
                        tag="a"
                        className="icon icon-dots main_color ml-1"
                      />
                      <DropdownMenu right positionFixed>
                        <DropdownItem tag="a" onClick={() => onEdit(entity)}>
                          Editar
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </td>
                  {onSelect && (
                    <td className="no-whitespace text-right" width="1%">
                      {selected.includes(entity.InstitucionFinancieraID) &&
                        'Seleccionada'}
                      {!selected.includes(entity.InstitucionFinancieraID) && (
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

/**
 *
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import {
  Input,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import Badge from 'reactstrap/es/Badge';

const Filter = ({ selector, searchOffers }) => {
  const { filter, reports } = selector;
  return (
    <nav className="search-bar-02 d-flex align-items-center justify-content-end after-expands-2">
      <UncontrolledButtonDropdown className="order-3 mr-2">
        <DropdownToggle caret className="m-btn m-btn-white dropdown-toggle m-1">
          Filtrar {reports[filter.status || 'All'].Label}
        </DropdownToggle>
        <DropdownMenu>
          {Object.keys(reports).map(state => (
            <DropdownItem
              key={state}
              className="d-flex align-items-center font-14"
              onClick={() => searchOffers({ status: state })}
            >
              <b className="w-100">{reports[state].Label}</b>
              <Badge color="secondary" className="ml-2">
                {reports[state].Count || 0}
              </Badge>
            </DropdownItem>
          ))}
        </DropdownMenu>
      </UncontrolledButtonDropdown>
      <div
        className="order-4 search-filter icon icon-search m-1 w-50"
        style={{ maxWidth: 300 }}
      >
        <Input
          className="form-control form-control-sm"
          type="text"
          onChange={evt =>
            searchOffers({ textSearch: evt.currentTarget.value })
          }
          placeholder="Escribe lo que deseas buscar..."
        />
      </div>
    </nav>
  );
};

Filter.propTypes = {
  selector: PropTypes.object,
  searchOffers: PropTypes.func,
};
export default Filter;

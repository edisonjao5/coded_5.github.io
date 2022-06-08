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
import Button from 'components/Button';
import Badge from 'reactstrap/es/Badge';
import { Link } from 'react-router-dom';
import { canCreateReservation } from './helper';

const Filter = ({ project, selector, searchReservations }) => {
  const { filter, reports } = selector;
  return (
    <nav className="search-bar-02 d-flex align-items-center justify-content-end after-expands-2">
      {canCreateReservation() && (
        <div className="button-filter icon icon-plus">
          <Link
            to={`/proyectos/${project.ProyectoID}/reserva/crear`}
            className="btn btn-sm"
          >
            Crear Nueva Reserva
          </Link>
        </div>
      )}
      {/* <Button
        className="order-2 m-btn-white m-btn-warning icon icon-alert mr-2 order-3"
        onClick={() => searchReservations({ status: 'Cancelada' })}
      >
        Ver Atrasadas
      </Button> */}
      <UncontrolledButtonDropdown className="order-3 mr-2">
        <DropdownToggle caret className="m-btn m-btn-white dropdown-toggle m-1">
          Filtrar {reports[filter.status || 'All'].Label}
        </DropdownToggle>
        <DropdownMenu>
          {Object.keys(reports).map(state => (
            <DropdownItem
              key={state}
              className="d-flex align-items-center font-14"
              onClick={() => searchReservations({ status: state })}
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
            searchReservations({ textSearch: evt.currentTarget.value })
          }
          placeholder="Escribe lo que deseas buscar..."
        />
      </div>
    </nav>
  );
};

Filter.propTypes = {
  project: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  selector: PropTypes.object,
  searchReservations: PropTypes.func,
};
export default Filter;

/**
 *
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  UncontrolledButtonDropdown,
  Badge,
} from 'reactstrap';
import ExInput from 'components/ExForm/Input';
import { DatePickerInput } from 'components/ExForm/DatePicker';

const Filter = ({ project, filter, reports, searchQuotations }) => {
  let statusLable = '';
  switch (filter.status) {
    case '':
      statusLable = 'Todas';
      break;
    default:
      statusLable = filter.status;
  }
  return (
    <nav className="search-bar-02 d-flex align-items-center justify-content-end after-expands-1">
      <div className="button-filter icon icon-plus">
        <Link
          to={`/proyectos/${project.ProyectoID}/cotizacion/crear`}
          className="btn btn-sm"
        >
          Crear Nueva Cotización
        </Link>
      </div>
      <div className="order-2 mr-2">
        <ExInput
          type="select"
          onChange={evt => searchQuotations({ client: evt.target.value })}
        >
          <option value="">Cliente</option>
          {reports.clients.map(client => (
            <option value={client.UserID} key={client.UserID}>
              {`${client.Name} ${client.LastNames} / ${client.Rut}`}
            </option>
          ))}
        </ExInput>
      </div>
      <div className="order-2 mr-2">
        <DatePickerInput
          range
          values={filter.dates || reports.dates}
          onSelect={(values, dates) => searchQuotations({ dates })}
          name="date"
        />
      </div>
      <div className="order-2">
        <UncontrolledButtonDropdown className="order-3 mr-2">
          <DropdownToggle
            caret
            className="m-btn m-btn-white dropdown-toggle m-1"
          >
            Filtrar {statusLable}
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem
              className="d-flex align-items-center font-14"
              onClick={() => searchQuotations({ status: '' })}
            >
              <b className="w-100">Todas</b>
              <Badge color="secondary" className="ml-2">
                {reports.states.All || 0}
              </Badge>
            </DropdownItem>
            <DropdownItem
              className="d-flex align-items-center font-14"
              onClick={() => searchQuotations({ status: 'Vigente' })}
            >
              <b className="w-100">Vigente</b>
              <Badge color="secondary" className="ml-2">
                {reports.states.Vigente || 0}
              </Badge>
            </DropdownItem>
            <DropdownItem
              className="d-flex align-items-center font-14"
              onClick={() => searchQuotations({ status: 'Vencida' })}
            >
              <b className="w-100">Vencida</b>
              <Badge color="secondary" className="ml-2">
                {reports.states.Vencida || 0}
              </Badge>
            </DropdownItem>
            <DropdownItem
              className="d-flex align-items-center font-14"
              onClick={() => searchQuotations({ status: 'Reserva' })}
            >
              <b className="w-100">Reserva</b>
              <Badge color="secondary" className="ml-2">
                {reports.states.Reserva || 0}
              </Badge>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledButtonDropdown>
      </div>
      <div
        className="search-filter icon icon-search order-2 w-50"
        style={{ maxWidth: 200 }}
      >
        <Input
          className="form-control form-control-sm"
          type="text"
          onChange={evt => searchQuotations({ textSearch: evt.target.value })}
          placeholder="Escribe lo que deseas buscar..."
        />
      </div>
    </nav>
  );
};

Filter.propTypes = {
  project: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  filter: PropTypes.object,
  reports: PropTypes.object,
  searchQuotations: PropTypes.func,
};
export default Filter;

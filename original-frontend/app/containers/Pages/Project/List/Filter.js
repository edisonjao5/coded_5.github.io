/* eslint-disable jsx-a11y/anchor-has-content,jsx-a11y/anchor-is-valid */
/**
 *
 * ProjectItem
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Auth } from 'containers/App/helpers';

const Filter = ({ onFilter }) => {
  const [query, setQuery] = useState({ sort: '', txtSearch: '' });
  const handleChange = evt => {
    const newQuery = { ...query, [evt.target.name]: evt.target.value };
    setQuery(newQuery);
    onFilter(newQuery);
  };
  return (
    <nav className="row menu d-dlex justify-content-betweens after-expands-2">
      {Auth.isPM() && (
        <div className="col-auto nav-btn add">
          <div className="button-filter icon icon-plus">
            <Link to="/proyectos/crear" className="btn btn-sm">
              Crear nuevo proyecto
            </Link>
          </div>
        </div>
      )}
      <div className="col-auto nav-btn filter order-3">
        <div className="select-filter icon icon-select-arrows right-icon">
          <select
            name="sort"
            value={query.sort}
            onChange={handleChange}
            className="form-control form-control-sm"
          >
            <option value="">Ordenar Proyectos</option>
            <option value="name asc">Ordenar por nombre Ascendente</option>
            <option value="name desc">Ordenar por nombre Descendente</option>
          </select>
        </div>
      </div>
      <div className="col nav-btn search order-3" style={{ maxWidth: 300 }}>
        <div className="search-filter icon icon-search">
          <input
            name="txtSearch"
            value={query.txtSearch}
            onChange={handleChange}
            className="form-control form-control-sm"
            type="text"
            placeholder="Escribe lo que deseas buscar..."
          />
        </div>
      </div>
    </nav>
  );
};

Filter.propTypes = {
  onFilter: PropTypes.func,
};

export default Filter;

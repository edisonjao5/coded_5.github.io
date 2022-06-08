/**
 *
 * InmuebleFilter
 *
 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ReactBootstrapSlider } from 'react-bootstrap-slider';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';

function InmuebleFilter({ entities = {}, onQuery }) {
  const { inmueblesOrientations } = window.preload;
  const orientations = [];
  const piso = [];
  const initQuery = entities.reduce(
    (acc, entity) => {
      const {
        MetrosCuadradosTerraza = 0,
        MetrosCuadradosInterior = 0,
        MetrosCuadradosLogia = 0,
        Precio,
        Orientacion,
        Piso,
      } = entity;
      const totalSquare =
        MetrosCuadradosTerraza + MetrosCuadradosInterior + MetrosCuadradosLogia;
      if (totalSquare < acc.rangeSquare[0])
        acc.rangeSquare[0] = Math.floor(totalSquare);
      if (totalSquare > acc.rangeSquare[1])
        acc.rangeSquare[1] = Math.ceil(totalSquare);

      if (Precio < acc.rangePrice[0]) acc.rangePrice[0] = Math.floor(Precio);
      if (Precio > acc.rangePrice[1]) acc.rangePrice[1] = Math.ceil(Precio);
      orientations.push(Orientacion);
      piso.push(Piso);
      return acc;
    },
    { rangeSquare: [0, 0], rangePrice: [0, 0] },
  );

  const [query, setQuery] = useState(initQuery);

  const handleChangeQuery = (name, value) => {
    const newQuery = { ...query, [name]: value };
    setQuery(newQuery);
    onQuery(newQuery);
  };

  return (
    <div className="filter-01 px-3 py-3 w-100">
      <h5>Filtros</h5>
      <div className="select-filter icon icon-select-arrows right-icon">
        <select
          onChange={evt => handleChangeQuery('orientation', evt.target.value)}
          className="form-control form-control-sm"
        >
          <option value="">Selecciona Orientación...</option>
          {inmueblesOrientations.map(orientation => (
            <option key={orientation.OrientationID} value={orientation.Name}>
              [{orientation.Name}] {orientation.Description}
            </option>
          ))}
        </select>
      </div>
      <div className="select-filter icon icon-select-arrows right-icon">
        <select
          className="form-control form-control-sm"
          onChange={evt => handleChangeQuery('floor', evt.target.value)}
        >
          <option value="">Selecciona Piso...</option>
          {[...new Set(piso)].map(floor => (
            <option key={floor} value={floor}>
              {floor}
            </option>
          ))}
        </select>
      </div>
      <div className="flex-fill mx-4">
        <ReactBootstrapSlider
          name="rangeSquare"
          value={query.rangeSquare}
          min={initQuery.rangeSquare[0]}
          max={initQuery.rangeSquare[1]}
          range
          slideStop={evt => handleChangeQuery('rangeSquare', evt.target.value)}
        />
        <span />
        <span
          className="d-block font-11 color-main text-center"
          style={{ marginTop: -5 }}
        >
          <b>
            M<sup>2</sup>
          </b>
        </span>
      </div>
      <div className="flex-fill mx-4">
        <ReactBootstrapSlider
          name="rangePrice"
          value={query.rangePrice}
          min={initQuery.rangePrice[0]}
          max={initQuery.rangePrice[1]}
          range
          slideStop={evt => handleChangeQuery('rangePrice', evt.target.value)}
        />
        <span />
        <span
          className="d-block font-11 color-main text-center"
          style={{ marginTop: -5 }}
        >
          <b>UF</b>
        </span>
      </div>
    </div>
  );
}

InmuebleFilter.propTypes = {
  entities: PropTypes.array,
  onQuery: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({});

const withConnect = connect(
  mapStateToProps,
  dispatch => ({
    dispatch,
  }),
);

export default compose(withConnect)(InmuebleFilter);

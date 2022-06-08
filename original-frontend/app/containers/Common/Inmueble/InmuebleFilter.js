/**
 *
 * InmuebleFilter
 *
 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ReactBootstrapSlider } from 'react-bootstrap-slider';

function InmuebleFilter({ entities = {}, onQuery }) {
  const orientations = {};
  const piso = [];
  const subtypes = [];
  const types = [];
  const initQuery = entities.reduce(
    (acc, entity) => {
      const {
        TerraceSquareMeters = 0,
        UtilSquareMeters = 0,
        LodgeSquareMeters = 0,
        Price = 0,
        Orientation = [],
        Floor,
        InmuebleTypeID,
        InmuebleType,
        TipologiaID,
        Tipologia,
      } = entity;
      const totalSquare =
        TerraceSquareMeters + UtilSquareMeters + LodgeSquareMeters;
      if (totalSquare < acc.rangeSquare[0])
        acc.rangeSquare[0] = Math.floor(totalSquare);
      if (totalSquare > acc.rangeSquare[1])
        acc.rangeSquare[1] = Math.ceil(totalSquare);

      if (Price < acc.rangePrice[0]) acc.rangePrice[0] = Math.floor(Price);
      if (Price > acc.rangePrice[1]) acc.rangePrice[1] = Math.ceil(Price);
      Orientation.forEach(Orient => {
        orientations[Orient.OrientationID] = Orient.Description || Orient.Name;
      });
      piso.push(Floor);
      if (TipologiaID) subtypes[TipologiaID] = Tipologia;
      if (InmuebleTypeID) types[InmuebleTypeID] = InmuebleType;
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
    <div className="filter-01 py-3 w-100">
      <h5>Filtros</h5>
      <div className="select-filter icon icon-select-arrows right-icon">
        <select
          onChange={evt => handleChangeQuery('orientation', evt.target.value)}
          className="form-control form-control-sm"
        >
          <option value="">Orientación...</option>
          {Object.keys(orientations).map(OrientationID => (
            <option key={OrientationID} value={OrientationID}>
              {orientations[OrientationID]}
            </option>
          ))}
        </select>
      </div>
      <div className="select-filter icon icon-select-arrows right-icon">
        <select
          className="form-control form-control-sm"
          onChange={evt => handleChangeQuery('floor', evt.target.value)}
        >
          <option value="">Piso...</option>
          {[...new Set(piso)]
            .sort((a, b) => a - b)
            .map(floor => (
              <option key={floor} value={floor}>
                {floor > 0 ? floor : 'G'}
              </option>
            ))}
        </select>
      </div>
      <div className="select-filter icon icon-select-arrows right-icon">
        <select
          className="form-control form-control-sm"
          onChange={evt => handleChangeQuery('type', evt.target.value)}
        >
          <option value="">Tipologia...</option>
          {Object.keys(types).map(TypeID => (
            <option key={TypeID} value={TypeID}>
              {types[TypeID]}
            </option>
          ))}
        </select>
      </div>
      <div className="select-filter icon icon-select-arrows right-icon">
        <select
          className="form-control form-control-sm"
          onChange={evt => handleChangeQuery('subtype', evt.target.value)}
        >
          <option value="">Sub-Tipologia...</option>
          {Object.keys(subtypes).map(TipologiaID => (
            <option key={TipologiaID} value={TipologiaID}>
              {subtypes[TipologiaID]}
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

export default InmuebleFilter;

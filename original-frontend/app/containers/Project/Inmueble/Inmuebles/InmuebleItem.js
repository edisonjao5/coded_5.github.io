/**
 *
 * InmuebleItem
 *
 */
import React from 'react';

import PropTypes from 'prop-types';

function InmuebleItem({ entity = {} }) {
  let stateColor = '';
  switch (entity.Estado) {
    case 'Vendido':
      stateColor = 'background-color-success-03 color-white';
      break;
    case 'Reservado':
      stateColor = 'background-color-success-02';
      break;
    case 'Bloqueado por inmobiliaria':
      stateColor = 'background-color-success-01';
      break;
    default:
      stateColor = '';
  }
  return (
    <div className="shadow">
      <div
        className={`${stateColor} p-2 px-3 d-flex align-items-center justify-content-between`}
      >
        <h5 className="font-16 m-0">
          <span className="d-block">
            <b>{entity.Numero}</b>
          </span>
          <span className="font-14-rem">{entity.TipoInmueble}</span>
          <span className="d-block font-12-rem text-secondary">{entity.UsoyGoce && 'Uso y Goce'}</span>
        </h5>
        <a
          href="#"
          className="mr-2 color-black icon icon-dots icon-rotate-v font-21"
        />
      </div>
      <div className="p-2 px-3">
        <ul className="m-0 p-0">
          <li className="font-14-rem w-100 d-flex justify-content-between align-items-center">
            <span>Precio:</span>
            <span>{entity.Precio} UF</span>
          </li>
          <li className="font-14-rem w-100 d-flex justify-content-between align-items-center">
            <span>Venta:</span>
            <span>
              {(entity.Precio * (100 - entity.DescuentoMaximo)) / 100} UF
            </span>
          </li>
          <li className="font-14-rem w-100 d-flex justify-content-between align-items-center">
            <span>Descuento:</span>
            <span>{entity.DescuentoMaximo}%</span>
          </li>
          <hr className="my-1 opacity-0" />
          <li className="font-14-rem w-100 d-flex justify-content-between align-items-center">
            <span>
              Sup U: {entity.MetrosCuadradosInterior} m<sup>2</sup>
            </span>
            <span>Or: {entity.Orientacion}</span>
          </li>
          <li className="font-14-rem w-100 d-flex justify-content-between align-items-center">
            <span>
              Sup T: {entity.MetrosCuadradosTerraza} m<sup>2</sup>
            </span>
            <span>Dorm: {entity.CantidadHabitaciones}</span>
          </li>
          <li className="font-14-rem w-100 d-flex justify-content-between align-items-center">
            <span>
              Tipo: {entity.CantidadHabitaciones}D{entity.CantidadBanos}B{' '}
              {entity.Tipologia}
            </span>
            <span>Baños: {entity.CantidadBanos}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

InmuebleItem.propTypes = {
  entity: PropTypes.object,
};

export default InmuebleItem;

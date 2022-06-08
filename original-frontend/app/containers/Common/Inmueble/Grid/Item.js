/**
 *
 * InmuebleItem
 *
 */
import React from 'react';

import PropTypes from 'prop-types';

function GridItem({ entity = {}, focusChange, onSelect }) {
  let stateColor = '';
  switch (entity.InmuebleState) {
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
        <h5 className="font-16 m-0 d-flex align-items-center">
          {onSelect && (
            <div className="checkbox">
              <span className="mr-3">
                <input
                  disabled={
                    entity.InmuebleState !== 'Disponible' ||
                    (!focusChange && entity.isRequiredRestriction)
                  }
                  type="checkbox"
                  defaultChecked={entity.IsSelected}
                  onChange={evt => onSelect(entity, evt.currentTarget.checked)}
                />
                <label />
              </span>
            </div>
          )}
          <div>
            <span className="d-block">
              <b>{entity.Number}</b>
            </span>
            <div className="font-14-rem">{entity.InmuebleState}</div>
            {/* <div className="font-14-rem">{entity.Tipologia || '-'}</div> */}
          </div>
        </h5>
        <a
          href="#"
          className="mr-2 color-black icon icon-dots icon-rotate-v font-21"
        />
      </div>
      <div className="p-2 px-3">
        <ul className="m-0 p-0">
          <li className="font-14-rem w-100 d-flex justify-content-between align-items-center">
            <span>{entity.IsNotUsoyGoce ? 'Uso y Goce' : ''}</span>
              {entity.Up_Print&& (
                <span className="mr-2">
                    <li style={{color:'blue'}}>
                        <i className="icon icon-check" />
                    </li>
                </span>
              )}
          </li>
          <li className="font-14-rem w-100 d-flex justify-content-between align-items-center">
            <span>Precio:</span>
            <span>{entity.Price} UF</span>
          </li>
          <li className="font-14-rem w-100 d-flex justify-content-between align-items-center">
            <span>Venta:</span>
            <span>
              {(entity.Price * (100 - entity.MaximumDiscount)) / 100} UF
            </span>
          </li>
          <li className="font-14-rem w-100 d-flex justify-content-between align-items-center">
            <span>Descuento:</span>
            <span>{entity.MaximumDiscount}%</span>
          </li>
          <hr className="my-1 opacity-0" />
          <li className="font-14-rem w-100 d-flex justify-content-between align-items-center">
            <span>
              Sup U: {entity.UtilSquareMeters} m<sup>2</sup>
            </span>
            <span>Or: {entity.Orientation[0] ? entity.Orientation[0].Name : ''}</span>
          </li>
          <li className="font-14-rem w-100 d-flex justify-content-between align-items-center">
            <span>
              Sup T: {entity.TerraceSquareMeters} m<sup>2</sup>
            </span>
            <span>Dorm: {entity.BedroomsQuantity}</span>
          </li>
          <li className="font-14-rem w-100 d-flex justify-content-between align-items-center">
            <span>
              Tipo: {entity.BedroomsQuantity}D{entity.BathroomQuantity}B K
            </span>
            <span>Baños: {entity.BathroomQuantity}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

GridItem.propTypes = {
  focusChange: PropTypes.bool,
  entity: PropTypes.object,
  onSelect: PropTypes.func,
};

export default GridItem;

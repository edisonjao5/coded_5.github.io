/**
 *
 * InmuebleItem
 *
 */
import React from 'react';

import PropTypes from 'prop-types';
import { FormattedNumber } from 'react-intl';
import { inmuebleSortDetail, DownloadBlueprint } from '../helper';

function ListItem({ entity = {}, focusChange, onSelect, onModifyItem }) {
  return (
    <tr>
      <th scope="row" className="checkbox">
        {onSelect && (
          <span>
            <input
              disabled={
                entity.InmuebleState !== 'Disponible' ||
                (!focusChange && entity.isRequiredRestriction)
              }
              type="checkbox"
              checked={entity.IsSelected}
              onChange={evt => onSelect(entity, evt.currentTarget.checked)}
            />
            {/* eslint-disable-next-line */}
            <label />
          </span>
        )}

        <p className="m-0 p-0 color-main"
          style={{cursor: "pointer"}}
          onClick={()=>onModifyItem(entity)}
        >
          {entity.InmuebleType} {entity.Number}
        </p>
      </th>
      <td className="expand orientation">{inmuebleSortDetail(entity)}</td>
      <td className="mr-2">
        {entity.Up_Print && (
          <li style={{ color: 'blue' }}>
            <i className="icon icon-check" />
          </li>
        )}
      </td>
      <td>
        {entity.InmuebleState !== 'Disponible' && (
          <span className="badge badge-danger mr-2">
            {entity.InmuebleState}
          </span>
        )}
        {entity.isRequiredRestriction && (
          <span className="badge badge-warning mr-2">Restricción</span>
        )}
      </td>
      <td>{entity.IsNotUsoyGoce ? 'Uso y Goce' : ''}</td>
      {/* <td>{entity.Tipologia}</td> */}
      {entity.InmuebleState !== 'Reservado' ? (
        <>
          <td>
            <b>Valor UF</b>
          </td>
          <td>
            <strong>
              <FormattedNumber value={entity.Price} />
            </strong>
          </td>
        </>
      ) : (
        <>
          <td> </td>
          <td> </td>
        </>
      )}
      <td>
        <a
          onClick={e => (
            !entity.Up_Print ? 
            e.preventDefault() : 
            DownloadBlueprint(entity.Up_Print, entity.BluePrint)
          )}
          className="color-main icon icon-plant pointer"
        >
          <b>Ver plano</b>
        </a>
      </td>
    </tr>
  );
}

ListItem.propTypes = {
  focusChange: PropTypes.bool,
  entity: PropTypes.object,
  onSelect: PropTypes.func,
  onModifyItem: PropTypes.func,
};

export default ListItem;

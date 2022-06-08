import React from 'react';
import PropTypes from 'prop-types';
/* eslint-disable */
const Thead = ({ ths = [], onQuery, query = {} }) => {
  const { sort = {} } = query;
  return (
    <thead className="background-color-tab">
      <tr>
        {ths.map((th, index) => (
          <td
            key={index}
            className={`${index > 0 ? '' : 'pl-3'} ${th.className || ''}`}
            style={{cursor: 'pointer'}}
            onClick={() =>
              th.sortable
                ? onQuery({ sort: { by: th.field, asc: !sort.asc } })
                : ''
            }
            colSpan={th.colSpan || 1}
          >
            <span className="font-14-rem color-regular">
              <b>
                {th.label}{' '}
                {th.sortable && (
                  <span className="font-8">
                    {sort.by === th.field ? (sort.asc ? '▲▽' : '△▼') : '△▽'}
                  </span>
                )}
              </b>
            </span>
          </td>
        ))}
      </tr>
    </thead>
  );
};
Thead.propTypes = {
  ths: PropTypes.array,
  query: PropTypes.object,
  onQuery: PropTypes.func,
};
export default Thead;

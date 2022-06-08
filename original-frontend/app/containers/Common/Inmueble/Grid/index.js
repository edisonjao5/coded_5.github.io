/**
 *
 * InmuebleItem
 *
 */
import React from 'react';

import PropTypes from 'prop-types';
import GridItem from './Item';

function Grid({ entities = {}, focusChange, onSelectItem }) {
  let maxPerFloor = 0;
  const floors = entities.reduce((acc, item) => {
    acc[item.Floor] = acc[item.Floor] || [];
    acc[item.Floor].push(item);
    if (acc[item.Floor].length > maxPerFloor)
      maxPerFloor = acc[item.Floor].length;
    return acc;
  }, {});

  return (
    <div className="p-3">
      {Object.keys(floors)
        .sort((a, b) => b - a)
        .map(floor => (
          <div key={floor} className="pb-3">
            <h4 id={`grid_accordion_${floor}`}>
              <b>{floor > 0 ? `Piso ${floor}` : `Piso G`}</b>
            </h4>
            <div className="row mx-lg-n2">
              {floors[floor]
                .sort((a, b) => a.Number - b.Number)
                .map(entity => (
                  <article
                    key={entity.InmuebleID}
                    className="col-lg-4 col-xl-3 px-2 my-2"
                  >
                    <GridItem
                      focusChange={focusChange}
                      entity={entity}
                      onSelect={onSelectItem}
                    />
                  </article>
                ))}
            </div>
          </div>
        ))}
    </div>
  );
}

Grid.propTypes = {
  focusChange: PropTypes.bool,
  entities: PropTypes.array,
  onSelectItem: PropTypes.func,
};

export default Grid;

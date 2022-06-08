/**
 *
 * InmuebleList
 *
 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import InmuebleItem from './InmuebleItem';
import InmuebleFilter from './InmuebleFilter';

const InmuebleList = ({ entities = [] }) => {
  const [showEntities, setState] = useState(entities);

  const handleChangeQuery = query => {
    setState(
      entities.filter(entity => {
        const {
          MetrosCuadradosTerraza = 0,
          MetrosCuadradosInterior = 0,
          MetrosCuadradosLogia = 0,
          Precio,
          Orientacion,
          Piso,
        } = entity;

        const totalSquare =
          MetrosCuadradosTerraza +
          MetrosCuadradosInterior +
          MetrosCuadradosLogia;
        return (
          query.rangeSquare[0] <= totalSquare &&
          query.rangeSquare[1] >= totalSquare &&
          query.rangePrice[0] <= Precio &&
          query.rangePrice[1] >= Precio &&
          (!query.orientation || Orientacion === query.orientation) &&
          (!query.floor || Piso === parseInt(query.floor, 10))
        );
      }),
    );
  };
  return (
    <>
      <InmuebleFilter entities={entities} onQuery={handleChangeQuery} />
      <div className="p-3">
        <div className="row mx-lg-n2">
          {showEntities.map((entity, index) => (
            /* eslint-disable-next-line */
            <article key={index} className="col-lg-4 col-xl-3 px-2 my-2">
              <InmuebleItem entity={entity} />
            </article>
          ))}
        </div>
      </div>
    </>
  );
};

InmuebleList.propTypes = {
  entities: PropTypes.array,
};

export default InmuebleList;

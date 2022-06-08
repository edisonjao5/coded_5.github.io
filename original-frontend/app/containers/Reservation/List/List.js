/**
 *
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'components/Box';
import Empty from 'components/Empty';
import Item from './Item';
import Thead from 'components/Table/Thead';

const List = ({ project, reservations, query, onQuery, dispatch }) => (
  <Box className="mt-3 pb-3">
    {reservations && reservations.length < 1 && <Empty tag="h2" />}
    {reservations && reservations.length > 0 && (
      <table className="table table-responsive-sm table-fixed table-sm border-bottom">
        <Thead
          ths={[
            { field: 'ReservaID', label: 'Reserva', sortable: true },
            { field: 'Inmuebles', label: 'Inmuebles', className: "pl-3" },
            { field: 'Cliente', label: 'Cliente', sortable: true },
            { field: 'Date', label: 'Fecha', sortable: true },
            { field: 'ReservaState', label: 'Estado', className: "text-right", sortable: true },
            { field: '', label: '' },
          ]}
          onQuery={ onQuery }
          query={ query }
        />
        <tbody>
          {reservations.map(reservation => (
            <Item
              key={reservation.ReservaID}
              reservation={reservation}
              project={project}
              dispatch={dispatch}
            />
          ))}
        </tbody>
      </table>
    )}
  </Box>
);

List.propTypes = {
  reservations: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  project: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  dispatch: PropTypes.func,
};
export default List;

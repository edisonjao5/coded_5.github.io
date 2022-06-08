/**
 *
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'components/Box';
import Empty from 'components/Empty';
import Thead from 'components/Table/Thead';
import Item from './Item';

const List = ({ project, offers, onQuery, query, dispatch }) => (
  <Box className="mt-3 pb-3">
    {offers && offers.length < 1 && <Empty tag="h2" />}
    {(offers && offers.length > 0 ) && (
      <table className="table table-responsive-sm table-fixed table-sm border-bottom">
        <Thead
          ths={[
            { field: 'OfertaID', label: 'Oferta', sortable: true },
            { field: 'Inmuebles', label: 'Inmuebles', className: 'pl-3' },
            { field: 'Cliente', label: 'Cliente', sortable: true },
            { field: 'Date', label: 'Fecha', sortable: true },
            {
              field: 'AprobacionInmobiliariaState',
              label: 'Responsable',
              sortable: true,
            },
            {
              field: 'OfertaState',
              label: 'Estado',
              className: 'text-right pr-3',
              sortable: true,
            },
            { field: '', label: '' },
          ]}
          onQuery={onQuery}
          query={query}
        />
        <tbody>
          {offers &&
            offers.map(offer => (
              <Item
                key={offer.OfertaID}
                offer={offer}
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
  offers: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  project: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  dispatch: PropTypes.func,
};
export default List;

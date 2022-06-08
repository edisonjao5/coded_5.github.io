/**
 *
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'components/Box';
import Empty from 'components/Empty';
import FiItem from './FiItem';
import Thead from 'components/Table/Thead';

const FiList = ({ project, offers, onQuery, query, dispatch }) => (
  <Box className="mt-3 pb-3">
    {offers.length < 1 && <Empty tag="h2" />}
    {offers.length > 0 && (
      <table className="table table-responsive-sm table-fixed table-sm border-bottom">
        <Thead
          ths={[
            { field: 'OfertaID', label: 'Oferta', sortable: true },
            { field: 'Inmuebles', label: 'Inmuebles', className: 'pl-3' },
            { field: 'Cliente', label: 'Cliente', sortable: true },
            { field: 'Date', label: 'Fecha', sortable: true },
            { field: 'OfertaState', label: 'Estado', className: "text-right px-3", sortable: true },
            { field: '', label: '' },
          ]}
          onQuery={onQuery}
          query={query}
        />
        <tbody>
          {offers.map(offer => (
            <FiItem
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

FiList.propTypes = {
  offers: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  project: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  dispatch: PropTypes.func,
};
export default FiList;

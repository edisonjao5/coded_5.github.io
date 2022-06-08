/**
 *
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'components/Box';
import Empty from 'components/Empty';
import { countIN } from 'containers/Project/helper';
import Thead from 'components/Table/Thead';
// import { isPendienteContacto } from '../helper';
import { APROBACION_INMOBILIARIA_STATE } from 'containers/App/constants';
import InItem from './InItem';

const InList = ({ project = {}, offers, dispatch }) => {
  const showOffers = offers.filter(
    offer =>
      offer.AprobacionInmobiliariaState != APROBACION_INMOBILIARIA_STATE[0],
  );
  return (
    <Box className="mt-3 pt-3 pb-3">
      {showOffers.length < 1 && <Empty tag="h2" />}
      {showOffers.length > 0 && (
        <table className="table table-responsive-sm table-fixed table-sm border-bottom">
          <Thead
            ths={[
              { field: 'OfertaID', label: 'Oferta', sortable: true },
              { field: 'Inmuebles', label: 'Inmuebles', className: 'pl-3' },
              { field: 'Cliente', label: 'Cliente', sortable: true },
              {
                field: 'OfertaState',
                label: 'Estado',
                className: 'text-right pr-3',
                sortable: true,
              },
              { field: 'FIRMAS', label: 'FIRMAS', sortable: true },
              { field: '', label: '' },
            ]}
          />
          <tbody>
            {showOffers.map(offer => (
              <InItem
                numberIN={countIN()}
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
};

InList.propTypes = {
  offers: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  project: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  dispatch: PropTypes.func,
};
export default InList;

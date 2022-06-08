/**
 *
 * Reservation Upload Form
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Box, BoxContent, BoxHeader, BoxFooter } from 'components/Box';
import WithLoading from 'components/WithLoading';
import PhaseControlPromesaForm from './Form';
import PhaseFirmaDocumentsPromesaView from '../FirmaDocuments/View';

const SyncMassage = WithLoading();

export function PhaseControlPromesa({ selector, entity, onControl }) {
  return (
    <>
      <Box collapse>
        <BoxHeader>
          <b>Control de Promesa</b>
        </BoxHeader>
        <BoxContent>
          <PhaseFirmaDocumentsPromesaView entity={entity} />
        </BoxContent>
        <BoxFooter>
          <PhaseControlPromesaForm onControl={onControl} selector={selector} />
        </BoxFooter>
      </Box>
      <div className="py-3">
        <SyncMassage {...selector} />
      </div>
    </>
  );
}

PhaseControlPromesa.propTypes = {
  entity: PropTypes.object,
  selector: PropTypes.object,
  onControl: PropTypes.func,
};

export default PhaseControlPromesa;

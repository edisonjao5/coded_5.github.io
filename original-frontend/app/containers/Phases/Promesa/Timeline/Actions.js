/**
 *
 * Reservation Upload Form
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Box, BoxContent, BoxHeader, BoxFooter } from 'components/Box';
import WithLoading from 'components/WithLoading';
import Button from 'components/Button';
import PhaseFirmaDocumentsPromesaView from '../FirmaDocuments/View';
import { FormGroup } from '../../../../components/ExForm';

const SyncMassage = WithLoading();

export function PhaseTimelineActions({ selector, entity, onSend, onCancel }) {
  return (
    <>
      <FormGroup />
    </>
  );
}

PhaseTimelineActions.propTypes = {
  entity: PropTypes.object,
  selector: PropTypes.object,
  onSend: PropTypes.func,
  onCancel: PropTypes.func,
};

export default PhaseTimelineActions;

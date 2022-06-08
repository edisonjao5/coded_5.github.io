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
import { UserProject } from 'containers/Project/helper';
import PhaseFirmaDocumentsPromesaView from '../FirmaDocuments/View';
import PhaseTimelineSendToIn from './SendToIn';
import PhaseTimelineSignIn from './SignIn';
import PhaseTimelineLegalizePromesa from './LegalizePromesa';
import { getStepTimeline } from './helper';
import PhaseTimelineSendCopy from './SendCopy';
import PhaseTimelineFacturaPromesa from './Factura';

const SyncMassage = WithLoading();

export function PhaseTimeline({
  isCollapse = true,
  selector,
  entity,
  onSendToIn,
  onGenerateFactura,
  onSignIn,
  onLegalize,
  onSendCopy,
  onCancel,
}) {
  const step = getStepTimeline(entity);
 
  return (
    <Box collapse isOpen={isCollapse}>
      <BoxHeader>
        <b>FIRMA PROMESA</b>
      </BoxHeader>
      <BoxContent className="p-0">
        <div className="p-3 border-bottom">
          <PhaseFirmaDocumentsPromesaView entity={entity} />
        </div>
        <div className="p-3">
          <PhaseTimelineSendToIn
            entity={entity}
            selector={selector}
            onSubmit={onSendToIn}
            isPending={step < 1}
            canEdit={step === 0 && UserProject.isPM()}
          />
          <PhaseTimelineFacturaPromesa
            isPending={step < 2}
            canEdit={step === 1 && UserProject.isFinanza()}
            selector={selector}
            entity={entity}
            onSubmit={onGenerateFactura}
          />
          <PhaseTimelineSignIn
            entity={entity}
            selector={selector}
            onSubmit={onSignIn}
            isPending={step < 3}
            canEdit={step === 2 && UserProject.isPM()}
          />
          <PhaseTimelineLegalizePromesa
            entity={entity}
            selector={selector}
            onSubmit={onLegalize}
            isPending={step < 4}
            canEdit={step === 3 && UserProject.isAC()}
          />
          <PhaseTimelineSendCopy
            entity={entity}
            selector={selector}
            onSubmit={onSendCopy}
            isPending={step < 5}
            canEdit={step === 4 && UserProject.isAC()}
          />
          <div className="py-3">
            <SyncMassage {...selector} />
          </div>
        </div>
      </BoxContent>
      <BoxFooter>
        <Button disabled={selector.loading} color="white" onClick={onCancel}>
          Cancelar
        </Button>
      </BoxFooter>
    </Box>
  );
}

PhaseTimeline.propTypes = {
  entity: PropTypes.object,
  selector: PropTypes.object,
  onSendToIn: PropTypes.func,
  onGenerateFactura: PropTypes.func,
  onSignIn: PropTypes.func,
  onLegalize: PropTypes.func,
  onSendCopy: PropTypes.func,
  onCancel: PropTypes.func,
};

export default PhaseTimeline;

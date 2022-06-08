/**
 *
 * PolizaData
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Box, BoxContent, BoxHeader } from 'components/Box';
import { FormGroup, Label } from 'components/ExForm';
import WithLoading from 'components/WithLoading';
import Button from 'components/Button';
import Alert from 'components/Alert';
import { getPolizaFields } from '../fields';
import { canUpdate, isEmpty } from './helper';
import GeneralReview from '../GeneralApprove/GeneralReview';
import model from '../model';

const SyncMessage = WithLoading();

function PolizaView({ action, selectorProject, selector, onEdit }) {
  const { project = {} } = selectorProject;
  const fields = getPolizaFields(model(project));
  return (
    <Box collapse>
      <BoxHeader>
        <b>PÓLIZAS</b>
        {canUpdate(project) && action !== 'view' && (
          <Button className="order-3 m-btn-pen" onClick={onEdit}>
            Editar
          </Button>
        )}
      </BoxHeader>
      <BoxContent>
        <SyncMessage {...selector} />
        {project && !isEmpty(project) && (
          <div className="row p-0 m-0 color-regular">
            {fields.map(({ label, name, view }) => (
              <FormGroup key={name} className="col-md-6 my-2">
                <Label className="pt-0" style={{ width: '13.5em' }}>
                  {name !== 'ComunaID' ? label : ''}
                </Label>
                <span className="font-14-rem ml-2">
                  {view || project[name]}
                </span>
              </FormGroup>
            ))}
          </div>
        )}
        {project && isEmpty(project) && (
          <Alert type="warning" className="mb-0">
            {`"Póliza" se está completando`}
          </Alert>
        )}
      </BoxContent>
      <GeneralReview dataType="poliza" />
    </Box>
  );
}

PolizaView.propTypes = {
  action: PropTypes.string,
  selectorProject: PropTypes.object,
  selector: PropTypes.object,
  onEdit: PropTypes.func,
};

export default PolizaView;

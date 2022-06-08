/**
 *
 * GeneralData
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Box, BoxContent, BoxHeader } from 'components/Box';
// eslint-disable-next-line no-unused-vars
import { FormGroup, Label, Field } from 'components/ExForm';
import WithLoading from 'components/WithLoading';
import Button from 'components/Button';
import {
  getGeneralFields,
  getPolizaFields,
  getMetasFields,
  getCuotasFields,
} from '../fields';
import GeneralReview from '../GeneralApprove/GeneralReview';
import model from '../model';

const SyncMessage = WithLoading();

function GeneralView({
  canEdit,
  selectorProject,
  selector,
  onEdit,
  isCollapse = true,
}) {
  const { project = {} } = selectorProject;
  const fields = getGeneralFields({ values: model(project) });
  const metasfields = getMetasFields(project);
  const cuotasfields = getCuotasFields(project);

  if (project.EntregaInmediata) {
    const polizafields = getPolizaFields(project);
    fields.push(...polizafields);
  }

  return (
    <>
      <Box collapse isOpen={isCollapse}>
        <BoxHeader>
          <b>DATOS GENERALES</b>
          {canEdit && (
            <Button className="order-3 m-btn-pen" onClick={onEdit}>
              Editar
            </Button>
          )}
        </BoxHeader>
        <BoxContent>
          <SyncMessage {...selector} />
          {project && (
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
              <div className="col-md-12 mt-3">
                <Label>Cláusulas del Proyecto</Label>
                <div className="btype shadow-sm mt-2">
                  <textarea
                    rows="5"
                    className="form-control form-control-sm"
                    readOnly
                    value={project.ProjectClauses || ''}
                  />
                </div>
              </div>
            </div>
          )}
        </BoxContent>
        <GeneralReview dataType="general" />
      </Box>

      <Box collapse>
        <BoxHeader>
          <b>METAS GENERALS</b>
        </BoxHeader>
        <BoxContent>
          <SyncMessage {...selector} />
          {project && (
            <div className="row p-0 m-0 color-regular">
              <div className="col-md-6">
                {cuotasfields.map(({ label, name, view }) => (
                  <FormGroup key={name} className="my-2">
                    <Label className="pt-0" style={{ width: '13.5em' }}>
                      {label}
                    </Label>
                    <span className="font-14-rem ml-2">
                      {view || project[name]}
                    </span>
                  </FormGroup>
                ))}
              </div>
              <div className="col-md-6">
                {metasfields.map(({ label, name, view }) => (
                  <FormGroup key={name} className="my-2">
                    <Label className="pt-0" style={{ width: '13.5em' }}>
                      {label}
                    </Label>
                    <span className="font-14-rem ml-2">
                      {view || project[name]}
                    </span>
                  </FormGroup>
                ))}
              </div>
            </div>
          )}
        </BoxContent>
        <GeneralReview dataType="general" />
      </Box>
    </>
  );
}

GeneralView.propTypes = {
  canEdit: PropTypes.bool,
  selectorProject: PropTypes.object,
  selector: PropTypes.object,
  onEdit: PropTypes.func,
  isCollapse: PropTypes.bool,
};

export default GeneralView;

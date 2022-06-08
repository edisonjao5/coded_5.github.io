/**
 *
 * Dashboard 
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Empty from 'components/Empty';
import { Auth } from 'containers/App/helpers';
import { UserProject } from 'containers/Project/helper';
import { Box } from 'components/Box';
import ActionItem from './ActionItem';
import { ActionModal } from './ActionModal';
import Button from 'components/Button';

export function ActionPending({ selector }) {
  const { entities = [] } = selector;
  const { PendingActions = [] } = selector;
  const [actionModal, setActionModal] = useState({ header: '', open: false, actions: {} });
  const [proyectoKey, setProyectoKey] = useState('none');
  const projects = entities ? entities.filter(entity => UserProject.in(entity)) : [];
  const User_Actions = PendingActions ?
    PendingActions.filter(
      entity => entity.ApprovedUserInfo.UserID === Auth.get('user').UserID
    ) : [];
  
  return (
    <div className="row">
      <div className="col-sm-6 col-xl-4">
        <h3 className="font-21 color-regular">Acciones Pendientes Propias</h3>
        <Box>
          {(User_Actions && (User_Actions.length < 1)) && (<Empty tag="h2" />)}
          {User_Actions && (User_Actions.length > 0) && (
            User_Actions.slice(0, 3).map((values, key) => (
              <ActionItem key={key} Action={values} />
            ))
          )}
          <div className="p-3 d-flex justify-content-end">
            <Button
              disabled = {!(User_Actions && (User_Actions.length > 0))}
              onClick={() => {
                setActionModal({
                  header: 'Propias',
                  actions: [...User_Actions],
                  open: true
                });
              }}
              className="font-14-rem m-btn m-btn-white d-block"
            >
              Ver Todo
            </Button>
          </div>
        </Box>
      </div>
      <div className="col-sm-6 col-xl-4">
        <h3 className="font-21 color-regular">Acciones Pendientes Globales</h3>
        <Box>
          {(PendingActions && (PendingActions.length < 1)) && (<Empty tag="h2" />)}
          {PendingActions && (PendingActions.length > 0) && (
            PendingActions.slice(0, 3).map((values, key) => (
              <ActionItem key={key} Action={values} />
            ))
          )}
          <div className="p-3 d-flex justify-content-end">
            <Button
              disabled = {!(PendingActions && (PendingActions.length > 0) )}
              onClick={() => {
                setActionModal({
                  header: 'Globales',
                  actions: [...PendingActions],
                  open: true
                });
              }}
              className="font-14-rem m-btn m-btn-white d-block"
            >
              Ver Todo
            </Button>
          </div>
        </Box>
      </div>
      <div className="col-sm-6 col-xl-4">
        <h3 className="font-21 color-regular">Acceso Directo a Proyectos</h3>
        <Box className="shadow-sm p-3">
          <div className="d-flex align-items-center justify-content-between">
            <div className="btype shadow-sm flex-fill icon icon-select-arrows right-icon">
              <select
                className="form-control form-control-sm"
                onChange={event => {
                  setProyectoKey(event.target.value);
                }}
              >
                <option value="none" disabled>Selecciona un Proyecto...</option>
                {projects && (
                  projects.map((project, index) => (
                    <option key={index} value={index}>{project.Name}</option>
                  ))
                )}
              </select>
            </div>
            <div className="ml-3">
              <Link
                disabled={(proyectoKey === 'none') ? true : false}
                to={(
                  proyectoKey !== 'none') ?
                  `/proyectos/${projects[proyectoKey].ProyectoID}/cotizaciones` : ''}
                onClick={e => ((proyectoKey === 'none') ? e.preventDefault() : '')}
                className="font-14-rem m-btn d-block text-center"
                style={{ minWidth: '3em' }}
              >
                Ir
              </Link>
            </div>
          </div>
          {(proyectoKey !== 'none') && (
            <dl className="mt-2 mb-0">
              <dt className="m-0 color-main font-14-rem" style={{ fontWeight: '600' }}>
                {projects[proyectoKey].ProyectoApprovalState}
              </dt>
              <dd className="m-0 font-14-rem">{projects[proyectoKey].Address}</dd>
              <dd className="m-0 font-14-rem">{projects[proyectoKey].Constructora}</dd>
            </dl>
          )}
        </Box>
        <h3 className="font-21 color-regular mt-3">Acceso Directo a Reportes</h3>
        <Box className="shadow-sm p-3">
          <div className="d-flex align-items-center justify-content-between">
            <div className="btype shadow-sm flex-fill icon icon-select-arrows right-icon">
              <select className="form-control form-control-sm">
                <option value="" hidden="" disabled>Selecciona un Proyecto...</option>
                {/* <option>Carlos Alfonso Cofre Veloz</option> */}
              </select>
            </div>
            <div className="ml-3">
              <a href="#" className="font-14-rem m-btn d-block text-center" style={{ minWidth: '3em' }}>Ir</a>
            </div>
          </div>
        </Box>
      </div>
      <ActionModal
        actionModal={actionModal}
        onHide={() => setActionModal({ open: false })}
      />
    </div>
  );
}

ActionPending.propTypes = {
  selector: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

export default ActionPending;

/*
 * ProjectPage
 *
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Tab from 'components/Tab';
import { Box, BoxContent, BoxHeader } from 'components/Box';
import Marketing from './Marketing/Loadable';
import Legal from './Legal/Loadable';
import Finance from './Finance/Loadable';
import GeneralReview from '../GeneralApprove/GeneralReview';
import Notification from './Notification';

export default function Documents({ project = {}, action, user }) {
  if(project && !project.EntregaInmediata && project.Documentos)
    delete project.Documentos['title_folder'];

  return (
    <Box collapse>
      <BoxHeader>
        <b>DOCUMENTOS</b>
      </BoxHeader>
      <BoxContent>
        <div className="row m-0 p-0">
          <div className="col-md-6 p-0 pb-2 border-bottom">
            <span className="font-16-rem color-regular">
              <strong>Carga de Documentos</strong>
            </span>
          </div>
        </div>
        <Tab
          tabs={[
            {
              label: 'MARKETING',
              content: <Marketing project={project} action={action} />,
            },
            {
              label: 'LEGAL',
              content: <Legal project={project} action={action} />,
            },
            {
              label: 'FINANZAS',
              content: <Finance project={project} action={action} />,
            },
          ]}
          activeTab = {user || 0}
        />
      </BoxContent>
      <GeneralReview dataType="document" />
      <Notification />
    </Box>
  );
}

Documents.propTypes = {
  project: PropTypes.object,
  action: PropTypes.string,
};

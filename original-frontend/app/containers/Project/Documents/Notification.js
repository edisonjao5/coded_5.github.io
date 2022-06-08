import React from 'react';
import PropTypes from 'prop-types';
import Alert from 'components/Alert';

import { BoxFooter } from 'components/Box';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getDocuments } from './Legal/documents';
import marketingDocuments from './Marketing/documents';
import { canConfirmDocument } from '../helper';
import makeSelectInitProject from '../Init/selectors';
import makeSelectFinance from './Finance/selectors';

const Notification = ({ selectorProject, selectorFinance }) => {
  const { project = {} } = selectorProject;
  const legalDocuments = getDocuments(project.EntregaInmediata);
  const { Documentos = {} } = project;
  const finance = selectorFinance.entity || {};
  const canConfirm = canConfirmDocument(project);
  let notificationMessage = null;

  const hasToConfirmMarketingDocument = Object.keys(Documentos).find(
    document =>
      marketingDocuments.map(doc => doc.documentoType).includes(document) &&
      Documentos[document] &&
      Documentos[document].state === 'to_confirm',
  );
  const hasToConfirmLegalDocument = Object.keys(Documentos).find(
    document =>
      legalDocuments.map(doc => doc.documentoType).includes(document) &&
      Documentos[document] &&
      Documentos[document].state === 'to_confirm',
  );
  const hasToConfirmFinanza = finance.State === 'to_confirm';

  const hasRejectDocument =
    Object.keys(Documentos).find(
      document =>
        Documentos[document] && Documentos[document].state === 'rejected',
    ) || finance.State === 'rejected';

  if (canConfirm && hasRejectDocument)
    notificationMessage = (
      <Alert type="danger">
        {`Debes revisar todos los documentos se encuentren correctos`}
      </Alert>
    );

  if (
    canConfirm &&
    (hasToConfirmMarketingDocument ||
      hasToConfirmLegalDocument ||
      hasToConfirmFinanza)
  )
    notificationMessage = (
      <Alert type="danger">
        Hay documentos aún sin revisar en la pestaña{' '}
        {hasToConfirmMarketingDocument ? '"Marketing" ' : ''}{' '}
        {hasToConfirmLegalDocument ? '"Legal" ' : ''}{' '}
        {hasToConfirmFinanza ? '"Finanza" ' : ''}
      </Alert>
    );

  if (notificationMessage) return <BoxFooter>{notificationMessage}</BoxFooter>;

  return null;
};
Notification.propTypes = {
  selectorProject: PropTypes.object,
  selectorFinance: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  selectorProject: makeSelectInitProject(),
  selectorFinance: makeSelectFinance(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Notification);

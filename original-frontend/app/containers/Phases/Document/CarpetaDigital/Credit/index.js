/**
 *
 * Project
 *
 */
import React from 'react';

import PropTypes from 'prop-types';
import { List } from 'components/List';
import { getDocuments } from '../../documents';
import DocumentItem from '../../DocumentItem';

export function Credit({ entity, canUpload, canReview, onReview }) {
  const documents = getDocuments(entity);
  // skip the first document 'Transferencia/DocumentPagoGarantia'
  return (
    <List>
      {documents
        .filter((item, index) => (
          index > 0 &&
          (item.documentoType === "DocumentSimulador" || !item.autoGenerate) &&
          !item.offerta))
        .map((document, index) => (
          <DocumentItem
            key={document.documentoType}
            {...document}
            required={
              document.required ||
              (document.documentoType === 'DocumentCertificadoMatrimonio' &&
                entity.Cliente.CivilStatus === 'Casado(a)')
            }
            Documentos={entity.DocumentNew? {} : entity.Documents || {}}
            className={index > 0 ? 'border-top' : ''}
            canUpload={canUpload}
            canReview={canReview}
            onReview={onReview}
            entity={entity}
          />
        ))}
    </List>
  );
}

Credit.propTypes = {
  canUpload: PropTypes.bool,
  canReview: PropTypes.bool,
  entity: PropTypes.object,
  onReview: PropTypes.func,
};

export default Credit;

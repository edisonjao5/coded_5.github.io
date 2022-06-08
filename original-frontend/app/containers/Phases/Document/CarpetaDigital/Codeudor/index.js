/**
 *
 * Project
 *
 */
import React from 'react';

import PropTypes from 'prop-types';
import { List } from 'components/List';
import { CodeudorDocuments } from '../../documents';
import DocumentItem from '../../DocumentItem';

export function Codeudor({ entity, canUpload, canReview, onReview }) {
  const documents = CodeudorDocuments(entity);
  // skip the first document 'Transferencia/DocumentPagoGarantia'
  return (
    <List>
      {documents.map((document, index) => (
          <DocumentItem
            key={document.documentoType}
            {...document}
            required={document.required}
            Documentos={entity.Documents || {}}
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

Codeudor.propTypes = {
  canUpload: PropTypes.bool,
  canReview: PropTypes.bool,
  entity: PropTypes.object,
  onReview: PropTypes.func,
};

export default Codeudor;

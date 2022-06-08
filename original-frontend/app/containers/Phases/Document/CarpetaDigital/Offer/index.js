/**
 *
 * Project
 *
 */
import React from 'react';

import PropTypes from 'prop-types';
import { isContadoPayment } from 'containers/App/helpers';
import { List } from 'components/List';
import DocumentItem from '../../DocumentItem';
import { getDocuments } from '../../documents';

export function Offer({ entity, canUpload, canReview, onReview }) {
  const documents = getDocuments(entity);
  const isContado = isContadoPayment(entity.PayType);

  const filterFlag = (item) => (isContado || item.offerta);

  return (
    <List>
      {documents
        .filter((item, index) => (index > 0 && filterFlag(item)))
        .map((document, index) => (
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

Offer.propTypes = {
  canUpload: PropTypes.bool,
  canReview: PropTypes.bool,
  entity: PropTypes.object,
  onReview: PropTypes.func,
};

export default Offer;

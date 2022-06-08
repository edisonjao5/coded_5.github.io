/**
 *
 * Project
 *
 */
import React from 'react';
import PropTypes from 'prop-types';

import { List } from 'components/List';
import DocumentItem from '../../DocumentItem';
import { getDocuments } from '../../documents';

export function Historico({ entity }) {
  const documents = getDocuments(entity);

  return (
    <List>
      {documents
        .filter((item, index) => (index > 0))
        .map((document, index) => (
          <DocumentItem
            key={document.documentoType}
            {...document}
            Documentos={entity.OldDocuments || entity.Documents || {}}
            className={index > 0 ? 'border-top' : ''}
            entity={entity}
          />
      ))}
    </List>
  );
}

Historico.propTypes = {
  entity: PropTypes.object,
};

export default Historico;

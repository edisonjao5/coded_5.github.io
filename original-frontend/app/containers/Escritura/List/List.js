/**
 *
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'components/Box';
import Empty from 'components/Empty';
import Item from './Item';
import Thead from 'components/Table/Thead';

const List = ({ project, escrituras, query, onQuery, dispatch }) => (
  <Box className="mt-3 b-3">
    {escrituras && escrituras.length < 1 && <Empty tag="h2" />}
    {escrituras && escrituras.length > 0 && (
      <table className="table table-responsive-sm table-fixed table-sm border-bottom">
        <Thead
          ths={[
            { field: 'EscrituraID', label: 'Escritura', sortable: true },
            { field: 'Inmuebles', label: 'Inmuebles', className: "pl-3" },
            { field: 'Cliente', label: 'Cliente', sortable: true },
            { field: 'EscrituraState', label: 'EscrituraState', className: "text-right", sortable: true },
            // { field: '', label: '' },
          ]}
          onQuery={onQuery}
          query={query}
        />
        <tbody>
          {escrituras.map(escritura => (
            <Item
              key={escritura.EscrituraID}
              escritura={escritura}
              project={project}
              dispatch={dispatch}
            />
          ))}
        </tbody>
      </table>
    )}
  </Box>
);

List.propTypes = {
  escrituras: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  project: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  dispatch: PropTypes.func,
};
export default List;

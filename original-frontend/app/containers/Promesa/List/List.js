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

const List = ({ project, promesas, query, onQuery, dispatch }) => (
  <Box className="mt-3 b-3">
    {promesas && promesas.length < 1 && <Empty tag="h2" />}
    {promesas && promesas.length > 0 && (
      <table className="table table-responsive-sm table-fixed table-sm border-bottom">
        <Thead
          ths={[
            { field: 'PromesaID', label: 'Promesa', sortable: true },
            { field: 'Inmuebles', label: 'Inmuebles', className: "pl-3" },
            { field: 'Cliente', label: 'Cliente', sortable: true },
            { field: 'Date', label: 'Fecha', sortable: true },
            { field: 'PromesaState', label: 'PromesaState', className: "text-right", sortable: true },
            { field: '', label: '' },
            { field: '', label: '' },
          ]}
          onQuery={onQuery}
          query={query}
        />
        <tbody>
          {promesas.map(promesa => (
            <Item
              key={promesa.PromesaID}
              promesa={promesa}
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
  promesas: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  project: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  dispatch: PropTypes.func,
};
export default List;

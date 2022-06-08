/**
 *
 * Quotation List
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'components/Box';
import Thead from 'components/Table/Thead';
import Empty from 'components/Empty';
import Alert from 'components/Alert';
import Item from './Item';
import { requiredData } from './helper';
import { searchQuotations, queryQuotations } from './actions';
import Filter from './Filter';

const List = ({
  quotations,
  query,
  filter,
  reports,
  project,
  reservations,
  dispatch,
}) => (
  <div>
    {!requiredData(project) && (
      <Filter
        reports={reports}
        project={project}
        filter={filter}
        searchQuotations={txtSearch => dispatch(searchQuotations(txtSearch))}
      />
    )}
    {requiredData(project) && (
      <Alert type="danger" className="mb-0">
        {`Faltan datos del proyecto. Para poder Cotizar deben completar los datos del proyecto: ${requiredData(
          project,
        )}`}
      </Alert>
    )}
    <Box className="mt-3 pb-3">
      {quotations && quotations.length < 1 && <Empty tag="h2" />}
      {quotations && quotations.length > 0 && (
        <table className="table table-responsive-sm table-fixed table-sm border-bottom">
          <Thead
            ths={[
              { field: 'CotizacionID', label: 'Cotizacion', sortable: true },
              { field: 'Inmuebles', label: 'Inmuebles', className: 'pl-3' },
              { field: 'Cliente', label: 'Cliente', sortable: true },
              { field: 'Date', label: 'Fecha', sortable: true },
              {
                field: 'CotizacionState',
                label: 'Estado',
                colSpan: 2,
                className: 'pl-6',
                sortable: true,
              },
              { field: '', label: '' },
            ]}
            onQuery={query => dispatch(queryQuotations(query))}
            query={query}
          />
          <tbody>
            {quotations.map(item => (
              <Item
                key={item.CotizacionID}
                quotation={item}
                reservation={(reservations || []).find(
                  reservation => item.Folio === reservation.Folio,
                )}
                dispatch={dispatch}
              />
            ))}
          </tbody>
        </table>
      )}
    </Box>
  </div>
);

List.propTypes = {
  filter: PropTypes.object,
  reports: PropTypes.object,
  quotations: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  project: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  dispatch: PropTypes.func,
};
export default List;

/**
 *
 * Log
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import Table from 'reactstrap/es/Table';
import Thead from 'components/Table/Thead';
import WithLoading from 'components/WithLoading';
import makeSelectProjectLog from './selectors';
import reducer from './reducer';
import saga from './saga';
import { fetchLogs, queryLogs } from './actions';

const SyncMessage = WithLoading();

function ProjectLog({ UserID, selector, dispatch }) {
  useInjectReducer({ key: 'projectLog', reducer });
  useInjectSaga({ key: 'projectLog', saga });

  useEffect(() => {
    if (UserID) dispatch(fetchLogs(UserID));
  }, [UserID]);

  const { logs, loading } = selector;

  return (
    <>
      <div className="d-flex align-items-end justify-content-between">
        <h4 className="font-18 color-regular mt-4">
          <b>Historial de ventas</b>
        </h4>
      </div>
      <SyncMessage {...selector} />
      {logs && !loading && (
        <div className="mt-3 table-responsive-md background-color-white rounded shadow-sm py-3">
          <Table className="m-0" size="sm">
            <Thead
              ths={[
                {
                  field: 'VentaLogTypel',
                  label: 'Tipo de Entrada',
                  sortable: true,
                },
                { field: 'ClienteName', label: 'Nombre', sortable: true },
                {
                  field: 'ClienteLastNames',
                  label: 'Apellido',
                  sortable: true,
                },
                { field: 'ClienteRut', label: 'RUT', sortable: true },
                { field: 'Date', label: 'Fecha', sortable: true },
                { field: 'Comment', label: 'Comentarios' },
              ]}
              onQuery={query => dispatch(queryLogs(query))}
            />
            <tbody>
              {logs.map((log, index) => (
                /* eslint-disable-next-line */
                <tr key={index}>
                  <td className="pl-3 no-whitespace">
                    <span className="font-14-rem color-regular">
                      {log.VentaLogTypel}
                    </span>
                  </td>
                  <td className="no-whitespace">
                    <span className="font-14-rem">{log.ClienteName}</span>
                  </td>
                  <td className="no-whitespace">
                    <span className="font-14-rem">{log.ClienteLastNames}</span>
                  </td>
                  <td className="no-whitespace">
                    <span className="font-14-rem">{log.ClienteRut}</span>
                  </td>
                  <td className="no-whitespace">
                    <span className="font-14-rem">{log.Date}</span>
                  </td>
                  <td className="no-whitespace">
                    <span className="font-14-rem">{log.Comment}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </>
  );
}

ProjectLog.propTypes = {
  UserID: PropTypes.string,
  selector: PropTypes.object,
  dispatch: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  selector: makeSelectProjectLog(),
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

export default compose(withConnect)(ProjectLog);

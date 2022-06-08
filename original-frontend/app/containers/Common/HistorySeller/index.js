/**
 *
 * History
 *
 */

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import Table from 'reactstrap/es/Table';
import Thead from 'components/Table/Thead';
import WithLoading from 'components/WithLoading';
import makeSelectHistorySeller from './selectors';
import reducer from './reducer';
import saga from './saga';
import { fetchHistories, queryHistories } from './actions';

const SyncMessage = WithLoading();

function HistorySeller({ UserID, selector, dispatch }) {
  useInjectReducer({ key: 'historySeller', reducer });
  useInjectSaga({ key: 'historySeller', saga });

  useEffect(() => {
    if (UserID) dispatch(fetchHistories(UserID));
  }, [UserID]);

  const { histories, loading } = selector;

  return (
    <>
      <div className="d-flex align-items-end justify-content-between">
        <h4 className="font-18 color-regular mt-4">
          <b>Historial de ventas</b>
        </h4>
      </div>
      <SyncMessage {...selector} />
      {histories && !loading && (
        <div className="mt-3 table-responsive-md background-color-white rounded shadow-sm py-3">
          <Table className="m-0" size="sm">
            <Thead
              ths={[
                {
                  field: 'Project',
                  label: 'Proyecto',
                  sortable: true,
                },
                { field: 'ClienteName', label: 'Etapa ', sortable: true },
                { field: 'ClienteName', label: 'Creado por', sortable: true },
                { field: 'Date', label: 'Fecha', sortable: true },
                { field: 'ClienteRut', label: 'Ver', sortable: false },
              ]}
              onQuery={(query) => dispatch(queryHistories(query))}
            />
            <tbody>
              {histories.map((history, index) => (
                /* eslint-disable-next-line */
                <tr key={index}>
                  <td className="pl-3 no-whitespace">
                    <span className="font-14-rem color-regular">
                      {history.Folio}
                    </span>
                  </td>
                  <td className="no-whitespace">
                    <span className="font-14-rem">{history.dis_state}</span>
                  </td>
                  <td className="no-whitespace">
                    <span className="font-14-rem">
                      {history.VentaLogType}
                    </span>
                  </td>
                  <td className="no-whitespace">
                    <span className="font-14-rem">{history.Date}</span>
                  </td>
                  <td className="no-whitespace">
                    <span className="font-14-rem">
                    <a
                      className="font-14-rem color-main btn-arrow mt-2"
                      href={(history.state=="Cotizacion") ?
                        `/proyectos/${history.ProyectoID}/${history.state}/${history.VentaID}`:
                        `/proyectos/${history.ProyectoID}/${history.state}?${history.state}ID=${history.VentaID}`
                      }
                    >
                      <b>Ver</b>
                    </a>
                    </span>
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

HistorySeller.propTypes = {
  UserID: PropTypes.string,
  selector: PropTypes.object,
  dispatch: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  selector: makeSelectHistorySeller(),
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

export default compose(withConnect)(HistorySeller);

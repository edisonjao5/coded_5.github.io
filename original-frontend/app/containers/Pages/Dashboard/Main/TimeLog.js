/**
 *
 * Time Log Items
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import moment from 'components/moment';
import Empty from 'components/Empty';

export function TimeLog({ Logs }) {
  return (

    <div className="col-md-4">
      <div className="mt-4">
        <h3 className="font-21 color-regular">Timeline</h3>
        <div className="background-color-white rounded-lg shadow-sm mt-3 px-2 py-3">
          <div className="list-continue-line line-gray mt-2">
            <ol style={{ maxHeight: 533, overflow: 'auto' }}>

            {(Logs && Logs.length < 1) && (<Empty tag="h2" />)}
              {Logs && Logs.length>0 && (
                Logs.map(log => {
                  const dateAgo = moment.utc(log.Date).fromNow('day');
                  return (
                    <li key={log.VentaLogID}>
                      <span className="number time success">
                        <i className="icon icon-time"></i>
                      </span>
                      <div className="content flex-grow-1 mr-2">
                        <div className="d-flex align-items-center">
                          <span className="font-14-rem color-regular" style={{ fontWeight: '600' }}>
                            {dateAgo}: {log.User.Name} {log.User.LastNames} / {log.User.Roles[0].Name}
                          </span>
                        </div>
                        <span className="d-block font-14-rem">{log.VentaLogType} Proyecto {log.Folio}</span>
                        <span className="d-block font-14-rem">{moment(log.Date).format('DD MMM YYYY')}</span>
                      </div>
                    </li>
                  )
                })
              )}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

TimeLog.propTypes = {
  Logs: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
};

export default TimeLog;

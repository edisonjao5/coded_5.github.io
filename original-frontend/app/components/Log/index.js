/**
 *
 * Log
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { userFullname } from 'containers/Common/User/helper';
import { Box, BoxContent, BoxHeader } from 'components/Box';
import moment from 'components/moment';
const logLabel = logType => {
  switch (logType) {
    case 'AC Aprobacion maqueta':
      return 'Aprobacion maqueta';
    default:
      return logType;
  }
};

const Log = ({ logs, logTypes = [], limit = 0 }) => {
  let showLogs =
    logTypes.length > 0
      ? logs.filter(log => logTypes.includes(log.VentaLogType) && log.Comment !=="")
      : logs.filter(log => !log.CommentBySystem && log.Comment !=="");
  console.log(showLogs, "show logs");
  if (limit) showLogs = showLogs.slice(0, limit);

  if (showLogs.length > 0) {
    return (
      <Box collapse isOpen={false}>
        <BoxHeader className="background-color-warning">Comentarios</BoxHeader>
        <BoxContent
          className="background-color-warning"
          style={{ maxHeight: 300, overflow: 'auto' }}
        >
          {showLogs.map(log => (
            <div key={log.VentaLogID} className="p-3 border-bottom">
              <div className="font-14-rem pb-2">
                <span className="badge badge-info">
                   {log.User.Roles[0].Name}
                </span>{' '}
                <span className="badge badge-light">
                  {moment(log.Date).local().format('DD MMM YYYY HH:mm:ss')}
                </span>
              </div>
              <div style={{ whiteSpace: 'pre-line' }}>{log.Comment}</div>
            </div>
          ))}
        </BoxContent>
      </Box>
    );
  }
  return null;
};

Log.propTypes = {
  logs: PropTypes.array,
  logTypes: PropTypes.array,
  limit: PropTypes.number,
};

export default Log;

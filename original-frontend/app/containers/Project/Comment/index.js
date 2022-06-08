/**
 *
 * Comment
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import makeSelectProjectLog from 'containers/Common/ProjectLog/selectors';
import { Box, BoxContent, BoxHeader } from 'components/Box';
import { PROYECTO_LOG_TYPE } from 'containers/App/constants';
import GeneralReview from '../GeneralApprove/GeneralReview';

export function Comment({ project, projectLog }) {
  const { UsersProyecto = [] } = project;
  const logs = (projectLog.logs || [])
    .filter(
      log =>
        log.Comment &&
        (log.ProyectoLogType === PROYECTO_LOG_TYPE[1] ||
          log.ProyectoLogType === PROYECTO_LOG_TYPE[10]),
    )
    .map(log => ({
      ...log,
      UserProyecto: UsersProyecto.find(user => user.Rut === log.UserRut),
    }));
  if (logs.length < 1) return null;
  return (
    <Box collapse>
      <BoxHeader>
        <b>OBSERVACIONES</b>
      </BoxHeader>
      <BoxContent>
        {logs.map(log => (
          <React.Fragment key={log.ProyectoLogID}>
            <span className="title font-16-rem">
              <b>
                {log.UserProyecto
                  ? `${log.UserProyecto.UserProyectoType}: `
                  : ''}{' '}
                {log.UserName} {log.UserLastNames}
              </b>
            </span>
            <p className="font-14-rem color-regular mt-2">{log.Comment}</p>
          </React.Fragment>
        ))}
      </BoxContent>
      <GeneralReview dataType="comment" />
    </Box>
  );
}

Comment.propTypes = {
  project: PropTypes.object,
  projectLog: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  projectLog: makeSelectProjectLog(),
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

export default compose(withConnect)(Comment);

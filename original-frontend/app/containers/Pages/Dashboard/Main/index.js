/**
 *
 * Dashboard 
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { ProjectMeta } from 'containers/Common/ProjectMeta';
import ControlUsers from './ControlUser';
import TimeLog from './TimeLog';
import DoGlobal from './DocumentGlobal';

export function MainContent({ selector, onQuery }) {
  const { ControlUser, Counter, Logs, origin_ControlModalUser, query = {}, entities = [] } = selector;
  return (
    <div className="row">
      <div className="mt-4 col-md-8">
        <ControlUsers 
          ControlUserItems={ControlUser} 
          originControlUser={origin_ControlModalUser} 
          query={query} 
          onQuery={onQuery} 
        />
        <div className="mt-3">
          {entities && (<ProjectMeta entities={entities} />)}
        </div>
        <DoGlobal counter={Counter} />
      </div>
      <TimeLog Logs={Logs} />
    </div>
  );
}

MainContent.propTypes = {
  selector: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

export default MainContent;

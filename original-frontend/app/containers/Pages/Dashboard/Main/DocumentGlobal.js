/**
 *
 * ProjectMeta
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

export function DoGlobal(Count) {
  const { counter } = Count;
  return (
    <div className="mt-4">
      <h3 className="font-21 color-regular">Documentos Globales</h3>
      <div className="background-color-tab rounded-lg shadow-sm mt-3 p-3">
        <div className="row no-gutters">
          {(counter && (counter.length>0)) && (
            counter.map((value, index) => (
              <div key={index} className="col ml-3 d-flex flex-column justify-content-start font-14-rem">
                <div className="">
                  <span className="font-16-rem" style={{ color: '#6c7074' }}>{value[0]}</span>
                  <span className="d-block my-1 badge badge-secondary text-center px-2 font-14" style={{ maxWidth: '5.4em' }}>{value[1].total}</span>
                  <span className="color-warning no-whitespace d-block">Pendientes: {value[1].Pending}</span>
                  <span style={{ color: '#6c7074' }}>Completas: <label className="badge badge-secondary font-14">{value[1].total - value[1].Pending}</label></span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

DoGlobal.propTypes = {
  Count: PropTypes.oneOfType([PropTypes.object, PropTypes.bool])
};

export default DoGlobal;
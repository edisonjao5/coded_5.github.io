/**
 *
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

const Form = ({ project, quotation }) => (
  <div>
    <h4 className="font-21">{project.Name}</h4>
    <h5 className="mb-3 font-16 d-flex align-items-center justify-content-between">
      <span className="line-height-1">Nueva Cotización</span>

      <span className="font-14 line-height-1">
        <b>
          FOLIO : {project.Name} / {quotation ? quotation.Folio : '___'}
        </b>
      </span>
    </h5>
  </div>
);

Form.propTypes = {
  quotation: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  project: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
};
export default Form;

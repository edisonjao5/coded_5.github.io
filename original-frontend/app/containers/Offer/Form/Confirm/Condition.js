import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ExField from 'components/ExForm/ExField';
import Button from 'components/Button';

function Condition({ className, condition, onChange, onRemove }) {
  return (
    <div class="d-flex mt-3">
      <div class="flex-fill caution">
        <div class="btype shadow-sm  caution">
          <textarea required 
            className="form-control form-control-sm caution" 
            value={condition.Description}
            onChange={(evt) => onChange(evt.currentTarget.value)}
          />
        </div>
      </div>
      <div 
        role="presentation" 
        className="font-21 color-main background-color-transparent ml-2 pl-2 pointer"
        onClick={onRemove}
      >
        <strong> - </strong>
      </div>
    </div>    
  );
}

Condition.propTypes = {
  className: PropTypes.string,
  condition: PropTypes.object,
  onChange: PropTypes.func,
  onRemove: PropTypes.func,
};

export default Condition;

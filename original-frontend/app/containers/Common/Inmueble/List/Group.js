/**
 *
 * InmuebleItem
 *
 */
import React, { useState } from 'react';

import PropTypes from 'prop-types';
import { Collapse } from 'reactstrap';

function GroupItems({ label, children }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="card">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="btn btn-link collapsed"
      >
        {label}
      </button>
      <Collapse isOpen={isOpen}>{children}</Collapse>
    </div>
  );
}

GroupItems.propTypes = {
  label: PropTypes.string,
  children: PropTypes.node,
};

export default GroupItems;

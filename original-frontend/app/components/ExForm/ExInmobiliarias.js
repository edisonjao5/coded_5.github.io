/**
 *
 * ConstructionsElement
 *
 */

import React from 'react';
import ExConstructoras from './ExConstructoras';

const ExInmobiliarias = props => (
  <ExConstructoras query={{ type: 'inmobiliaria' }} {...props} />
);

ExConstructoras.propTypes = {};

export default ExInmobiliarias;

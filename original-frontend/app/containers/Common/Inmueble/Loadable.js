/**
 *
 * Asynchronously loads the component for Inmueble
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));

/**
 *
 * Asynchronously loads the component for Reservation
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));

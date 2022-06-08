/**
 *
 * Asynchronously loads the component for Cheque
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));

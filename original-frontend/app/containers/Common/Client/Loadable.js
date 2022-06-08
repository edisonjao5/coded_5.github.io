/**
 *
 * Asynchronously loads the component for Client
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));

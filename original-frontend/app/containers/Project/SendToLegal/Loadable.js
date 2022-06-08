/**
 *
 * Asynchronously loads the component for SendToLegal
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));

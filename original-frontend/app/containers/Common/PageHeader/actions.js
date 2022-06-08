/*
 *
 * PageHeader actions
 *
 */

import { SET_PAGE_HEADER } from './constants';

export function setPageHeader({ header, actions }) {
  return {
    type: SET_PAGE_HEADER,
    header,
    actions,
  };
}

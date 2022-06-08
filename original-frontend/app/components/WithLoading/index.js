/**
 *
 * WithLoading
 *
 */

import React from 'react';
import jsonMarkup from 'json-markup';
import isString from 'lodash/isString';

import Loading from './Loading';
import Alert from '../Alert';

function WithLoading(Component) {
  return function WihLoadingComponent(props) {
    /* eslint-disable-next-line */
    const {loading, error, success, shouldShow=true, timeout=5000} = props;
    let errors;
    if (error) {
      if (error.body) {
        const { body } = error;
        if (!isString(body)) {
          errors = jsonMarkup(body);
          errors = errors.replace(/[{,},[,\]]/g, '');
        } else {
          errors = body;
        }
      } else {
        errors = error.message || 'Error';
      }
    }
    if (loading) return <Loading />;
    return (
      <>
        {errors && (
          <Alert type="danger">
            <span dangerouslySetInnerHTML={{ __html: errors }} />
          </Alert>
        )}
        {success && !errors && (
          <Alert type="success" timeout={timeout}>
            {success}
          </Alert>
        )}
        {Component && shouldShow && <Component {...props} />}
      </>
    );
  };
}

export default WithLoading;

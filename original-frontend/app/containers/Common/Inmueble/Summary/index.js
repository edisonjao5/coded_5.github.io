import React from 'react';
import PropTypes from 'prop-types';
import { FormattedNumber } from 'react-intl';
import { inmuebleLabel } from '../helper';
const Summary = ({ selector }) => {
  const { selected } = selector;
  const total = selected.reduce((acc, item) => acc + item.Price, 0);
  if (selected.length > 0)
    return (
      <div className="summary">
        <h4 className="col-12">Items Seleccionados</h4>
        <table className="table table-responsive">
          <tbody>
            {selected.map(entity => (
              <tr key={entity.InmuebleID}>
                <td className="key">{inmuebleLabel(entity)}</td>
                <td className="value">
                  <div>
                    <span>Valor UF</span>
                    <span>
                      <FormattedNumber value={entity.Price} />
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td className="key" />
              <td className="value">
                <div>
                  <span>Valor Final UF</span>
                  <span>
                    <FormattedNumber value={total} />
                  </span>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  return null;
};
Summary.propTypes = {
  selector: PropTypes.object,
};
export default Summary;

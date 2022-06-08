/**
 *
 * Project
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Label } from 'components/ExForm';
// import CommonInmueble from 'containers/Common/Inmueble';
import { Auth } from 'containers/App/helpers';
import InmuebleReview from './Review';

function Inmuebles({
  selectorInmueble,
  selector,
  toggleScreen,
  onImportFile,
  onSaveInmuebles,
  // canEdit,
}) {
  // const [isOpen, setIsOpen] = useState(false);
  const { project = {} } = window;

  return (
    <>
      <Label style={{ width: '10em' }}>Detalle Inmuebles</Label>
      {selectorInmueble.entities && selectorInmueble.entities.length > 0 && (
        <>
          <Link
            className="font-14-rem color-main btn-arrow mt-2"
            to={`/proyectos/${project.ProyectoID}/inmuebles`}
          >
            <b>Ver Detalle Inmuebles</b>
          </Link>
          {/* <Link
            className="font-14-rem color-main btn-arrow mt-2"
            to="/"
            onClick={evt => {
              evt.preventDefault();
              setIsOpen(true);
            }}
          >
            <b>Ver Detalle Inmuebles</b>
          </Link>
          <CommonInmueble
            defaultShowType="grid"
            isOpen={isOpen}
            onHide={() => setIsOpen(false)}
            canEdit={canEdit}
            drafSelector={selector}
            onImportFile={onImportFile}
            onSave={onSaveInmuebles}
          /> */}
        </>
      )}
      {selectorInmueble.entities.length < 1 && (
        <>
          <div
            className="custom-file custom-input-file order-3 "
            title="Examinar..."
            style={{ width: '16em' }}
          >
            <input
              name="File"
              required=""
              placeholder="Examinar..."
              accept=".csv,.xls,.xlsx"
              className="custom-file-input"
              type="file"
              onChange={event => {
                const data = new FormData();
                data.append('File', event.currentTarget.files[0]);
                event.currentTarget.value = '';
                onImportFile(data);
              }}
              disabled={!Auth.isPM()}
            />
            {/* eslint-disable-next-line */}
            <label
              className="custom-file-label font-14-rem shadow-sm text-nowrap overflow-hidden"
              style={{ textOverflow: 'ellipsis' }}
            >
              <b>Examinar...</b>
            </label>
          </div>
          <span className="font-14-rem italic-gray mt-2 ml-2 order-3">
            Formato Excel
          </span>
          <InmuebleReview
            selector={selector}
            onHide={() => toggleScreen('view')}
            onSave={onSaveInmuebles}
          />
        </>
      )}
    </>
  );
}

Inmuebles.propTypes = {
  selectorInmueble: PropTypes.object,
  selector: PropTypes.object,
  toggleScreen: PropTypes.func,
  onImportFile: PropTypes.func,
  onSaveInmuebles: PropTypes.func,
};

export default Inmuebles;

/**
 *
 * Reservation Upload Form
 *
 */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// import moment from 'components/moment';
import { FieldArray } from 'formik';
import { Box, BoxContent, BoxHeader, BoxFooter } from 'components/Box';
import Button from 'components/Button';
import WithLoading from 'components/WithLoading';
import {
  Form as ExForm,
  FormGroup,
  Label,
  Field as ExField,
} from 'components/ExForm';
import { getPromesa } from 'containers/Project/helper';
import Checkbox from 'components/ExForm/Checkbox';
import DocumentItem from './DocumentItem';

const SyncMassage = WithLoading();

export function PhaseConfeccionPromesa({
  canUpload,
  selector,
  entity,
  onSubmit,
  onReject,
  onCancel,
}) {
  const { maquetaWord, maquetaPdf, maquetaName } = getPromesa(entity);
  const [withText, setWithText] = useState({ text: '', open: false });
  const [canSubmit, setCanSubmit] = useState(false);
  const [init, setInit] = useState(true);
  const nameArray = maquetaWord.url.split("/");
  const fileName = nameArray[nameArray.length - 1];
  
  return (
    <ExForm
      initialValues={{
        ...entity,
        HasDesistimientoEspecial: !!entity.DesistimientoEspecial,
        HasMetodoComunicacionEscrituracion: !!entity.MetodoComunicacionEscrituracion,
      }}
      onSubmit={values => {
        setInit(true);
        onSubmit({
          ...values,
          DesistimientoEspecial: values.HasDesistimientoEspecial
            ? values.DesistimientoEspecial
            : '',
          MetodoComunicacionEscrituracion: values.HasMetodoComunicacionEscrituracion
            ? values.MetodoComunicacionEscrituracion
            : '',
        })
      }}
    >
      {form => {
        const { values } = form;
        useEffect(() => {
          if (init && canSubmit) {
            setCanSubmit(false);
            return;
          }
          if (init) setInit(false);
          else setCanSubmit(true);
        }, [values]);

        useEffect(() => {
          setInit(true)
        }, []);

        return (
          <>
            <Box>
              <BoxHeader>
                <b>Confección de Promesa</b>
              </BoxHeader>
              <BoxContent>
                {canUpload && (
                  <div className="row m-0 p-0">
                    <div className="col-lg-12 border-bottom p-0 pb-3 d-flex align-items-center">
                      <a
                        className="m-btn m-btn-white m-btn-download mr-3"
                        href={maquetaWord.url}
                        target="_blank"
                        download
                      >
                        Descargar {maquetaName}
                      </a>
                      {fileName}
                    </div>
                  </div>
                )}
                <div className="pt-4 pb-4 border-bottom">
                  <FormGroup className="align-items-center">
                    <Label className="mr-3">
                      {form.values.DocumentPromesa ? 'Promesa' : 'Cargar Promesa'}
                    </Label>
                    <DocumentItem
                      required
                      canUpload={canUpload}
                      name="DocumentPromesa"
                      accept="pdf"
                    />
                  </FormGroup>
                </div>
                <div className="pt-4 pb-4 ">
                  <FormGroup className="align-items-center">
                    <Label className="mr-3" style={{ width: '25em' }}>
                      Fecha o plazo para firma de escritura
                    </Label>
                    <ExField
                      readOnly={!canUpload}
                      type="datePicker"
                      name="FechaFirmaDeEscritura"
                      // required={canUpload}
                    />
                  </FormGroup>
                  <FormGroup className="align-items-center mt-3">
                    <Label className="mr-3" style={{ width: '25em' }}>
                      Fecha entrega de inmueble
                    </Label>
                    <ExField
                      readOnly={!canUpload}
                      type="datepicker"
                      name="FechaEntregaDeInmueble"
                    // required={canUpload}
                    />
                  </FormGroup>
                  <FormGroup className="align-items-center mt-3">
                    <Label className="mr-3" style={{ width: '25em' }}>
                      Otras clausulas especiales
                    </Label>
                    {!!form.values.HasDesistimientoEspecial && (
                      <ExField
                        name="DesistimientoEspecial"
                        readOnly={!canUpload}
                        className="mr-3"
                        // required={canUpload}
                      />
                    )}
                    <Checkbox
                      name="HasDesistimientoEspecial"
                      readOnly={!canUpload}
                    />
                  </FormGroup>
                  <FormGroup className="align-items-center mt-3">
                    <Label className="mr-3" style={{ width: '25em' }}>
                      Modificación en la cláusula de multas (% de multas)
                    </Label>
                    <ExField
                      name="ModificacionEnLaClausula"
                      readOnly={!canUpload}
                      value={form.values.ModificacionEnLaClausula || ""}
                      // required={canUpload}
                    />
                  </FormGroup>
                  <FormGroup className="align-items-center mt-3">
                    <Label className="mr-3" style={{ width: '25em' }}>
                      Método oficial de comunicación para comienzo de
                      escrituración
                    </Label>
                    {!!form.values.HasMetodoComunicacionEscrituracion && (
                      <ExField
                        name="MetodoComunicacionEscrituracion"
                        // required={canUpload}
                        readOnly={!canUpload}
                        className="mr-3"
                      />
                    )}
                    <Checkbox
                      name="HasMetodoComunicacionEscrituracion"
                      readOnly={!canUpload}
                    />
                  </FormGroup>

                  <FieldArray
                    name="PaymentInstructions"
                    render={({ remove, push, replace }) => (
                      <FormGroup className="mt-3">
                        <Label className="d-flex mr-3" style={{ width: '25em' }}>
                          Pago por instrucciones
                        </Label>
                        <div>
                          {(form.values.PaymentInstructions || []).map((value, index) =>
                            <div className={`d-flex align-items-center ${index == 0 ? "" : "pt-3"}`}
                              key={`payment${index}`}
                            >
                              <div className="fetcha-examina-group">
                                <ExField
                                  type="datePicker"
                                  placeholder="Fecha"
                                  name={`PaymentInstructions.${index}.Date`}
                                  readOnly={!canUpload}
                                  style={{ width: '11.25em' }}
                                />
                                <div className="d-flex align-items-center mt-3">
                                  <DocumentItem
                                    name={`PaymentInstructions.${index}.Document`}
                                    canUpload={canUpload && form.values.PaymentInstructions[index].Date !== null}
                                    required={
                                      form.values.PaymentInstructions[index].Date !== null
                                    }
                                  />
                                </div>
                              </div>
                              {index > 0 && canUpload && (
                                <div
                                  role="presentation"
                                  onClick={() => remove(index)}
                                  className="font-21 color-main background-color-transparent ml-2 pl-2 pointer"
                                >
                                  <strong>-</strong>
                                </div>
                              )}
                            </div>
                          )}
                          {canUpload && (
                            <div className="mt-3">
                              <Button
                                color="white"
                                onClick={() => push({ Date: null, Document: null })}
                                className="btn-plus"
                                disabled={
                                  form.values.PaymentInstructions[form.values.PaymentInstructions.length - 1].Date === null
                                }
                              >
                                <b>Agregar</b>
                              </Button>
                            </div>
                          )}
                        </div>
                      </FormGroup>
                    )}
                  />
                </div>
              </BoxContent>
              <BoxFooter>
                {canUpload && (
                  withText.open ? (
                    <div className="py-3 ">
                      <span className="d-block text-left font-14-rem">
                        <b>Comentarios (En caso de Rechazo)</b>
                      </span>
                      <div className="py-3 ">
                        <textarea
                          className="w-100 d-block rounded-lg shadow-sm"
                          rows="5"
                          onChange={evt =>
                            setWithText({ ...withText, text: evt.currentTarget.value })
                          }
                        />
                      </div>
                      <Button
                        disabled={selector.loading}
                        onClick={() => onReject(withText.text.trim())}
                      >
                        Rechazar
                      </Button>
                      <Button
                        disabled={selector.loading}
                        color="white"
                        onClick={() => setWithText({ text: '', open: false })}
                      >
                        Cancelar
                      </Button>
                    </div>) : (
                    <>
                      <Button
                        disabled={!canSubmit || selector.loading}
                        onClick={() => form.submitForm()}
                      >
                        Aprobar
                      </Button>
                      <Button
                        disabled={selector.loading}
                        color="white"
                        onClick={() => setWithText({ text: '', open: true })}
                      >
                        Rechazar
                      </Button>
                      <Button
                        disabled={selector.loading}
                        color="white"
                        onClick={onCancel}
                      >
                        Cancelar
                      </Button>
                    </>
                  )
                )}
              </BoxFooter>
            </Box>
            
            <SyncMassage {...selector} />            
          </>
        )
      }}
    </ExForm>
  );
}

PhaseConfeccionPromesa.propTypes = {
  entity: PropTypes.object,
  canUpload: PropTypes.bool,
  selector: PropTypes.object,
  form: PropTypes.bool,
  onSubmit: PropTypes.func,
  onReject: PropTypes.func,
  onCancel: PropTypes.func,
};

export default PhaseConfeccionPromesa;

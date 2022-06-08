/**
 *
 * Notary
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';
import { getFileName } from 'containers/App/helpers';
import moment from 'components/moment';
import Button from 'components/Button';
import Alert from 'components/Alert';
import { Box, BoxContent, BoxHeader } from 'components/Box';
import { ESCRITURA_STATE } from 'containers/App/constants';
import { Form as ExForm, Field as ExField, Label, FormGroup } from 'components/ExForm';
import { FormattedNumberParts } from 'react-intl';


function Notary({ initialValues, onSubmit })
{	
	const { EscrituraState } = initialValues;
	if(EscrituraState<ESCRITURA_STATE.Notaria) return null;
	
	const PaymentMethodBalanceLabel = [
		'Cheque', 'Vale Vista', 'Instrucciones', 'Depósito a Plazo'
	];

  const current_data = moment(new Date()).format('DD MMM YYYY')

	return (
		<ExForm
			initialValues={{
				...initialValues,
				'StepOne': false
			}}
			onSubmit={values => console.log(values)}
		>
			{(form) => (
				<Box>
					<BoxHeader>
						<b>NOTARÍA</b>
					</BoxHeader>
					<BoxContent className="p-3">
						{EscrituraState < ESCRITURA_STATE.Notaria_IV && (
							<Alert type="warning">
								Debes chequear el proceso de firma.
							</Alert>
						)}
						<div className="list-continue-line mt-4">
							<ol>
								<li className={(EscrituraState == ESCRITURA_STATE.Notaria_I) ? "active" : ""}>
									<span className={`number ${EscrituraState > ESCRITURA_STATE.Notaria_I ? "success" : ""}`}>
										{(EscrituraState > ESCRITURA_STATE.Notaria_I) ? (<i className="icon icon-check" />) : "01"}
									</span>
									<div className="content ml-3 flex-grow-1">
										<div className="d-flex align-items-center mr-2">
											{(EscrituraState < ESCRITURA_STATE.Notaria_II) && (
												<ExField
													type="checkbox"
													name="StepOne"
												/>
											)}
											<span className="font-14-rem">
												{/* <span className="color-warning">(text contado)</span> */}
												<b>Borrador de Escritura entregada Escrituración</b>
												{/* <span className="color-warning">(text crédito)</span> */}
												<b>Borrador de Escritura entregada a Notaría por Banco</b>
											</span>
										</div>
										{(EscrituraState == ESCRITURA_STATE.Notaria_I) && (
											<div className="mt-3 d-flex justify-content-end">
												<Button
													disabled={!form.values['StepOne']}
													onClick={()=>onSubmit({
																		EscrituraState: ESCRITURA_STATE.Notaria_II,
																		Notaria_I_Date: moment(new Date()).format('YYYY-MM-DD')
																	}, 1)}
												>Guardar</Button>
												<Button className="m-btn-white" type="reset">Cancelar</Button>
											</div>
										)}
									</div>
								</li>	
								{(EscrituraState > ESCRITURA_STATE.Notaria_I) &&					
									<span className="number d-block font-14-rem">
										{moment(initialValues['Notaria_I_Date']).diff(
											((EscrituraState == ESCRITURA_STATE.Notaria_II) 
												? moment(new Date()) 
												: moment(initialValues['Notaria_II_Date'])
											), 'days'	
										 )} d
									</span>
								}
								<li className={(EscrituraState == ESCRITURA_STATE.Notaria_II) ? "active" : ""}>
									<span className={`number ${EscrituraState > ESCRITURA_STATE.Notaria_II ? "success" : "mt-2"}`}>
										{(EscrituraState > ESCRITURA_STATE.Notaria_II) ? <i className="icon icon-check" /> : "02"}
									</span>
									<div className="content ml-3 flex-grow-1">
										<div className="d-flex justify-content-between align-items-center">
											<div className="d-flex align-items-center">
												{(EscrituraState < ESCRITURA_STATE.Notaria_III) && (
													<ExField
														type="checkbox"
														name="StepOne"
														readOnly={EscrituraState < ESCRITURA_STATE.Notaria_II}
													/>
												)}
												<span
													className={`font-14-rem 
														${EscrituraState < ESCRITURA_STATE.Notaria_II ? "color-white-gray" : ""}`}
												>
													Aviso a Comprador para Firmar
												</span>
											</div>
											<div className="d-flex align-items-center">
												<span
													className={`font-14-rem 
														${EscrituraState < ESCRITURA_STATE.Notaria_II ? "color-white-gray" : ""}`}
												>
													<em>Ingresa la fecha acordada.</em>
												</span>
												{EscrituraState < ESCRITURA_STATE.Notaria_III ?
													(<ExField
														type="datepicker"
														name="NoticeToClientSignDate"
														className="ml-3"
														readOnly={!form.values['StepOne']}
														required
													/>) :
													<span className="font-14-rem ml-3">
														{moment(initialValues['NoticeToClientSignDate']).format("DD MMM YYYY")}
													</span>
												}
											</div>
										</div>
										{(EscrituraState == ESCRITURA_STATE.Notaria_II) && (
											<div className="mt-3 d-flex justify-content-end">
												<Button
													disabled={!form.values['StepOne'] || form.values['NoticeToClientSignDate']==""}
													onClick={()=>onSubmit({
														EscrituraState: ESCRITURA_STATE.Notaria_III,
														NoticeToClientSignDate: moment(form.values['NoticeToClientSignDate']).format('YYYY-MM-DD'),
														Notaria_II_Date: moment(new Date()).format('YYYY-MM-DD')
													}, 1)}
												>Guardar</Button>
												<Button className="m-btn-white" type="reset">Cancelar</Button>
											</div>
										)}
									</div>
								</li>
								{(EscrituraState > ESCRITURA_STATE.Notaria_II) &&					
									<span className="number d-block font-14-rem">
										{moment(initialValues['Notaria_II_Date']).diff(
											((EscrituraState == ESCRITURA_STATE.Notaria_III) 
												? moment(new Date()) 
												: moment(initialValues['Notaria_III_Date'])
											), 'days'	
										 )} d
									</span>
								}
								<li className={(EscrituraState == ESCRITURA_STATE.Notaria_III) ? "active" : ""}>
									<span className={`number ${EscrituraState > ESCRITURA_STATE.Notaria_III ? "success" : ""}`}>
										{(EscrituraState > ESCRITURA_STATE.Notaria_III) ? <i className="icon icon-check" /> : "03"}
									</span>
									<div className="content ml-3 flex-grow-1">
										<div className="d-flex justify-content-between align-items-center">
											<div className="d-flex align-items-center mr-2">
												{(EscrituraState < ESCRITURA_STATE.Notaria_IV) && (
													<ExField
														type="checkbox"
														name="StepOne"
														readOnly={EscrituraState < ESCRITURA_STATE.Notaria_III}
													/>
												)}
												<span 
													className={`font-14-rem 
														${EscrituraState < ESCRITURA_STATE.Notaria_III ? "color-white-gray" : ""}`}
												>
													Aviso a Inmobiliaria por saldos a pagar
												</span>
											</div>
										</div>
										<div className="row mt-3">
											<div className="col-md-6 d-flex align-items-center">
												<span
													className={`font-14-rem mr-3 
														${EscrituraState < ESCRITURA_STATE.Notaria_III ? "color-white-gray" : ""}`}
												>
													Saldo Cuotas por Pagar
												</span>
												{EscrituraState < ESCRITURA_STATE.Notaria_IV ?
													(<ExField
														type="number"
														name="BalanceFeeUF"
														maskOptions={{ prefix: 'UF' }}
														readOnly={!form.values['StepOne']}
													/>) :
													(<span className="font-14-rem color-regular ml-3">UF {initialValues['BalanceFeeUF']}</span>)
												}
											</div>
											<div className="col-md-6 d-flex align-items-center justify-content-end">
												<span
													className={`font-14-rem mr-3 
														${EscrituraState < ESCRITURA_STATE.Notaria_III ? "color-white-gray" : ""}`}>
													Saldo Fondos por Reglamentos
												</span>
												{EscrituraState < ESCRITURA_STATE.Notaria_IV ?
													(<ExField
														type="number"
														name="BalanceFund"
														maskOptions={{ prefix: '$' }}
														readOnly={!form.values['StepOne']}
													/>) :
													(<span className="font-14-rem color-regular ml-3">$ {initialValues['BalanceFund']}</span>)
												}
											</div>
										</div>
										{(EscrituraState == ESCRITURA_STATE.Notaria_III) && (
											<div className="mt-3 d-flex justify-content-end">
												<Button
													disabled={!form.values['StepOne']}
													onClick={()=>onSubmit({
														EscrituraState: ESCRITURA_STATE.Notaria_IV_I,
														BalanceFeeUF: form.values['BalanceFeeUF'],
														BalanceFund: form.values['BalanceFund'],
														Notaria_III_Date: moment(new Date()).format('YYYY-MM-DD')
													}, 1)}
												>Guardar</Button>
												<Button className="m-btn-white" type="reset">Cancelar</Button>
											</div>
										)}
									</div>
								</li>
							</ol>
						</div>
						{EscrituraState > ESCRITURA_STATE.Notaria_III && (
							<>
								<Alert type="warning">
									Debes ingresar la forma de pago de los saldos y la fecha en que se firmó la Escritura.
								</Alert>
                <span className="font-14-rem color-regular d-block mt-4">
                  <b>FIRMA DE ESCRITURA</b>
                </span>

                {initialValues['SignDateEscritura'] &&
                  <div className="mt-4 pb-3 border-bottom">
                    <div className="mt-4 d-flex align-items-center">
                      <span className="font-14-rem color-regular mr-3">
                        <b>Forma de Pago Saldos</b>
                      </span>
                      { EscrituraState > ESCRITURA_STATE.Notaria_IV_II
                      ? <span className="font-14-rem color-regular mr-3">
                          { PaymentMethodBalanceLabel[initialValues.PaymentMethodBalance] }
                        </span>
                      :	<ExField
                          type="radioGroup"
                          required
                          name="PaymentMethodBalance"
                          options={[
                            { label: 'Cheque', value: '0' },
                            { label: 'Vale Vista', value: '1' },
                            { label: 'Instrucciones', value: '2' },
                            // { label: 'Depósito a Plazo', value: '3' },
                            // { label: 'Tarjeta de Crédito', value: '4' },
                            // { label: 'Transferencia', value: '5' },
                          ]}
                          itemClassName="pr-3"
                        />
                      }
                    </div>
                    {(form.values['PaymentMethodBalance'] == 2) ?
                      <div className="row mt-4">
                        <span className="d-block font-14-rem col-md-12">
                          <b>Nº de instrucción</b>
                        </span>
                        <ExField
                          type="textarea"
                          rows={5}
                          className="my-3 col-md-12"
                          name="InstructionObservacion"
                          readOnly={EscrituraState > ESCRITURA_STATE.Notaria_IV_II}
                        />
												<div className="d-flex align-items-center col-md-6">
													<span className="font-14-rem mr-2">
														<b>Plazo para hacer cobro:</b>
													</span> 
													{initialValues['InstructionDate']
                          ? <span className="font-14-rem color-regular">
															{moment(initialValues['InstructionDate']).format("DD MMM YYYY")}
                            </span>
                          : <ExField
															type="datepicker"
															name="InstructionDate"
															readOnly={EscrituraState > ESCRITURA_STATE.Notaria_IV_II}
															required
														/>
													}
												</div>
												<div className="d-flex align-items-center col-md-6">
													<span className="font-14-rem mr-2">
														<b>Adjuntar archivo:</b>
													</span>
													{initialValues['ChequeFile']
														? <Label>
																<a href={initialValues['ChequeFile']} target='_blank'>
																	{getFileName(initialValues['ChequeFile'])}
																</a>
															</Label>
														:	<ExField
																type="file"
																name="InstructionFile"
																readOnly={EscrituraState > ESCRITURA_STATE.Notaria_IV_II}
																placeholder = "Examinar..."
																style={{width:"12em", height:"2.2em"}}
																required
															/>
													}
												</div>
											</div> :
                      <div className="row mt-4">
                        <div className="col-md-6 d-flex align-items-center mb-3">
                          <span className="font-14-rem color-regular mr-3 no-whitespace">
                            <b>Número de Cheque</b>
                          </span>
                          {initialValues['ChequeNumber']
                          ? <Label className="no-whitespace mr-3">{initialValues['ChequeNumber']}</Label>
                          : <ExField type="number" name="ChequeNumber" className="w-50" required/>
                          }
                          <span className="font-14-rem color-regular ml-3 no-whitespace">
                            <b></b>
                          </span>
                          {initialValues['ChequeFile']
                            ? <Label>
                                <a href={initialValues['ChequeFile']} target='_blank'>
                                  {getFileName(initialValues['ChequeFile'])}
                                </a>
                              </Label>
                            :	<ExField
                                type="file"
                                accept="image/*"
                                name="ChequeFile"
                                placeholder="Examinar..."																	
                                required
                              />
                            }												
                        </div>
                        <div className="col-md-6 d-flex mb-3">
                          <div className="row d-flex align-items-center">
                            <div className="d-flex align-items-center justify-content-end">
                              <span className="font-14-rem color-regular mr-3 ml-3">
                                <b>Valor</b>
                              </span>
                              {initialValues['Valor']
                              ? <span className="font-14-rem color-regular no-whitespace mr-3">
                                  $ {initialValues['Valor']}
                                </span>
                              : <ExField
                                  type="number"
                                  name="Valor"
                                  maskOptions={{ prefix: '$' }}
                                  style={{ width: "7.5em" }}
                                  required
                                />
                              }														
                            </div>
                            <div className="d-flex align-items-center">
                              <span className="font-14-rem color-regular no-whitespace ml-3">
                                <b>Fecha de Pago</b>
                              </span>
                              {initialValues['FetchaPago']
                              ? <span className="font-14-rem color-regular">
                                  {moment(initialValues['FetchaPago']).format("DD MMM YYYY")}
                                </span>
                              : <ExField
                                  type="datePicker"
                                  name="FetchaPago"
                                  required
                                />
                              }
                            </div>
                          </div>
                        </div>
                      </div>
                    }
                  </div>
                }

								<div className="mt-3">
									<div className="mt-3 d-flex align-items-center">
                    <table>
                      <tr>
                        <td>
                          <span className="font-14-rem color-regular mr-3">
                            <b>Fecha de Firma Escritura</b>
                          </span>
                        </td>
                        <td>
                          {initialValues['SignDateEscritura']
                          ? <span className="font-14-rem color-regular">
                                {moment(initialValues['SignDateEscritura']).format("DD MMM YYYY")}
                            </span>
                          : <ExField
                              type="datePicker"
                              name="SignDateEscritura"
                              required
                            />
                          }
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="font-14-rem color-regular mr-3">
                            <b>Fecha de Firma Pagaré (Si es necesario)</b>
                          </span>
                        </td>
                        <td>
                          {initialValues['SignDatePagare']
                          ? <span className="font-14-rem color-regular">
                                {moment(initialValues['SignDatePagare']).format("DD MMM YYYY")}
                            </span>
                          : <ExField
                              type="datePicker"
                              name="SignDatePagare"
                              required
                            />
                          }
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="font-14-rem color-regular mr-3">
											      <b>Fecha de Firma Escritura de Compensacion (Si es necesario)</b>
                          </span>
                        </td>
                        <td>
                          {initialValues['SignDateCompensacion']
                          ? <span className="font-14-rem color-regular">
                                {moment(initialValues['SignDateCompensacion']).format("DD MMM YYYY")}
                            </span>
                          : <ExField
                              type="datePicker"
                              name="SignDateCompensacion"
                              required
                            />
                          }
                        </td>
                      </tr>
                    </table>															
									</div>
									
                  {(EscrituraState === ESCRITURA_STATE.Notaria_IV_I ||
                    EscrituraState === ESCRITURA_STATE.Notaria_IV_II) && (
										<div className="mt-3 d-flex justify-content-end">
											<Button onClick={()=>{
                        if(EscrituraState === ESCRITURA_STATE.Notaria_IV_I){
                          onSubmit( 
                            {
                              EscrituraState: ESCRITURA_STATE.Notaria_IV_II,
                              SignDateEscritura: form.values['SignDateEscritura'],
                              SignDatePagare: form.values['SignDatePagare'],
                              SignDateCompensacion: form.values['SignDateCompensacion'],
                            }, 
                          1);
                        }
                        else{
													const data = new FormData();
													data.append("EscrituraState", ESCRITURA_STATE.Notaria_V);
													data.append("PaymentMethodBalance", form.values['PaymentMethodBalance']);
													if(form.values['PaymentMethodBalance'] == 2){
														data.append("InstructionObservacion", form.values['InstructionObservacion']);
														if( form.values['InstructionFile'].name)
															data.append("InstructionFile", form.values['InstructionFile']);
														data.append("InstructionDate", moment(form.values['InstructionDate']).format('YYYY-MM-DD HH:mm:SS'));
													}
													else{
														data.append("ChequeNumber", form.values['ChequeNumber']);
														if( form.values['ChequeFile'].name)
															data.append("ChequeFile", form.values['ChequeFile']);
														data.append("Valor", form.values['Valor']);
														data.append("FetchaPago", moment(form.values['FetchaPago']).format('YYYY-MM-DD HH:mm:SS'));
													}

													onSubmit(data, 2);
                        }
											}}>
												Guardar
											</Button>
											<Button className="m-btn-white" type="reset">Cancelar</Button>
										</div>
									)}
									{EscrituraState === ESCRITURA_STATE.Notaria_V && (
										<div className="mt-3 d-flex justify-content-end">
											<Button onClick={()=>{
												onSubmit({EscrituraState: ESCRITURA_STATE.Notaria_VI}, 1);
											}}>
												Se solicitó a inmobiliaria que Facture inmueble
											</Button>
											<Button className="m-btn-white" type="reset">Cancelar</Button>
										</div>
									)}
									{EscrituraState === ESCRITURA_STATE.Notaria_VI && (<>										
										<Alert type="warning" className="mt-3">
											Debes ingresar el número y fecha de repertorio. Desde esa fecha comienzan los 60 días para el cierre de copias.
										</Alert>
										<div className="mt-3">
											<span className="font-14-rem color-regular">
												<b>REPERTORIO</b>
											</span>
											<div className="row mt-3">
												<div className="col-md-6 d-flex align-items-center mb-3">
													<span className="font-14-rem color-regular mr-4">
														<b>Número de Repertorio</b>
													</span>
													<ExField name="RepertoireNumber" />
												</div>
												<div className="col-md-6 d-flex align-items-center mb-3">
													<span className="font-14-rem color-regular mr-4">
														<b>Fecha de Inicio</b>
													</span>
													<ExField
														type="datepicker"
														name="StartDate"
														className="ml-3"
														required
													/>
												</div>
											</div>
										</div>
										<div className="mt-3 d-flex justify-content-end">
											<Button onClick={()=>{
												onSubmit({
													EscrituraState: ESCRITURA_STATE.Notaria_VII_I,
													RepertoireNumber: form.values['RepertoireNumber'],
													StartDate: form.values['StartDate']
												}, 1);
											}}>
												Guardar y Comenzar Repertorio
											</Button>
											<Button className="m-btn-white" type="reset">Cancelar</Button>
										</div>
									</>)}

									{EscrituraState > ESCRITURA_STATE.Notaria_VI && ( <>
										<Alert type="warning" className="mt-3">
											Debes gestionar el proceso de Repertorio.&nbsp;
											<span className="color-warning">
												Si no se completa dentro de 60 días. Debes comenzar desde Cero.
											</span>
										</Alert>
										<div className="mt-4 pb-4 border-bottom">
											<span className="font-14-rem color-regular">
												<b>REPERTORIO</b>
											</span>
											<div className="row mt-3">
												<div className="col-md-6 d-flex align-items-center mb-3">
													<span className="font-14-rem color-regular mr-4">
														<b>Número de Repertorio</b>
													</span>
													{initialValues['RepertoireNumber']}
												</div>
												<div className="col-md-6 d-flex align-items-center mb-3">
													<span className="font-14-rem color-regular mr-4">
														<b>Fecha de Inicio</b>
													</span>
													{moment(initialValues['StartDate']).format("DD MMM YYYY")}
												</div>
											</div>
										</div>
										
										<div className="list-continue-line line-gray mt-4 py-4 border-bottom">
											<ol>
												<li>
													<span className={`number time ${EscrituraState > ESCRITURA_STATE.Notaria_VII_I ? "success" : ""}`}>
														<i class="icon icon-time"></i>
													</span>
													<div className="content ml-3 flex-grow-1">
														<div className="d-flex align-items-center mr-2">
															<span className="font-14-rem" style={{height: '1rem'}}>
                                {/* Tiempo Restante:*/}
                                {EscrituraState === ESCRITURA_STATE.Notaria_VII_I 
                                ? current_data
                                : initialValues['Notaria_VII_I_Date'] ? moment(initialValues['Notaria_VII_I_Date']).format('DD MMM YYYY'): ''
                                }
                              </span>
														</div>
														<div className="mt-2 d-flex align-items-center justify-content-md-between">
															<div className="d-flex align-items-center">
																<ExField 
																	type="checkbox" 
																	name="RealEstateBilling" 
																	readOnly={(EscrituraState!==ESCRITURA_STATE.Notaria_VII_I)}
																/>
																<span className="font-14-rem color-regular">
																	<b>Solicitada Factura a Inmobiliaria</b>
																</span>
															</div>
															<div>
																<span className="font-14-rem color-white-gray mr-3">
																	<em>Envío Factura a Notaria.</em>
																</span>
																{(EscrituraState > ESCRITURA_STATE.Notaria_VII_I)
																? <Label>
                                    <a href={initialValues['InvoiceFile']} target='_blank'>
                                      {getFileName(initialValues['InvoiceFile'])}
                                    </a>
                                  </Label>
																:	<ExField
																		type="file"
																		name="InvoiceFile"
																		placeholder="Examinar..."																	
																		required
																		disabled={EscrituraState !== ESCRITURA_STATE.Notaria_VII_I}
																	/>
																}
															</div>
														</div>
														{(EscrituraState == ESCRITURA_STATE.Notaria_VII_I) &&
														<div className="mt-3 d-flex justify-content-end">
															<Button onClick={()=>{
																const data = new FormData();
																data.append("RealEstateBilling", form.values['RealEstateBilling']);
																if( form.values['InvoiceFile'].name)
																	data.append("InvoiceFile", form.values['InvoiceFile']);
																data.append("EscrituraState", ESCRITURA_STATE.Notaria_VII_II);
																data.append("Notaria_VII_I_Date", moment(new Date()).format('YYYY-MM-DD HH:mm:SS'));
																onSubmit(data, 2);
															}}>Guardar</Button>
															<Button className="m-btn-white">Cancelar</Button>
														</div>
														}
													</div>
												</li>

												<li>
													<span className={`number time ${EscrituraState>ESCRITURA_STATE.Notaria_VII_II? "success":""}`}>
														<i class="icon icon-time"></i>
													</span>
													<div className="content ml-3 flex-grow-1">
														<div className="d-flex align-items-center mr-2">
															<span
																className={`font-14-rem
																	${EscrituraState<ESCRITURA_STATE.Notaria_VII_II?"color-white-gray":""}`
                                }
                                style={{height: '1rem'}}
															>
																{/* Tiempo Restante:*/}
                                {EscrituraState === ESCRITURA_STATE.Notaria_VII_II 
                                ? current_data
                                : initialValues['Notaria_VII_II_Date'] ? moment(initialValues['Notaria_VII_II_Date']).format('DD MMM YYYY'): ''
                                }
															</span>
														</div>
														<div className="mt-2 d-flex align-items-center justify-content-between">
															<div className="d-flex align-items-center">
																<ExField
																	type="checkbox"
																	name="SendRealEstateSign"
																	readOnly={(EscrituraState!==ESCRITURA_STATE.Notaria_VII_II)}
																/>
																<span className={`font-14-rem ${EscrituraState<ESCRITURA_STATE.Notaria_VII_II?"color-white-gray":""}`}
																>Envío a Inmobiliaria para Firmar</span>
															</div>
															<div className="d-flex align-items-center">
																<span className="font-14-rem color-white-gray mr-3">
																	<em>Ingresa la fecha.</em>
																</span>
																<ExField
																	type="datepicker"
																	name="SendRealEstateSignDate"
																	disabled={(EscrituraState!==ESCRITURA_STATE.Notaria_VII_II)}
																	required
																/>
															</div>
														</div>
														<div className="mt-2 d-flex align-items-center justify-content-between">
															<div className="d-flex align-items-center">
																<ExField
																	type="checkbox"
																	name="RealEstateSign"
																	readOnly={(EscrituraState!==ESCRITURA_STATE.Notaria_VII_II)}
																/>
																<span className={`font-14-rem ${EscrituraState<ESCRITURA_STATE.Notaria_VII_II?"color-white-gray":""}`}
																>OK Firma Inmobiliaria</span>
															</div>
															<div className="d-flex align-items-center">
																<span className="font-14-rem color-white-gray mr-3">
																	<em>Ingresa la fecha.</em>
																</span>
																<ExField
																	type="datepicker"
																	name="RealEstateSignDate"
																	disabled={(EscrituraState!==ESCRITURA_STATE.Notaria_VII_II)}
																	required
																/>
															</div>
														</div>
														{(EscrituraState == ESCRITURA_STATE.Notaria_VII_II) &&
															<div className="mt-3 d-flex justify-content-end">
																<Button onClick={()=>{
																	const data = {
																		RealEstateSign: form.values['RealEstateSign'],
																		SendRealEstateSign: form.values['SendRealEstateSign'],
																		EscrituraState: ESCRITURA_STATE.Notaria_VII_III
																	}
																	if(form.values['RealEstateSignDate'] !== "")
																		data['RealEstateSignDate'] = form.values['RealEstateSignDate'];
																	if(form.values['SendRealEstateSignDate'] !== "")
																		data['SendRealEstateSignDate'] = form.values['SendRealEstateSignDate'];
                                  data["Notaria_VII_II_Date"] = moment(new Date()).format('YYYY-MM-DD HH:mm:SS');
																	onSubmit(data, 1);
																}}
																>Guardar</Button>
																<Button className="m-btn-white">Cancelar</Button>
															</div>
														}
													</div>
												</li>												
												
												<li>
													<span className={`number time ${EscrituraState>ESCRITURA_STATE.Notaria_VII_III? "success":""}`}>
														<i class="icon icon-time"></i>
													</span>
													<div className="content ml-3 flex-grow-1">
														<div className="d-flex align-items-center mr-2">
															<span
																className={`font-14-rem
																	${EscrituraState<ESCRITURA_STATE.Notaria_VII_III?"color-white-gray":""}`
                                }
                                style={{height: '1rem'}}
															>
																{/* Tiempo Restante:*/}
                                {EscrituraState === ESCRITURA_STATE.Notaria_VII_III 
                                ? current_data
                                : initialValues['Notaria_VII_III_Date'] ? moment(initialValues['Notaria_VII_III_Date']).format('DD MMM YYYY'): ''
                                }
															</span>
														</div>
														<div className="mt-2 d-flex align-items-center justify-content-between">
															<div className="d-flex align-items-center">
																<ExField
																	type="checkbox"
																	name="SignNotary"
																	readOnly={(EscrituraState!==ESCRITURA_STATE.Notaria_VII_III)}
																/>
																<span
																	className={`font-14-rem
																		${EscrituraState<ESCRITURA_STATE.Notaria_VII_III?"color-white-gray":""}`
																	}
																>
																	OK Devolución Notaría
																</span>
															</div>
															<div className="d-flex align-items-center">
																<span className="font-14-rem color-white-gray mr-3">
																	<em>Ingresa la fecha.</em>
																</span>
																<ExField
																	type="datepicker"
																	name="SignNotaryDate"
																	disabled={(EscrituraState!==ESCRITURA_STATE.Notaria_VII_III)}
																	required
																/>
															</div>
														</div>
														<div className="mt-2 d-flex align-items-center justify-content-between">
															<div className="d-flex align-items-center">
																<ExField
																	type="checkbox"
																	name="SignDeedCompensation"
																	readOnly={(EscrituraState!==ESCRITURA_STATE.Notaria_VII_III)}
																	required
																/>
																<span
																	className={`font-14-rem
																		${EscrituraState<ESCRITURA_STATE.Notaria_VII_III?"color-white-gray":""}`
																	}
																>Salida Alzamiento</span>
																<span className="font-14-rem color-white-gray ml-2">
																	<em>Si es Necesario.</em>
																</span>
															</div>
															<div className="d-flex align-items-center">
																<span className="font-14-rem color-white-gray mr-3">
																	<em>Ingresa la fecha.</em>
																</span>
																<ExField
																	type="datepicker"
																	name="SignDeedCompensationDate"
																	disabled={(EscrituraState!==ESCRITURA_STATE.Notaria_VII_III)}
																	required
																/>
															</div>
														</div>
														<div className="mt-2 d-flex align-items-center justify-content-between">
															<div className="d-flex align-items-center">
																<ExField
																	type="checkbox"
																	name="SignSettelment"
																	readOnly={(EscrituraState!==ESCRITURA_STATE.Notaria_VII_III)}
																	required
																/>
																<span
																	className={`font-14-rem
																		${EscrituraState<ESCRITURA_STATE.Notaria_VII_III?"color-white-gray":""}`
																	}
																>OK Firma Escritura de Compensación y Finiquito (Promoción)</span>
																<span className="font-14-rem color-white-gray ml-2">
																	<em>Si es Necesario.</em>
																</span>
															</div>
															<div className="d-flex align-items-center">
																<span className="font-14-rem color-white-gray mr-3">
																	<em>Ingresa la fecha.</em>
																</span>
																<ExField
																	type="datepicker"
																	name="SignSettelmentDate"
																	disabled={(EscrituraState!==ESCRITURA_STATE.Notaria_VII_III)}
																	required
																/>
															</div>
														</div>
														<div className="mt-2 d-flex align-items-center justify-content-between">
															<div className="d-flex align-items-center">
																<ExField
																	type="checkbox"
																	name="SignPay"
																	readOnly={(EscrituraState!==ESCRITURA_STATE.Notaria_VII_III)}
																	required
																/>
																<span
																	className={`font-14-rem
																		${EscrituraState<ESCRITURA_STATE.Notaria_VII_III?"color-white-gray":""}`
																	}
																>OK Firma Pagaré</span>
																<span className="font-14-rem color-white-gray ml-2">
																	<em>Si es Necesario.</em>
																</span>
															</div>
															<div className="d-flex align-items-center">
																<span className="font-14-rem color-white-gray mr-3">
																	<em>Ingresa la fecha.</em>
																</span>
																<ExField
																	type="datepicker"
																	name="SignPayDate"
																	disabled={(EscrituraState!==ESCRITURA_STATE.Notaria_VII_III)}
																	required
																/>
															</div>
														</div>
														{(EscrituraState == ESCRITURA_STATE.Notaria_VII_III) &&
															<div className="mt-3 d-flex justify-content-end">
																<Button onClick={()=>{
																	const data = {
																		SignNotary: form.values['SignNotary'],
																		SignDeedCompensation: form.values['SignDeedCompensation'],
																		SignSettelment: form.values['SignSettelment'],
																		SignPay: form.values['SignPay'],
																		EscrituraState: ESCRITURA_STATE.Notaria_VII_IV
																	}
																	if(form.values['SignNotaryDate'] !== "")
																		data['SignNotaryDate']=form.values['SignNotaryDate'];
																	if(form.values['SignDeedCompensationDate'] !== "")
																		data['SignDeedCompensationDate']=form.values['SignDeedCompensationDate'];
																	if(form.values['SignSettelmentDate'] !== "")
																		data['SignSettelmentDate']=form.values['SignSettelmentDate'];
																	if(form.values['SignNotaryDate'] !== "")
																		data['SignPayDate'] = form.values['SignPayDate'];
                                  data["Notaria_VII_III_Date"] = moment(new Date()).format('YYYY-MM-DD HH:mm:SS');
																	onSubmit(data, 1);
																}}
																>Guardar</Button>
																<Button className="m-btn-white">Cancelar</Button>
															</div>
														}
													</div>
												</li>
												
												<li>
													<span className={`number time ${EscrituraState>ESCRITURA_STATE.Notaria_VII_IV? "success":""}`}>
														<i class="icon icon-time"></i>
													</span>
													<div className="content ml-3 flex-grow-1">
														<div className="d-flex align-items-center mr-2">
															<span
																className={`font-14-rem
																	${EscrituraState<ESCRITURA_STATE.Notaria_VII_IV?"color-white-gray":""}`
                                }
                                style={{height: '1rem'}}
															>
																{/* Tiempo Restante:*/}
                                {EscrituraState === ESCRITURA_STATE.Notaria_VII_IV 
                                ? current_data
                                : initialValues['Notaria_VII_IV_Date'] ? moment(initialValues['Notaria_VII_IV_Date']).format('DD MMM YYYY'): ''
                                }
															</span>
														</div>
														<div className="mt-2 d-flex align-items-center justify-content-between">
															<div className="d-flex align-items-center">
																<ExField
																	type="checkbox"
																	name="IngresoAlzamiento"
																	readOnly={(EscrituraState!==ESCRITURA_STATE.Notaria_VII_IV)}
																/>
																<span
																	className={`font-14-rem
																		${EscrituraState<ESCRITURA_STATE.Notaria_VII_IV?"color-white-gray":""}`
																	}
																>
																	Ingreso Alzamiento
																</span>
															</div>
															<div className="d-flex align-items-center">
																<span className="font-14-rem color-white-gray mr-3">
																	<em>Ingresa la fecha.</em>
																</span>
																<ExField
																	type="datepicker"
																	name="IngresoAlzamientoDate"
																	disabled={(EscrituraState!==ESCRITURA_STATE.Notaria_VII_IV)}
																	required
																/>
															</div>
														</div>
														<div className="mt-2 d-flex align-items-center justify-content-between">
															<div className="d-flex align-items-center">
																<ExField
																	type="checkbox"
																	name="SalidaAlzamiento"
																	readOnly={(EscrituraState!==ESCRITURA_STATE.Notaria_VII_IV)}
																/>
																<span
																	className={`font-14-rem
																		${EscrituraState<ESCRITURA_STATE.Notaria_VII_IV?"color-white-gray":""}`
																	}
																>OK Firma Escritura de Compraventa</span>
																<span className="font-14-rem color-white-gray ml-2">
																	<em>Si es Necesario.</em>
																</span>
															</div>
															<div className="d-flex align-items-center">
																<span className="font-14-rem color-white-gray mr-3">
																	<em>Ingresa la fecha.</em>
																</span>
																<ExField
																	type="datepicker"
																	name="SalidaAlzamientoDate"
																	disabled={(EscrituraState!==ESCRITURA_STATE.Notaria_VII_IV)}
																	required
																/>
															</div>
														</div>
														{(EscrituraState == ESCRITURA_STATE.Notaria_VII_IV) &&
															<div className="mt-3 d-flex justify-content-end">
																<Button onClick={()=>{
																	const data = {
																		IngresoAlzamiento: form.values['IngresoAlzamiento'],
																		SalidaAlzamiento: form.values['SalidaAlzamiento'],
																		EscrituraState: ESCRITURA_STATE.Notaria_VII_V
																	}
																	if(form.values['IngresoAlzamientoDate'] !== "")
																		data['IngresoAlzamientoDate']=form.values['IngresoAlzamientoDate'];
																	if(form.values['SalidaAlzamientoDate'] !== "")
																		data['SalidaAlzamientoDate']=form.values['SalidaAlzamientoDate'];
                                  data["Notaria_VII_IV_Date"] = moment(new Date()).format('YYYY-MM-DD HH:mm:SS');
																	onSubmit(data, 1);
																}}
																>Guardar</Button>
																<Button className="m-btn-white">Cancelar</Button>
															</div>
														}
													</div>
												</li>
												
												<li>
													<span className={`number time ${EscrituraState>ESCRITURA_STATE.Notaria_VII_V? "success":""}`}>
														<i class="icon icon-time"></i>
													</span>
													<div className="content ml-3 flex-grow-1">
														<div className="d-flex align-items-center mr-2">
															<span
																className={`font-14-rem
																	${EscrituraState<ESCRITURA_STATE.Notaria_VII_V?"color-white-gray":""}`
                                }
                                style={{height: '1rem'}}
															>
																{/* Tiempo Restante:*/}
                                {EscrituraState === ESCRITURA_STATE.Notaria_VII_V 
                                ? current_data
                                : initialValues['Notaria_VII_V_Date'] ? moment(initialValues['Notaria_VII_V_Date']).format('DD MMM YYYY'): ''
                                }
															</span>
														</div>
														<div className="mt-2 d-flex align-items-center justify-content-between">
															<div className="d-flex align-items-center">
																<ExField
																	type="checkbox"
																	name="EnteranceFISign"
																	readOnly={(EscrituraState!==ESCRITURA_STATE.Notaria_VII_V)}
																/>
																<span
																	className={`font-14-rem
																		${EscrituraState<ESCRITURA_STATE.Notaria_VII_V?"color-white-gray":""}`
																	}
																>
																	Ingreso a Firma Institución Financiera (sólo crédito)
																</span>
															</div>
															<div className="d-flex align-items-center">
																<span className="font-14-rem color-white-gray mr-3">
																	<em>Ingresa la fecha.</em>
																</span>
																<ExField
																	type="datepicker"
																	name="EnteranceFISignDate"
																	disabled={(EscrituraState!==ESCRITURA_STATE.Notaria_VII_V)}
																	required
																/>
															</div>
														</div>
														<div className="mt-2 d-flex align-items-center justify-content-between">
															<div className="d-flex align-items-center">
																<ExField
																	type="checkbox"
																	name="ExitFISign"
																	readOnly={(EscrituraState!==ESCRITURA_STATE.Notaria_VII_V)}
																/>
																<span
																	className={`font-14-rem
																		${EscrituraState<ESCRITURA_STATE.Notaria_VII_V?"color-white-gray":""}`
																	}
																>Salida Firma Institución Financiera(sólo crédito)</span>
															</div>
															<div className="d-flex align-items-center">
																<span className="font-14-rem color-white-gray mr-3">
																	<em>Ingresa la fecha.</em>
																</span>
																<ExField
																	type="datepicker"
																	name="ExitFISignDate"
																	disabled={(EscrituraState!==ESCRITURA_STATE.Notaria_VII_V)}
																	required
																/>
															</div>
														</div>
														<div className="mt-2 d-flex align-items-center justify-content-between">
															<div className="d-flex align-items-center">
																<ExField
																	type="checkbox"
																	name="IngresoCierreCopias"
																	readOnly={(EscrituraState!==ESCRITURA_STATE.Notaria_VII_V)}
																/>
																<span
																	className={`font-14-rem
																		${EscrituraState<ESCRITURA_STATE.Notaria_VII_V?"color-white-gray":""}`
																	}
																>Ingreso Cierre de Copias</span>
															</div>
															<div className="d-flex align-items-center">
																<span className="font-14-rem color-white-gray mr-3">
																	<em>Ingresa la fecha.</em>
																</span>
																<ExField
																	type="datepicker"
																	name="IngresoCierreCopiasDate"
																	disabled={(EscrituraState!==ESCRITURA_STATE.Notaria_VII_V)}
																	required
																/>
															</div>
														</div>
														<div className="mt-2 d-flex align-items-center justify-content-between">
															<div className="d-flex align-items-center">
																<ExField
																	type="checkbox"
																	name="SalidaCierreCopias"
																	readOnly={(EscrituraState!==ESCRITURA_STATE.Notaria_VII_V)}
																/>
																<span
																	className={`font-14-rem
																		${EscrituraState<ESCRITURA_STATE.Notaria_VII_V?"color-white-gray":""}`
																	}
																>Salida Cierre de Copias</span>
															</div>
															<div className="d-flex align-items-center">
																<span className="font-14-rem color-white-gray mr-3">
																	<em>Ingresa la fecha.</em>
																</span>
																<ExField
																	type="datepicker"
																	name="SalidaCierreCopiasDate"
																	disabled={(EscrituraState!==ESCRITURA_STATE.Notaria_VII_V)}
																	required
																/>
															</div>
														</div>
														
														{(EscrituraState == ESCRITURA_STATE.Notaria_VII_V) &&
															<div className="mt-3 d-flex justify-content-end">
																<Button onClick={()=>{
																	const data = {
																		EnteranceFISign: form.values['EnteranceFISign'],
																		ExitFISign: form.values['ExitFISign'],
																		IngresoCierreCopias: form.values['IngresoCierreCopias'],
																		SalidaCierreCopias: form.values['SalidaCierreCopias'],

																		EscrituraState: ESCRITURA_STATE.Notaria_VIII_I
																	}

																	if(form.values['EnteranceFISignDate'] !== "")
																		data['EnteranceFISignDate']=form.values['EnteranceFISignDate'];
																	if(form.values['ExitFISignDate'] !== "")
																		data['ExitFISignDate']=form.values['ExitFISignDate'];
																	if(form.values['IngresoCierreCopiasDate'] !== "")
																		data['IngresoCierreCopiasDate']=form.values['IngresoCierreCopiasDate'];
																	if(form.values['ExitFISignDate'] !== "")
																		data['SalidaCierreCopiasDate']=form.values['SalidaCierreCopiasDate'];
                                  data["Notaria_VII_V_Date"] = moment(new Date()).format('YYYY-MM-DD HH:mm:SS');
																	onSubmit(data, 1);
																}}>Guardar</Button>
																<Button className="m-btn-white">Cancelar</Button>
															</div>
														}
													</div>
												</li>
											</ol>
										</div>

										<div className="list-continue-line line-gray my-4 py-4">
											<ol>
												<li className={(EscrituraState==ESCRITURA_STATE.Notaria_VIII_I)? "active" : ""}>
													<span className={`number ${EscrituraState>ESCRITURA_STATE.Notaria_VIII_I? "success" : ""}`}>
														{(EscrituraState > ESCRITURA_STATE.Notaria_VIII_I) 
														? (<i className="icon icon-check" />) 
														: "01"
														}
													</span>
													<div className="content ml-3 flex-grow-1">
														<div className="d-flex align-items-center mr-2">
															<span
																className={`font-14-rem
																	${EscrituraState<ESCRITURA_STATE.Notaria_VIII_I?"color-white-gray":""}`
                                }
                                style={{height: '1rem'}}
															>
																{/* Tiempo Restante:*/}
                                {EscrituraState === ESCRITURA_STATE.Notaria_VIII_I 
                                ? current_data
                                : initialValues['Notaria_VIII_I_Date'] ? moment(initialValues['Notaria_VIII_I_Date']).format('DD MMM YYYY'): ''
                                }
															</span>
														</div>
														<div className="mt-2 d-flex align-items-center justify-content-md-between">
															<div className="d-flex align-items-center">
																<ExField 
																	type="checkbox" 
																	name="CompensationSettlement" 
																	readOnly={(EscrituraState!==ESCRITURA_STATE.Notaria_VIII_I)}
																/>
																<span className={`font-14-rem ${EscrituraState<ESCRITURA_STATE.Notaria_VIII_I?"color-white-gray":""}`}
																>
																	<b>Se envía compensación a Inmobiliaria</b>
																</span>
															</div>
															<div className="d-flex align-items-center">
																<span className="font-14-rem color-white-gray mr-3">
																	<em>Ingresa la Factura.</em>
																</span>
																<ExField
																	type="datepicker"
																	name="CompensationSettlementDate"
																	disabled={(EscrituraState!==ESCRITURA_STATE.Notaria_VIII_I)}
																	required
																/>
															</div>
														</div>														
														<div className="mt-2 d-flex align-items-center justify-content-md-between">
															<div className="d-flex align-items-center">
																<ExField 
																	type="checkbox" 
																	name="CompensationRealEstate" 
																	readOnly={(EscrituraState!==ESCRITURA_STATE.Notaria_VIII_I)}
																/>
																<span className={`font-14-rem ${EscrituraState<ESCRITURA_STATE.Notaria_VIII_I?"color-white-gray":""}`}
																>
																	<b>Se envía compensación, finiquito y pagaré al cliente</b>
																</span>
															</div>
															<div className="d-flex align-items-center">
																<span className="font-14-rem color-white-gray mr-3">
																	<em>Ingresa la Factura.</em>
																</span>
																<ExField
																	type="datepicker"
																	name="CompensationRealEstateDate"
																	disabled={(EscrituraState!==ESCRITURA_STATE.Notaria_VIII_I)}
																	required
																/>
															</div>
														</div>														
														{(EscrituraState == ESCRITURA_STATE.Notaria_VIII_I) &&
														<div className="mt-3 d-flex justify-content-end">
															<Button onClick={()=>{
																const data = {
																	CompensationSettlement : form.values['CompensationSettlement'],
																	CompensationRealEstate : form.values['CompensationRealEstate'],
																	EscrituraState: ESCRITURA_STATE.Notaria_VIII_II
																}
																if(form.values['CompensationSettlementDate'] !== "")
																	data['CompensationSettlementDate']=form.values['CompensationSettlementDate'];
																if(form.values['CompensationRealEstateDate'] !== "")
                                  data['CompensationRealEstateDate']=form.values['CompensationRealEstateDate'];
                                data["Notaria_VIII_I_Date"] = moment(new Date()).format('YYYY-MM-DD HH:mm:SS');
																onSubmit(data, 1);
															}}>Guardar</Button>
															<Button className="m-btn-white">Cancelar</Button>
														</div>
														}
													</div>
												</li>
												<li className={(EscrituraState == ESCRITURA_STATE.Notaria_VIII_II) ? "active" : ""}>
													<span className={`number ${EscrituraState>ESCRITURA_STATE.Notaria_VIII_II ? "success" : ""}`}>
														{(EscrituraState>ESCRITURA_STATE.Notaria_VIII_II) ? (<i className="icon icon-check" />) : "02"}
													</span>
													<div className="content ml-3 flex-grow-1">
														<div className="d-flex align-items-center mr-2">
															<span
																className={`font-14-rem
																	${EscrituraState<ESCRITURA_STATE.Notaria_VIII_II?"color-white-gray":""}`
                                }
                                style={{height: '1rem'}}
															>
																{/* Tiempo Restante:*/}
                                {EscrituraState === ESCRITURA_STATE.Notaria_VIII_II 
                                ? current_data
                                : initialValues['Notaria_VIII_II_Date'] ? moment(initialValues['Notaria_VIII_II_Date']).format('DD MMM YYYY'): ''
                                }
															</span>
														</div>
														<div className="mt-2 d-flex align-items-center justify-content-between">
															<div className="d-flex align-items-center">
																<ExField
																	type="checkbox"
																	name="RealEstateConservator"
																	readOnly={(EscrituraState!==ESCRITURA_STATE.Notaria_VIII_II)}
																/>
																<span className={`font-14-rem ${EscrituraState<ESCRITURA_STATE.Notaria_VIII_II?"color-white-gray":""}`}
																><b>Ingreso a Conservador de Bienes Raíces</b></span>
															</div>
															<div className="d-flex align-items-center">
																<span className="font-14-rem color-white-gray mr-3">
																	<em>Ingresa la fecha.</em>
																</span>
																<ExField
																	type="datepicker"
																	name="RealEstateConservatorDate"
																	disabled={(EscrituraState!==ESCRITURA_STATE.Notaria_VIII_II)}
																	required
																/>
															</div>
														</div>
														<div className="mt-2 d-flex align-items-center justify-content-between">
															<div className="d-flex align-items-center">
																<ExField
																	type="checkbox"
																	name="Cover"
																	readOnly={(EscrituraState!==ESCRITURA_STATE.Notaria_VIII_II)}
																/>
																<span className={`font-14-rem ${EscrituraState<ESCRITURA_STATE.Notaria_VIII_II?"color-white-gray":""}`}
																><b>Carátula</b></span>
															</div>
															<div className="d-flex align-items-center">
																<span className="font-14-rem color-white-gray mr-3">
																	<em>Ingresa la fecha.</em>
																</span>
																<ExField
																	type="datepicker"
																	name="CoverDate"
																	disabled={(EscrituraState!==ESCRITURA_STATE.Notaria_VIII_II)}
																	required
																/>
															</div>
														</div>
														
														{(EscrituraState == ESCRITURA_STATE.Notaria_VIII_II) &&
															<div className="mt-3 d-flex justify-content-end">
																<Button onClick={()=>{
																	const data = {
																		RealEstateConservator: form.values['RealEstateConservator'],
																		Cover: form.values['Cover'],
																		EscrituraState: ESCRITURA_STATE.Notaria_VIII_III
																	}
																	if(form.values['RealEstateConservatorDate'] !== "")
																		data['RealEstateConservatorDate']=form.values['RealEstateConservatorDate'];
																	if(form.values['CoverDate'] !== "")
																		data['CoverDate']=form.values['CoverDate'];
                                  data["Notaria_VIII_II_Date"] = moment(new Date()).format('YYYY-MM-DD HH:mm:SS');
																	onSubmit(data, 1);
																}}>Guardar</Button>
																<Button className="m-btn-white">Cancelar</Button>
															</div>
														}
													</div>
												</li>
												<li className={(EscrituraState == ESCRITURA_STATE.Notaria_VIII_III) ? "active" : ""}>
													<span className={`number ${EscrituraState>ESCRITURA_STATE.Notaria_VIII_III ? "success" : ""}`}>
														{(EscrituraState>ESCRITURA_STATE.Notaria_VIII_III) ? (<i className="icon icon-check" />) : "03"}
													</span>
													<div className="content ml-3 flex-grow-1">
														<div className="d-flex align-items-center mr-2">
															<span
																className={`font-14-rem
																	${EscrituraState<ESCRITURA_STATE.Notaria_VIII_III?"color-white-gray":""}`
                                }
                                style={{height: '1rem'}}
															>
																{/* Tiempo Restante:*/}
                                {EscrituraState === ESCRITURA_STATE.Notaria_VIII_III 
                                ? current_data
                                : initialValues['Notaria_VIII_III_Date'] ? moment(initialValues['Notaria_VIII_III_Date']).format('DD MMM YYYY'): ''
                                }
															</span>
														</div>
														<div className="mt-2 d-flex align-items-center justify-content-between">
															<div className="d-flex align-items-center">
																<ExField
																	type="checkbox"
																	name="SendCopiesToClient"
																	readOnly={(EscrituraState!==ESCRITURA_STATE.Notaria_VIII_III)}
																/>
																<span
																	className={`font-14-rem
																		${EscrituraState<ESCRITURA_STATE.Notaria_VIII_III?"color-white-gray":""}`
																	}
																>
																	<b>OK envío de copias Ecrituras, Dominios, Cert. de Hipotecas y Gravámenes al Comprador.</b>
																	<em>(en crédito no va este paso)</em>
																</span>
															</div>
															<div className="d-flex align-items-center">
																<span className="font-14-rem color-white-gray mr-3">
																	<em>Ingresa la fecha.</em>
																</span>
																<ExField
																	type="datepicker"
																	name="SendCopiesToClientDate"
																	disabled={(EscrituraState!==ESCRITURA_STATE.Notaria_VIII_III)}
																	required
																/>
															</div>
														</div>
														<div className="mt-2 d-flex align-items-center justify-content-between">
															<div className="d-flex align-items-center">
																<ExField
																	type="checkbox"
																	name="SendCopiesToIN"
																	readOnly={(EscrituraState!==ESCRITURA_STATE.Notaria_VIII_III)}
																/>
																<span
																	className={`font-14-rem
																		${EscrituraState<ESCRITURA_STATE.Notaria_VIII_III?"color-white-gray":""}`
																	}
																><b>Ok envío copia de escritura a inmobiliaria.</b></span>
															</div>
															<div className="d-flex align-items-center">
																<span className="font-14-rem color-white-gray mr-3">
																	<em>Ingresa la Escritura.</em>
																</span>
																{(EscrituraState > ESCRITURA_STATE.Notaria_VIII_III)
																? <Label>                                    
                                    <a href={initialValues['SendCopiesToINFile']} target='_blank'>
                                      {getFileName(initialValues['SendCopiesToINFile'])}
                                    </a>
                                  </Label>
																:	<ExField
																		type="file"
																		name="SendCopiesToINFile"
																		placeholder="Examinar..."																	
																		required
																		disabled={EscrituraState !== ESCRITURA_STATE.Notaria_VIII_III}
																	/>
																}
															</div>
														</div>
														
														{(EscrituraState == ESCRITURA_STATE.Notaria_VIII_III) &&
															<div className="mt-3 d-flex justify-content-end">
																<Button onClick={()=>{
																	const data = new FormData();
																	data.append('SendCopiesToClient', form.values['SendCopiesToClient']);
																	if(form.values['SendCopiesToClientDate'] !== "")
																		data.append('SendCopiesToClientDate', form.values['SendCopiesToClientDate']);
																	
																	data.append('SendCopiesToIN', form.values['SendCopiesToIN']);
																	if(form.values['SendCopiesToINFile'].name)
																		data.append('SendCopiesToINFile', form.values['SendCopiesToINFile']);

                                  data.append('EscrituraState', ESCRITURA_STATE.Notaria_VIII_IV);	
                                  data.append("Notaria_VIII_III_Date", moment(new Date()).format('YYYY-MM-DD HH:mm:SS'));															
																	onSubmit(data, 2);
																}}
																>Guardar</Button>
																<Button className="m-btn-white">Cancelar</Button>
															</div>
														}
													</div>
												</li>
												<li className={(EscrituraState == ESCRITURA_STATE.Notaria_VIII_IV) ? "active" : ""}>
													<span className={`number ${EscrituraState>ESCRITURA_STATE.Notaria_VIII_IV ? "success" : ""}`}>
														{(EscrituraState>ESCRITURA_STATE.Notaria_VIII_IV) ? (<i className="icon icon-check" />) : "04"}
													</span>
													<div className="content ml-3 flex-grow-1">
														<div className="d-flex align-items-center mr-2">
															<span
																className={`font-14-rem
																	${EscrituraState<ESCRITURA_STATE.Notaria_VIII_IV?"color-white-gray":""}`
                                }
                                style={{height: '1rem'}}
															>
																{/* Tiempo Restante:*/}
                                {EscrituraState === ESCRITURA_STATE.Notaria_VIII_IV 
                                ? current_data
                                : initialValues['Notaria_VIII_IV_Date'] ? moment(initialValues['Notaria_VIII_IV_Date']).format('DD MMM YYYY'): ''
                                }
															</span>
														</div>
														<div className="mt-2 d-flex align-items-center justify-content-between">
															<div className="d-flex align-items-center">
																<ExField
																	type="checkbox"
																	name="ProofPaymentSettlement"
																	readOnly={(EscrituraState!==ESCRITURA_STATE.Notaria_VIII_IV)}
																/>
																<span
																	className={`font-14-rem
																		${EscrituraState<ESCRITURA_STATE.Notaria_VIII_IV?"color-white-gray":""}`
																	}
																><b>
																	OK Comprobante Liquidación de Pagos.</b>
																</span>
															</div>
															<div className="d-flex align-items-center">
																<span className="font-14-rem color-white-gray mr-3">
																	<em>Ingresa el Comprobante.</em>
																</span>
																{(EscrituraState > ESCRITURA_STATE.Notaria_VIII_IV)
																? <Label>                                    
                                    <a href={initialValues['ProofPaymentSettlementFile']} target='_blank'>
                                      {getFileName(initialValues['ProofPaymentSettlementFile'])}
                                    </a>
                                  </Label>
																:	<ExField
																		type="file"
																		name="ProofPaymentSettlementFile"
																		placeholder="Examinar..."																	
																		required
																		disabled={EscrituraState !== ESCRITURA_STATE.Notaria_VIII_IV}
																	/>
																}
															</div>
														</div>
														{(EscrituraState == ESCRITURA_STATE.Notaria_VIII_IV) &&
															<div className="mt-3 d-flex justify-content-end">
																<Button onClick={()=>{
																	const data = new FormData();
																	data.append('ProofPaymentSettlement', form.values['ProofPaymentSettlement']);
																	if(form.values['ProofPaymentSettlementFile'].name)
																		data.append('ProofPaymentSettlementFile',form.values['ProofPaymentSettlementFile']);
																	
                                  data.append('EscrituraState', ESCRITURA_STATE.Notaria_VIII_V);
                                  data.append("Notaria_VIII_IV_Date", moment(new Date()).format('YYYY-MM-DD HH:mm:SS'));
																	onSubmit(data, 2);
																}}
																>Guardar</Button>
																<Button className="m-btn-white">Cancelar</Button>
															</div>
														}
													</div>
												</li>
												<li className={(EscrituraState == ESCRITURA_STATE.Notaria_VIII_V) ? "active" : ""}>
													<span className={`number ${EscrituraState>ESCRITURA_STATE.Notaria_VIII_V ? "success" : ""}`}>
														{(EscrituraState>ESCRITURA_STATE.Notaria_VIII_V) ? (<i className="icon icon-check" />) : "05"}
													</span>
													<div className="content ml-3 flex-grow-1">
														<div className="d-flex align-items-center mr-2">
															<span
																className={`font-14-rem
																	${EscrituraState<ESCRITURA_STATE.Notaria_VIII_V?"color-white-gray":""}`
                                }
                                style={{height: '1rem'}}
															>
																{/* Tiempo Restante:*/}
                                {EscrituraState === ESCRITURA_STATE.Notaria_VIII_V 
                                ? current_data
                                : initialValues['Notaria_VIII_V_Date'] ? moment(initialValues['Notaria_VIII_V_Date']).format('DD MMM YYYY'): ''
                                }
															</span>
														</div>
														<div className="mt-2 d-flex align-items-center">
															<span
																className={`font-14-rem
																	${EscrituraState<ESCRITURA_STATE.Notaria_VIII_V?"color-white-gray":""}`
																}
															><b>¿Existe Subsidio?</b></span>
															<div className="d-flex align-items-center ml-3">
																<ExField
																	type="radios"
																	required
																	name="SubsidyState"
																	options={[
																		{ label: 'SI', value: '1' },
																		{ label: 'NO', value: '0' },
																	]}
																	itemClassName="pr-3 color-white-gray"
																/>
															</div>
														</div>

														<div className="mt-2 d-flex align-items-center justify-content-between">
															<div className="d-flex align-items-center">
																<ExField
																	type="checkbox"
																	name="PaymentSubsidy"
																	readOnly={(EscrituraState!==ESCRITURA_STATE.Notaria_VIII_V)}
																/>
																<span
																	className={`font-14-rem
																		${EscrituraState<ESCRITURA_STATE.Notaria_VIII_V?"color-white-gray":""}`
																	}
																>
																	<b>OK Pago Subsidio</b> <em>Sólo si existe Subsidio.</em>
																</span>
															</div>
															<div className="d-flex align-items-center">
																<span className="font-14-rem color-white-gray mr-3">
																	<em>Ingresa el Comprobante.</em>
																</span>
																{(EscrituraState > ESCRITURA_STATE.Notaria_VIII_V)
																? <Label>
                                    <a href={initialValues['PaymentSubsidyFile']} target='_blank'>
                                      {getFileName(initialValues['PaymentSubsidyFile'])}
                                    </a>
                                  </Label>
																:	<ExField
																		type="file"
																		name="PaymentSubsidyFile"
																		placeholder="Examinar..."																	
																		required
																		disabled={EscrituraState !== ESCRITURA_STATE.Notaria_VIII_V}
																	/>
																}
															</div>
														</div>
														<div className="mt-2 d-flex align-items-center justify-content-between">
															<div className="d-flex align-items-center">
																<ExField
																	type="checkbox"
																	name="PaymentSavingIN"
																	readOnly={(EscrituraState!==ESCRITURA_STATE.Notaria_VIII_V)}
																/>
																<span
																	className={`font-14-rem
																		${EscrituraState<ESCRITURA_STATE.Notaria_VIII_V?"color-white-gray":""}`
																	}
																>
																	<b>OK Pago Ahorro a Inmobiliaria</b> <em>Sólo si existe Subsidio.</em>
																</span>
															</div>
															<div className="d-flex align-items-center">
																<span className="font-14-rem color-white-gray mr-3">
																	<em>Ingresa el Comprobante.</em>
																</span>
																{(EscrituraState > ESCRITURA_STATE.Notaria_VIII_V)
																? <Label>
                                    <a href={initialValues['PaymentSavingINFile']}  target='_blank'>
                                      {getFileName(initialValues['PaymentSavingINFile'])}
                                    </a>
                                  </Label>
																:	<ExField
																		type="file"
																		name="PaymentSavingINFile"
																		placeholder="Examinar..."																	
																		required
																		disabled={EscrituraState !== ESCRITURA_STATE.Notaria_VIII_V}
																	/>
																}
															</div>
														</div>
														{(EscrituraState == ESCRITURA_STATE.Notaria_VIII_V) &&
															<div className="mt-3 d-flex justify-content-end">
																<Button onClick={()=>{
																	const data = new FormData();

																	data.append('SubsidyState', form.values['SubsidyState']);

																	data.append('PaymentSubsidy', form.values['PaymentSubsidy']);
																	if(form.values['PaymentSubsidyFile'].name)
																		data.append('PaymentSubsidyFile',form.values['PaymentSubsidyFile']);

																	data.append('PaymentSavingIN', form.values['PaymentSavingIN']);
																	if(form.values['PaymentSavingINFile'].name)
																		data.append('PaymentSavingINFile',form.values['PaymentSavingINFile']);
																	
                                  data.append('EscrituraState', ESCRITURA_STATE.Notaria_VIII_VI);
                                  data.append("Notaria_VIII_V_Date", moment(new Date()).format('YYYY-MM-DD HH:mm:SS'));
																	onSubmit(data, 2);
																}}
																>Guardar</Button>
																<Button className="m-btn-white">Cancelar</Button>
															</div>
														}
													</div>
												</li>
												<li className={(EscrituraState == ESCRITURA_STATE.Notaria_VIII_VI) ? "active" : ""}>
													<span className={`number ${EscrituraState>ESCRITURA_STATE.Notaria_VIII_VI ? "success" : ""}`}>
														{(EscrituraState>ESCRITURA_STATE.Notaria_VIII_VI) ? (<i className="icon icon-check" />) : "06"}
													</span>
													<div className="content ml-3 flex-grow-1">
														<div className="d-flex align-items-center mr-2">
															<span
																className={`font-14-rem
																	${EscrituraState<ESCRITURA_STATE.Notaria_VIII_VI?"color-white-gray":""}`
                                }
                                style={{height: '1rem'}}
															>
																{/* Tiempo Restante:*/}
                                {EscrituraState === ESCRITURA_STATE.Notaria_VIII_VI 
                                ? current_data
                                : initialValues['Notaria_VIII_VI_Date'] ? moment(initialValues['Notaria_VIII_VI_Date']).format('DD MMM YYYY'): ''
                                }
															</span>
														</div>
														<div className="mt-2 d-flex align-items-center justify-content-between">
															<div className="d-flex align-items-center">
																<ExField
																	type="checkbox"
																	name="INPaymentPending"
																	readOnly={(EscrituraState!==ESCRITURA_STATE.Notaria_VIII_VI)}
																/>
																<span
																	className={`font-14-rem
																		${EscrituraState<ESCRITURA_STATE.Notaria_VIII_VI?"color-white-gray":""}`
																	}
																>
																	<b>OK Recordar a Inmobiliaria Pagos Pendientes</b>
																</span>
															</div>															
															<div className="d-flex align-items-center">
																<span className="font-14-rem color-white-gray mr-3">
																	<em>Ingresa el Comprobante.</em>
																</span>
																{(EscrituraState > ESCRITURA_STATE.Notaria_VIII_VI)
																? <Label>
                                    <a href={initialValues['INPaymentPendingFile']} target='_blank'>
                                      {getFileName(initialValues['INPaymentPendingFile'])}
                                    </a>
                                  </Label>
																:	<ExField
																		type="file"
																		name="INPaymentPendingFile"
																		placeholder="Examinar..."																	
																		required
																		disabled={EscrituraState !== ESCRITURA_STATE.Notaria_VIII_VI}
																	/>
																}
															</div>
														</div>
														<div className="mt-2 d-flex align-items-center justify-content-between">
															<div className="d-flex align-items-center">
																<ExField
																	type="checkbox"
																	name="Retirement"
																	readOnly={(EscrituraState!==ESCRITURA_STATE.Notaria_VIII_VI)}
																/>
																<span className={`font-14-rem ${EscrituraState<ESCRITURA_STATE.Notaria_VIII_VI?"color-white-gray":""}`}
																><b>Fecha de Retiro</b></span>
															</div>
															<div className="d-flex align-items-center">
																<span className="font-14-rem color-white-gray mr-3">
																	<em>Ingresa la fecha.</em>
																</span>
																<ExField
																	type="datepicker"
																	name="RetirementDate"
																	disabled={(EscrituraState!==ESCRITURA_STATE.Notaria_VIII_VI)}
																	required
																/>
															</div>
														</div>
														<div className="mt-2 d-flex align-items-center justify-content-between">
															<div className="d-flex align-items-center">
																<ExField
																	type="checkbox"
																	name="Subscription"
																	readOnly={(EscrituraState!==ESCRITURA_STATE.Notaria_VIII_VI)}
																/>
																<span className={`font-14-rem ${EscrituraState<ESCRITURA_STATE.Notaria_VIII_VI?"color-white-gray":""}`}
																><b>Fecha de Abono</b></span>
															</div>
															<div className="d-flex align-items-center">
																<span className="font-14-rem color-white-gray mr-3">
																	<em>Ingresa la fecha.</em>
																</span>
																<ExField
																	type="datepicker"
																	name="SubscriptionDate"
																	disabled={(EscrituraState!==ESCRITURA_STATE.Notaria_VIII_VI)}
																	required
																/>
															</div>
														</div>
														{(EscrituraState == ESCRITURA_STATE.Notaria_VIII_VI) &&
															<div className="mt-3 d-flex justify-content-end">
																<Button onClick={()=>{
																	const data = new FormData();

																	data.append('INPaymentPending', form.values['INPaymentPending']);
																	if(form.values['INPaymentPendingFile'].name)
																		data.append('INPaymentPendingFile',form.values['INPaymentPendingFile']);

																	data.append('Retirement', form.values['Retirement']);
																	if(form.values['RetirementDate']!=="")
																		data.append('RetirementDate',form.values['RetirementDate']);

																	data.append('Subscription', form.values['Subscription']);
																	if(form.values['SubscriptionDate']!=="")
																		data.append('SubscriptionDate',form.values['SubscriptionDate']);
																	
                                  data.append('EscrituraState', ESCRITURA_STATE.Notaria_VIII_VII);
                                  data.append("Notaria_VIII_VI_Date", moment(new Date()).format('YYYY-MM-DD HH:mm:SS'));
																	onSubmit(data, 2);
																}}
																>Guardar</Button>
																<Button className="m-btn-white">Cancelar</Button>
															</div>
														}
													</div>
												</li>
												<li className={(EscrituraState == ESCRITURA_STATE.Notaria_VIII_VII) ? "active" : ""}>
													<span className={`number ${EscrituraState>ESCRITURA_STATE.Notaria_VIII_VII ? "success" : ""}`}>
														{(EscrituraState>ESCRITURA_STATE.Notaria_VIII_VII) ? (<i className="icon icon-check" />) : "07"}
													</span>
													<div className="content ml-3 flex-grow-1">
														<div className="d-flex align-items-center mr-2">
															<span
																className={`font-14-rem
																	${EscrituraState<ESCRITURA_STATE.Notaria_VIII_VII?"color-white-gray":""}`
                                }
                                style={{height: '1rem'}}
															>
																{/* Tiempo Restante:*/}
                                {EscrituraState === ESCRITURA_STATE.Notaria_VIII_VII 
                                ? current_data
                                : initialValues['Notaria_VIII_VII_Date'] ? moment(initialValues['Notaria_VIII_VII_Date']).format('DD MMM YYYY'): ''
                                }
															</span>
														</div>
														<div className="mt-2 d-flex align-items-center justify-content-between">
															<div className="d-flex align-items-center">
																<ExField
																	type="checkbox"
																	name="GuaranteeToClient"
																	readOnly={(EscrituraState!==ESCRITURA_STATE.Notaria_VIII_VII)}
																/>
																<span className={`font-14-rem ${EscrituraState<ESCRITURA_STATE.Notaria_VIII_VII?"color-white-gray":""}`}
																><b>OK Devolución Garantía a Comprador</b></span>
															</div>
															<div className="d-flex align-items-center">
																<span className="font-14-rem color-white-gray mr-3">
																	<em>Ingresa la fecha.</em>
																</span>
																<ExField
																	type="datepicker"
																	name="GuaranteeToClientDate"
																	disabled={(EscrituraState!==ESCRITURA_STATE.Notaria_VIII_VII)}
																	required
																/>
															</div>
														</div>														
														{(EscrituraState == ESCRITURA_STATE.Notaria_VIII_VII) &&
															<div className="mt-3 d-flex justify-content-end">
																<Button onClick={()=>{
																	const data = {
																		GuaranteeToClient: form.values['RealEstateConservator'],
																		EscrituraState: ESCRITURA_STATE.Notaria_VIII_VIII
																	}
																	if(form.values['GuaranteeToClientDate'] !== "")
																		data['GuaranteeToClientDate']=form.values['GuaranteeToClientDate'];
                                  data["Notaria_VIII_VII_Date"] = moment(new Date()).format('YYYY-MM-DD HH:mm:SS');
																	onSubmit(data, 1);
																}}>Guardar</Button>
																<Button className="m-btn-white">Cancelar</Button>
															</div>
														}
													</div>
												</li>											
												<li className={(EscrituraState == ESCRITURA_STATE.Notaria_VIII_VIII) ? "active" : ""}>
													<span className={`number ${EscrituraState>ESCRITURA_STATE.Notaria_VIII_VIII ? "success" : ""}`}>
														{(EscrituraState>ESCRITURA_STATE.Notaria_VIII_VIII) ? (<i className="icon icon-check" />) : "08"}
													</span>
													<div className="content ml-3 flex-grow-1">
														<div className="d-flex align-items-center mr-2">
															<span
																className={`font-14-rem
																	${EscrituraState<ESCRITURA_STATE.Notaria_VIII_VIII?"color-white-gray":""}`
                                }
                                style={{height: '1rem'}}
															>
																{/* Tiempo Restante:*/}
                                {EscrituraState === ESCRITURA_STATE.Notaria_VIII_VIII 
                                ? current_data
                                : initialValues['Notaria_VIII_VIII_Date'] ? moment(initialValues['Notaria_VIII_VIII_Date']).format('DD MMM YYYY'): ''
                                }
															</span>
														</div>
														<div className="mt-2 d-flex align-items-center justify-content-between">
															<div className="d-flex align-items-center">
																<ExField
																	type="checkbox"
																	name="DeliveryProperty"
																	readOnly={(EscrituraState!==ESCRITURA_STATE.Notaria_VIII_VIII)}
																/>
																<span className={`font-14-rem ${EscrituraState<ESCRITURA_STATE.Notaria_VIII_VIII?"color-white-gray":""}`}
																><b>OK Entrega de la Propiedad</b></span>
															</div>
															<div className="d-flex align-items-center">
																<span className="font-14-rem color-white-gray mr-3">
																	<em>Ingresa la fecha.</em>
																</span>
																<ExField
																	type="datepicker"
																	name="DeliveryPropertyDate"
																	disabled={(EscrituraState!==ESCRITURA_STATE.Notaria_VIII_VIII)}
																	required
																/>
															</div>
														</div>														
														{(EscrituraState == ESCRITURA_STATE.Notaria_VIII_VIII) &&
															<div className="mt-3 d-flex justify-content-end">
																<Button onClick={()=>{
																	const data = {
																		DeliveryProperty: form.values['RealEstateConservator'],
																		EscrituraState: ESCRITURA_STATE.Notaria_VIII_IX
																	}
																	if(form.values['DeliveryPropertyDate'] !== "")
																		data['DeliveryPropertyDate']=form.values['DeliveryPropertyDate'];
                                  data["Notaria_VIII_VIII_Date"] = moment(new Date()).format('YYYY-MM-DD HH:mm:SS');

																	onSubmit(data, 1);
																}}>Guardar</Button>
																<Button className="m-btn-white">Cancelar</Button>
															</div>
														}
													</div>
												</li>
												<li className={(EscrituraState == ESCRITURA_STATE.Notaria_VIII_IX) ? "active" : ""}>
													<span className={`number ${EscrituraState>ESCRITURA_STATE.Notaria_VIII_IX ? "success" : ""}`}>
														{(EscrituraState>ESCRITURA_STATE.Notaria_VIII_IX) ? (<i className="icon icon-check" />) : "09"}
													</span>
													<div className="content ml-3 flex-grow-1">
														<div className="d-flex align-items-center mr-2">
															<span
																className={`font-14-rem
																	${EscrituraState<ESCRITURA_STATE.Notaria_VIII_IX?"color-white-gray":""}`
                                }
                                style={{height: '1rem'}}
															>
																{/* Tiempo Restante:*/}
                                {EscrituraState === ESCRITURA_STATE.Notaria_VIII_IX 
                                ? current_data
                                : initialValues['Notaria_VIII_IX_Date'] ? moment(initialValues['Notaria_VIII_IX_Date']).format('DD MMM YYYY'): ''
                                }
															</span>
														</div>
														<div className="mt-2 d-flex align-items-center justify-content-between">
															<div className="d-flex align-items-center">
																<ExField
																	type="checkbox"
																	name="GPLoginRegistration"
																	readOnly={(EscrituraState!==ESCRITURA_STATE.Notaria_VIII_IX)}
																/>
																<span
																	className={`font-14-rem
																		${EscrituraState<ESCRITURA_STATE.Notaria_VIII_IX?"color-white-gray":""}`
																	}
																>
																	<b>OK Comprobante Liquidación de Pagos.</b>
																</span>
															</div>
															<div className="d-flex align-items-center">
																<span className="font-14-rem color-white-gray mr-3">
																	<em>Ingresa el Comprobante.</em>
																</span>
																{(EscrituraState > ESCRITURA_STATE.Notaria_VIII_IX)
																? <Label>
                                    <a href={initialValues['GPLoginRegistrationFile']} target='_blank'>
                                      {getFileName(initialValues['GPLoginRegistrationFile'])}
                                    </a>
                                  </Label>
																:	<ExField
																		type="file"
																		name="GPLoginRegistrationFile"
																		placeholder="Examinar..."																	
																		required
																		disabled={EscrituraState < ESCRITURA_STATE.Notaria_VIII_IX}
																	/>
																}
															</div>
														</div>
														{(EscrituraState == ESCRITURA_STATE.Notaria_VIII_IX) &&
															<div className="mt-3 d-flex justify-content-end">
																<Button onClick={()=>{
																	const data = new FormData();
																	data.append('GPLoginRegistration', form.values['GPLoginRegistration']);
																	if(form.values['GPLoginRegistrationFile'].name)
																		data.append('GPLoginRegistrationFile',form.values['GPLoginRegistrationFile']);
																	
                                  data.append('EscrituraState', ESCRITURA_STATE.Success);
                                  data.append("Notaria_VIII_IX_Date", moment(new Date()).format('YYYY-MM-DD HH:mm:SS'));
																	onSubmit(data, 2);
																}}
																>Guardar</Button>
																<Button className="m-btn-white">Cancelar</Button>
															</div>
														}
													</div>
												</li>
											</ol>
										</div>
										
									</>)}
								</div>
							</>
						)}
					</BoxContent>
				</Box>
			)}
		</ExForm>
	);
}

Notary.propTypes = {
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func,
};

export default Notary;

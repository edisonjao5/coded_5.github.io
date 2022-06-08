/**
 *
 * Input
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Field as FormikField, getIn } from 'formik';
import Input from './Input';
import FormGroup from './FormGroup';
import Label from './Label';

// eslint-disable-next-line no-unused-vars
const checkRut = rut => {
  // Despejar Puntos
  let valor = rut.replace('.', '');
  // Despejar Guión
  valor = valor.replace('-', '');

  // Aislar Cuerpo y Dígito Verificador
  const cuerpo = valor.slice(0, -1);
  let dv = valor.slice(-1).toUpperCase();

  // Formatear RUN
  // rut = `${cuerpo}-${dv}`;

  // Si no cumple con el mínimo ej. (n.nnn.nnn)
  if (cuerpo.length < 7) {
    return 'RUT Incompleto';
  }

  // Calcular Dígito Verificador
  let suma = 0;
  let multiplo = 2;

  // Para cada dígito del Cuerpo
  for (let i = 1; i <= cuerpo.length; i += 1) {
    // Obtener su Producto con el Múltiplo Correspondiente
    const index = multiplo * valor.charAt(cuerpo.length - i);

    // Sumar al Contador General
    suma += index;

    // Consolidar Múltiplo dentro del rango [2,7]
    if (multiplo < 7) {
      multiplo += 1;
    } else {
      multiplo = 2;
    }
  }

  // Calcular Dígito Verificador en base al Módulo 11
  const dvEsperado = 11 - (suma % 11);
  /* eslint-disable */
  // Casos Especiales (0 y K)
  dv = dv == 'K' ? 10 : dv;
  dv = dv == 0 ? 11 : dv;
  // Validar que el Cuerpo coincide con su Dígito Verificador
  if (dvEsperado != dv) {
    return 'RUT Inválido';
  }
  return null;
  /* eslint-enable */
};

const defaultValidate = (value, props) => {
  // required validate
  /* eslint-disable-next-line */
  if (props.required && (value === '' || value === null) && props.name=="Address") return 'Debe rellenar la dirección completa antes de continuar'; //address must not null
  if (props.required && (value === undefined || value === '' || value === null))
    return 'Este campo es requerido';

  // rut validate
  if (props.rut || props.name.toLowerCase() === 'rut') return checkRut(value);

  // email validate
  if (
    props.type === 'email' &&
    value &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
  )
    return 'Dirección de correo electrónico no válida';
  // ... add more default validate here
  if (value && props.maxlen && value.length > parseInt(props.maxlen, 10))
    return 'Demasiado largo';
  if (value && props.minlen && value.length < parseInt(props.minlen, 10))
    return 'Demasiado corto';

  /* eslint-disable */
  if (
      value != '' &&
      props.max !== undefined &&
      parseFloat(value) > parseFloat(props.max)
  )
    return `No debe ser mayor que ${props.max}`;
  if (
    value != '' &&
    props.min !== undefined &&
    parseFloat(value) < parseFloat(props.min)
  )
    return `No debe ser inferior a ${props.min}`;
  /* eslint-enable */
  // ....

  return null;
};

const ExField = ({
  name,
  children,
  validate,
  label,
  style,
  component,
  inputClass = '',
  ...props
}) => (
  <FormikField
    name={name}
    validate={value => {
      let error = null;
      if (validate) error = validate(value);
      if (error) return error;
      return defaultValidate(value, { ...props, name });
    }}
    {...props}
  >
    {({ field, form }) => {
      let className = props.className || '';
      /* eslint-disable-next-line */
      if (props.required && (field.value === '' || field.value === null || field.value === undefined)) className += ' caution';
      const getInTouched = getIn(form.touched, field.name);
      const getInErrors = getIn(form.errors, field.name);
      const inputElement = component ? (
        component(field, form)
      ) : (
        <div
          className={className}
          style={props.type === 'hidden' ? { display: 'none' } : style}
        >
          <Input
            {...field}
            {...props}
            className={` ${
              getInTouched && getInErrors ? 'is-invalid' : ''
            } ${inputClass} ${className.includes('caution') ? 'caution' : ''}`}
          >
            {children && children}
          </Input>
          {getInTouched && getInErrors && (
            <div className="invalid-feedback d-block m-0">{getInErrors}</div>
          )}
        </div>
      );

      if (label)
        return (
          <FormGroup className="p-0 my-1">
            {label && <Label style={{ width: '11.65em' }}>{label}</Label>}
            {inputElement}
          </FormGroup>
        );
      return inputElement;
    }}
  </FormikField>
);

ExField.propTypes = {
  required: PropTypes.bool,
  type: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
  inputClass: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  children: PropTypes.node,
  name: PropTypes.string,
  validate: PropTypes.func,
  component: PropTypes.func,
};

export default ExField;

import { formatNumber } from 'containers/App/helpers';
import _ from 'lodash';

export const calculates = values => {
  const { Inmuebles = [], Cuotas = [], PayType = 'Credito' } = values;
  const cuota = Cuotas.reduce(
    (acc, item) => acc + parseFloat(item.Amount || 0),
    0,
  );
  
  const total = Inmuebles.reduce((acc, item) => acc + item.Price, 0);

  const apartmentTotalCost = Inmuebles.filter(item=>
      item.InmuebleType === "Departamento"
    ).reduce((acc, item) => acc + (1 - (item.Discount || 0)/100)*item.Price, 0);
    
  const discount = Inmuebles.reduce(
    (acc, item) => acc + ((item.Discount || 0) / 100) * item.Price,
    0,
  );

  const PaymentFirmaPromesa = values.PaymentFirmaPromesa
    ? formatNumber(values.PaymentFirmaPromesa)
    : 0;
  const PaymentInstitucionFinanciera = values.PaymentInstitucionFinanciera
    ? formatNumber(values.PaymentInstitucionFinanciera)
    : 0;
  const PaymentFirmaEscritura = values.PaymentFirmaEscritura
    ? formatNumber(values.PaymentFirmaEscritura)
    : 0;

  const Subsidio = values.Subsidio ? formatNumber(values.Subsidio) : 0;
  const Libreta = values.Libreta ? formatNumber(values.Libreta) : 0;

  const AhorroPlus = values.AhorroPlus ? formatNumber(values.AhorroPlus) : 0;
  
  const cost = total - discount;

  // const noApartmentCost = apartmentTotalCost ? (cost - apartmentTotalCost)*AhorroPlus/apartmentTotalCost : 0;

  const { uf, paymentUtils = [] } = window.preload || {};
  const isCredit =
    PayType === paymentUtils[1].PayTypeID || PayType === paymentUtils[1].Name;

  const pay =
    (isCredit ? PaymentInstitucionFinanciera : 0) +
    PaymentFirmaPromesa +
    PaymentFirmaEscritura +
    cuota +
    Subsidio +
    Libreta +
    AhorroPlus;

  const balance = cost - pay;
  
  const moneyErr = (Math.abs(balance) > 0.1);
  
  return {
    PaymentFirmaPromesa,
    PaymentInstitucionFinanciera,
    PaymentFirmaEscritura,
    Subsidio,
    Libreta,
    AhorroPlus,
    total,
    discount,
    cost,
    cost$: cost * uf.valor,
    cuota,
    pay,
    balance,
    moneyErr,
    percent: {
      PaymentFirmaPromesa:
        cost > 0 ? formatNumber((PaymentFirmaPromesa / cost) * 100) : 0,
      PaymentInstitucionFinanciera:
        cost > 0
          ? formatNumber((PaymentInstitucionFinanciera / cost) * 100)
          : 0,
      PaymentFirmaEscritura:
        cost > 0 ? formatNumber((PaymentFirmaEscritura / cost) * 100) : 0,
      Cuotas: cost > 0 ? formatNumber((cuota / cost) * 100) : 0,
      Subsidio: cost > 0 ? formatNumber((Subsidio / cost) * 100) : 0,
      Libreta: cost > 0 ? formatNumber((Libreta / cost) * 100) : 0,
      AhorroPlus: apartmentTotalCost > 0 ? formatNumber((AhorroPlus / apartmentTotalCost) * 100) : 0,
    },
    convert: {
      PaymentFirmaPromesa: uf
        ? formatNumber(PaymentFirmaPromesa * uf.valor, 0)
        : 0,
      PaymentInstitucionFinanciera: uf
        ? formatNumber(PaymentInstitucionFinanciera * uf.valor, 0)
        : 0,
      PaymentFirmaEscritura: uf
        ? formatNumber(PaymentFirmaEscritura * uf.valor, 0)
        : 0,
      Cuotas: uf ? formatNumber(cuota * uf.valor, 0) : 0,
      Subsidio: uf ? formatNumber(Subsidio * uf.valor, 0) : 0,
      Libreta: uf ? formatNumber(Libreta * uf.valor, 0) : 0,
      AhorroPlus: uf ? formatNumber(AhorroPlus * uf.valor, 0) : 0,
    },
    apartmentTotalCost,
  };
};

export const isCreditType = PayType => {
  const { paymentUtils = [] } = window.preload || {};
  return (
    PayType === paymentUtils[1].PayTypeID || PayType === paymentUtils[1].Name
  );
};

export const isContadoType = PayType => {
  const { paymentUtils = [] } = window.preload || {};
  return (
    PayType === paymentUtils[0].PayTypeID || PayType === paymentUtils[0].Name
  );
};

export const isPayTypeName = PayType => {
  const { paymentUtils } = window.preload;
  return PayType === paymentUtils[0].Name || PayType === paymentUtils[1].Name;
};

export const updatePaymentValues = ({ payFor, value, values, setValues }) => {
  if (payFor) {
    if (payFor === 'PayType') {
      _.set(values, payFor, value);
    } else {      
      if(payFor == "Cuotas.0.Amount") values.Cuotas=[values.Cuotas[0]];
      _.set(values, payFor, formatNumber(value));
    }
  }

  const isCredit = isCreditType(values.PayType);

  const { cost, pay } = calculates(values);

  const PaymentInstitucionFinanciera = isCredit ? values.PaymentInstitucionFinanciera : 0;
  
  // const PaymentFirmaEscritura = (payFor==="AhorroPlus") ? values.PaymentFirmaEscritura + cost - pay : values.PaymentFirmaEscritura;
  const PaymentFirmaPromesa = (payFor==="AhorroPlus") ? (values.PaymentFirmaPromesa + cost - pay) : (values.PaymentFirmaPromesa);

  setValues({
    ...values,
    PaymentInstitucionFinanciera: PaymentInstitucionFinanciera < 0 ? 0 : PaymentInstitucionFinanciera,
    PaymentFirmaPromesa: PaymentFirmaPromesa < 0 ? 0 : formatNumber(PaymentFirmaPromesa),
    // AhorroPlus: AhorroPlus < 0 ? 0 : AhorroPlus,
  });
};

export const divideCalculation = (total, percentage, date) => {
  const { tasa = {}, uf } = window.preload || {};
  const rate = tasa.Value || 0;
  if (date) {
    const result =
      total *
      (percentage / 100) *
      ((1 + rate / 100) ** (1 / 12) - 1) *
      ((1 + rate / 100) ** date / ((1 + rate / 100) ** date - 1));
    const dividendUf = formatNumber(result, 2);
    return { dividendUf, dividend$: formatNumber(dividendUf * uf.valor, 0) };
  }
  return { dividendUf: '-', dividend$: '-' };
};

export const simulateCalculation = (values, date) => {
  if (date) {
    const { cost: total, percent } = calculates(values);
    const percentage = percent.PaymentInstitucionFinanciera;
    const desgravamenInsurance = values.CodeudorID
      ? total * (percentage / 100) * 0.00028 * 2
      : total * (percentage / 100) * 0.00028;

    const fireQuakeInsurance = total * 0.000245;

    const { dividendUf, dividend$ } = divideCalculation(
      total,
      percentage,
      date,
    );

    const dividendInsurances = formatNumber(
      dividendUf + desgravamenInsurance + fireQuakeInsurance,
      2,
    );

    const minRent = 4 * dividendUf + desgravamenInsurance + fireQuakeInsurance;

    return {
      desgravamenInsurance,
      fireQuakeInsurance,
      dividendUf,
      dividend$,
      dividendInsurances,
      minRent,
    };
  }
  return {
    desgravamenInsurance: '-',
    fireQuakeInsurance: '-',
    dividendUf: '-',
    dividend$: '-',
    dividendInsurances: '-',
    minRent: '-',
  };
};

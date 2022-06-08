/*
 * AseguradorasPage
 *
 *
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import PageHeader from 'containers/Common/PageHeader';
import InitData from 'containers/Common/InitData';
import InstitucionFinanciera from 'containers/Common/InstitucionFinanciera';

export default function InstitucionFinancieraPage() {
  return (
    <div>
      <InitData InstitucionFinanciera />
      <Helmet title="Institucion Financieras" />
      <PageHeader header={['Configuración', 'Institucion Financieras']} />
      <InstitucionFinanciera />
    </div>
  );
}

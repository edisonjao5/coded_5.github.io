/*
 * AseguradorasPage
 *
 *
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import PageHeader from 'containers/Common/PageHeader';
import InitData from 'containers/Common/InitData';
import Aseguradora from 'containers/Common/Aseguradora';

export default function AseguradorasPage() {
  return (
    <div>
      <InitData Aseguradora />
      <Helmet title="Aseguradoras" />
      <PageHeader header={['Configuración', 'Aseguradoras']} />
      <Aseguradora />
    </div>
  );
}

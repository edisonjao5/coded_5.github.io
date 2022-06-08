import FileSaver from 'file-saver';

export const shortType = str =>
  str
    .replace(/Departamento/gi, 'Depto.')
    .replace(/Estacionamiento/gi, 'Est.')
    .replace(/Bodega/gi, 'Bod.')
    .replace(/Oficina/gi, 'Ofi.')
    .replace(/Local Comercial/gi, 'Comer.')
    .replace(/Terreno/gi, 'Ter.')
    .replace(/Parcela Sola/gi, 'Sola.')
    .replace(/Parcela Edificada/gi, 'Edif.')
    .replace(/Adicionales/gi, 'Adi.')
    .replace(/Urbanización/gi, 'Urban.')
    .replace(/Talleres/gi, 'Tal.')
    .replace(/Poligono/gi, 'Poli.');

export const inmuebleSortDetail = entity => {
  switch (entity.InmuebleType) {
    case 'Departamento':
      return `Piso ${entity.Floor > 0 ? entity.Floor : 'G'}, ${entity.Number} ,
        ${entity.Orientation.map(ori => ori.Description).join('-')} ,
        ${entity.BedroomsQuantity}D${entity.BathroomQuantity}B`;
    default:
      return `Piso ${entity.Floor > 0 ? entity.Floor : 'G'} ,
        ${entity.Orientation.map(ori => ori.Description).join('-')}`;
  }
};

export const inmuebleLabel = entity => {
  const UsoyGoceLabel = ((entity.IsNotUsoyGoce !== "Departamento") ? 'Uso y Goce' : '');
  const Floor = entity.Floor > 0 ? entity.Floor : 'G';
  const Orientation = entity.Orientation
    ? entity.Orientation.map(ori => ori.Description).join('-')
    : '';
  const Room = `${entity.BedroomsQuantity}D${entity.BathroomQuantity}B`;
  const Type = `${entity.InmuebleType} ${entity.Number}`;
  const Discount = entity.Discount > 0 ? entity.Discount : '';
  switch (entity.InmuebleType) {
    case 'Departamento':
      return `${Type} / Piso ${Floor}, ${Orientation} , ${Room}, Aplicando Descuento de ${Discount}%`;
        // ${Room} / ${UsoyGoceLabel}`;
    default:
      return `${Type} / Piso ${Floor} , ${Orientation}/ ${UsoyGoceLabel}`;
  }
};

export const inmuebleWithRestrictions = entity =>
  shortType(
    [
      `${entity.InmuebleType} ${entity.Number}`,
      ...(entity.Restrictions || []).map(restriction => restriction.Inmueble),
    ].join(' / '),
  );

export const matchRestrictions = ({ restrictions = [], inmuebles = [] }) => {
  if (!inmuebles) return false;
  let tmpInmuebles = [...inmuebles];
  if (restrictions) {
    restrictions.forEach(({ InmuebleAID, Restrictions = [] }) => {
      const Inmueble = tmpInmuebles.find(
        entity => entity.InmuebleID === InmuebleAID,
      );
      if (Inmueble) {
        Inmueble.Restrictions = Restrictions.map(restriction => {
          const RestrictionInmueble = tmpInmuebles.find(
            entity => entity.InmuebleID === restriction.InmuebleBID,
          );
          RestrictionInmueble.isRequiredRestriction =
            restriction.InmuebleInmuebleType === 'Required';
          RestrictionInmueble.isForbiddenRestriction =
            restriction.InmuebleInmuebleType === 'Forbidden';
          tmpInmuebles = tmpInmuebles.map(entity => {
            if (entity.InmuebleID === restriction.InmuebleBID) {
              return RestrictionInmueble;
            }
            return entity;
          });

          return { ...restriction, Inmueble: RestrictionInmueble };
        });
        tmpInmuebles = [
          ...tmpInmuebles.filter(entity => entity.InmuebleID !== InmuebleAID),
          Inmueble,
        ];
      }
    });
  }
  return tmpInmuebles;
};

export const matchRestrictionsFromAList = inmuebles => {
  if (!inmuebles && !Array.isArray(inmuebles)) return false;
  const restrictions = inmuebles.reduce((acc, item) => {
    if (item.Restrictions && item.Restrictions.length > 0)
      return [...acc, ...item.Restrictions.map(subitem => subitem.InmuebleBID)];
    return acc;
  }, []);
  return inmuebles.filter(item => !restrictions.includes(item.InmuebleID));
};

export const DownloadBlueprint = (path, bprint) =>
  FileSaver.saveAs(path, bprint);

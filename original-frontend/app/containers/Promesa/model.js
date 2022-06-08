export default function model({ entity = {} }) {
  return {
    OfertaID: null,
    ...entity,
  };
}

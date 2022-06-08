export default function model({ project, entity = {} }) {
  return {
    OfertaID: null,
    ...entity,
    IsSubsidy: project.IsSubsidy || false,
  };
}

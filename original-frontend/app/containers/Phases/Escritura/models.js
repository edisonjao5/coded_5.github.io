export const getCheckPromesaModel =(entities) => {
  return ([
    {label:'Promesa con Instrucciones', name:'PromesaInstructions', type:'radios'},
    {label:'Fecha de Escrituración Pactada', name:'AgreedDeedDate', type:'radios'},
    {label:'Fecha Entrega de Departamento', name:'DepartmentDeliveryDate', type:'radios'},
    {label:'Cláusula de Desistimiento Especial', name:'SpecialWithdrawalClause', type:'radios'},
    {label:'Modificación Cláusula de Multas', name:'ModificationFinesClause', type:'radios'},
    {label:'Método Especial de Comunicación', name:'SpecialCommunication', type:'radios'},
    {label:'Extranjero con RUT', type:'label'},
    {label:'Tiene Promoción', name:'HasPromotion', type:'radios'},
    {label:'Adjuntar Cuenta Corriente del Cliente', name:'CustomerCheckingAccount', type:'file'},
    {label:'Adjuntar Poderes y Personerías (Si es empresa)', name:'PowersCharacteristics', type:'file'},
  ]);
}
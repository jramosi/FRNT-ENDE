import { createPrioridad, deletePrioridad,  getPrioridadesByCodigo, updatePrioridad } from '../../services/PrioridadService';
import KEYQUERY from '../../constants/KeyQueries';
import fieldsForm from './fieldsFormPrioridad';
import CrudPage from '../../common/CrudPage';

const Prioridades = () => {
  const columnsTable = [
    {
      title: 'Código',
      dataIndex: 'codigo',
      key: 'codigo',
    },
    {
      title: 'Descripción',
      dataIndex: 'descripcion',
      key: 'descripcion',
    },
  ];
  const appendDataToSend = { activo: true }

  return (
    <CrudPage
      titleHeader='Prioridad de tickets'
      methodServiceList={getPrioridadesByCodigo}
      methodServiceCreate={createPrioridad}
      methodServiceDelete={deletePrioridad}
      methodServiceUpdate={updatePrioridad}
      keyQuery={KEYQUERY.PRIORIDAD}
      columnsTable={columnsTable}
      titleModalCreate="Crear una nueva prioridad de ticket"
      titleModalEdit="Editar prioridad de ticket"
      fieldsForm={fieldsForm}
      appendData={appendDataToSend}

      fieldRelation=''
    />
  )
}

export default Prioridades
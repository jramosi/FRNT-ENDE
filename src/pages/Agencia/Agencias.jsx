import { createAgencia, deleteAgencia, getAgencias, updateAgencia } from '../../services/AgenciaService';
import KEYQUERY from '../../constants/KeyQueries';
import CrudPage from '../../common/CrudPage';
import fieldsForm from './fieldsFormAgencia';

const Agencias = () => {

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
    {
      title: 'Dirección',
      dataIndex: 'direccion',
      key: 'direccion',
      responsive: ['md'],

    }
  ];
  const appendDataToSend = { activo: true }
  return (
    <CrudPage
      titleHeader='Agencias'
      methodServiceList={getAgencias}
      methodServiceCreate={createAgencia}
      methodServiceDelete={deleteAgencia}
      methodServiceUpdate={updateAgencia}
      keyQuery={KEYQUERY.AGENCIA}
      columnsTable={columnsTable}
      titleModalCreate="Crear un nueva Agencia"
      titleModalEdit="Editar datos de Agencia"
      fieldsForm={fieldsForm}
      appendData={appendDataToSend}
      fieldRelation='tipoTicket'    
      fieldRelationToSendAsList={true}

    />
  )
}

export default Agencias
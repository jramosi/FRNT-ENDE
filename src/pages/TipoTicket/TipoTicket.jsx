
import { createTipoTicket, deleteTipoTicket, getTiposTickets, updateTipoTicket } from '../../services/TipoTicketService';
import KEYQUERY from '../../constants/KeyQueries';
import fieldsForm from './fieldsFormTipoTicket';
import CrudPage from '../../common/CrudPage';

const TipoTicket = () => {

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
      responsive: ['md'],
    },
    {
      title: 'Prioridad',
      dataIndex: 'prioridad',
      key: 'prioridad',
      render: (prioridad, record) => (
        <>{prioridad.codigo}</>
      )
    },
    {
      title: 'Preferencial',
      dataIndex: 'preferencial',
      key: 'preferencial',
      responsive: ['md'],
      render: (prioridad, record) => (
        <>{record.preferencial ? 'SI' : 'NO'}</>
      )
    },
  ];
  const appendDataToSend = { activo: true }

  return (
    <CrudPage
      titleHeader='Tipo de tickets'
      methodServiceList={getTiposTickets}
      methodServiceCreate={createTipoTicket}
      methodServiceDelete={deleteTipoTicket}
      methodServiceUpdate={updateTipoTicket}
      keyQuery={KEYQUERY.TIPOTICKET}
      columnsTable={columnsTable}
      titleModalCreate="Crear un nuevo tipo de ticket"
      titleModalEdit="Editar tipo de ticket"
      fieldsForm={fieldsForm}
      appendData={appendDataToSend}

      fieldRelation='prioridad'
    />
  )
}

export default TipoTicket
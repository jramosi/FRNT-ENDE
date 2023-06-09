import { getEstadosTickets } from '../../services/EstadoTicketService';
import KEYQUERY from '../../constants/KeyQueries';
import CrudPageRedirect from '../../common/CrudPageRedirect';

const EstadosTickets = () => {

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
  return (
    <CrudPageRedirect
      titleHeader='Estados de ticket'
      methodServiceList={getEstadosTickets}
      keyQuery={KEYQUERY.ESTADOTICKET}
      columnsTable={columnsTable}
    />
  )
}

export default EstadosTickets
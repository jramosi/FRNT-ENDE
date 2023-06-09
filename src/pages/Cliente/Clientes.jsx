
import CrudPageRedirect from '../../common/CrudPageRedirect';
import { getClientes } from '../../services/ClienteService';
import KEYQUERY from '../../constants/KeyQueries';
import ROUTE from '../../constants/Routes';

const Clientes = () => {
  const columnsTable = [
    {
      title: 'C.I.',
      dataIndex: 'documento',
      key: 'documento',
    },
    {
      title: 'Celular',
      dataIndex: 'celular',
      key: 'celular',
    },
    {
      title: 'Número Consumidor',
      dataIndex: 'numero_consumidor',
      key: 'numero_consumidor',
    },

  ];
  return (
    <CrudPageRedirect
      titleHeader='Clientes'
      methodServiceList={getClientes}
      keyQuery={KEYQUERY.CLIENTE}
      columnsTable={columnsTable}
    />
  )
}

export default Clientes
import CrudPageRedirect from '../../common/CrudPageRedirect';

import KEYQUERY from '../../constants/KeyQueries';
import { getOperaciones } from '../../services/OperacionService';


const Operaciones = () => {

  /**columnas de la tabla , render es propio de antd */
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
      titleHeader='Operaciones'
      methodServiceList={getOperaciones}
      keyQuery={KEYQUERY.OPERACION}
      columnsTable={columnsTable}
    />
  )
}

export default Operaciones
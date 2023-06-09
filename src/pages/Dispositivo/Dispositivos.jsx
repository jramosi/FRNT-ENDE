import React from 'react'
import CrudPage from '../../common/CrudPage';
import KEYQUERY from '../../constants/KeyQueries';
import { createDispositivo, deleteDispositivo, getDispositivos, updateDispositivo } from '../../services/DispositivoService';
import fieldsForm from './fieldsFormDispositivo';

const Dispositivos = () => {

  /**columnas a mostrar de la tabla*/
  const columnsTable = [
    {
      title: 'Pin',
      dataIndex: 'codigo',
      key: 'codigo',
    },
    {
      title: 'Descripción',
      dataIndex: 'descripcion',
      key: 'descripcion',
    },
    {
      title: 'Agencia',
      dataIndex: 'descripcionAgencia',
      key: 'descripcionAgencia',
      render: (dispositivo, record) => (
        <>{record.agencia.descripcion}</>
      )
    },
  ];

  const appendDataToSend = { activo: true }

  return (
    <CrudPage
      titleHeader='Dispositivos'
      methodServiceList={getDispositivos}
      methodServiceCreate={createDispositivo}
      methodServiceDelete={deleteDispositivo}
      methodServiceUpdate={updateDispositivo}
      keyQuery={KEYQUERY.DISPOSITIVO}
      columnsTable={columnsTable}
      titleModalCreate="Crear nuevo Dispositivo"
      titleModalEdit="Editar Dispositivo"
      fieldsForm={fieldsForm}
      appendData={appendDataToSend}
      fieldRelation='agencia'
    />
  )
}

export default Dispositivos
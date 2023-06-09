import React from 'react'
import { createTipoUsuario, deleteTipoUsuario, getTiposUsuarios, updateTipoUsuario } from '../../services/TipoUsuarioService';
import KEYQUERY from '../../constants/KeyQueries';
import fieldsForm from './fieldsFormTipoUsuario';
import CrudPage from '../../common/CrudPage';

const TiposUsuarios = () => {
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

  /**Informacion adicional para enviarla con el formulario */
  const appendDataToSend = { activo: true}

  return (
    <CrudPage
      titleHeader='Tipo de usuario'
      methodServiceList={getTiposUsuarios}
      methodServiceCreate={createTipoUsuario}
      methodServiceDelete={deleteTipoUsuario}
      methodServiceUpdate={updateTipoUsuario}
      keyQuery={KEYQUERY.TIPO_USUARIO}
      columnsTable={columnsTable}
      titleModalCreate="Crear un nuevo tipo de usuario"
      titleModalEdit="Editar tipo de usuario"
      fieldsForm={fieldsForm}
      appendData={appendDataToSend}

      fieldRelation=''
    />
  )
}

export default TiposUsuarios
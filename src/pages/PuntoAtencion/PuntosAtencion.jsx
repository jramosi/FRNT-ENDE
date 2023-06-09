import { createPuntoAtencion, deletePuntoAtencion, getPuntosAtencionByAgencia, updatePuntoAtencion } from '../../services/PuntoAtencionService';
import { useAuthState } from '../../security/authentication/AuthContext';
import { ROLE } from '../../constants/RolPermission';
import fieldsForm from './fieldsFormPuntoAtencion';
import KEYQUERY from '../../constants/KeyQueries';
import CrudPage from '../../common/CrudPage';

const PuntosAtencion = () => {

  /**Obtenmos informacino del rol y la agencia(si la hubiese) desde el token */
  const { authorityCurrent, authorityCurrentDetail, agenciaAssigned, withAgenciaAssigned } = useAuthState()

  /**Parametros para la obtencion del listado por agencia y rol */
  const dataParams = { idRol: authorityCurrentDetail.id, idAgencia: withAgenciaAssigned ? agenciaAssigned.id : null }

  /**Informacion adicional para enviarla con el formulario,crear y editar*/
  const appendDataToSend = { activo: true }
  /**Si el usuario es admisnitrador de una agencia adicionamos la informacion al formulario  */
  if (withAgenciaAssigned && authorityCurrent === ROLE.ADMINISTRATION) {
    appendDataToSend['idAgencia'] = agenciaAssigned.id
  }

  /**columnas a mostrar de la tabla*/
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
      title: 'Agencia',
      dataIndex: 'descripcionAgencia',
      key: 'descripcionAgencia',
    },
  ];

  return (
    <CrudPage
      titleHeader='Puntos de Atención'
      methodServiceList={() => getPuntosAtencionByAgencia(dataParams)}
      methodServiceCreate={createPuntoAtencion}
      methodServiceDelete={deletePuntoAtencion}
      methodServiceUpdate={updatePuntoAtencion}
      keyQuery={KEYQUERY.PUNTO_ATENCION}
      columnsTable={columnsTable}
      titleModalCreate="Crear nuevo Punto de Atención"
      titleModalEdit="Editar Punto de Atención"
      fieldsForm={fieldsForm}
      appendData={appendDataToSend}
      fieldRelation='tipoTicket'
      fieldRelationToSendAsList={true}
    />
  )
}

export default PuntosAtencion
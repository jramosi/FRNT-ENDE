import { getUsuariosByRolAndAgencia } from '../../services/UsuarioService';
import { useAuthState } from '../../security/authentication/AuthContext';  
import CrudPageRedirect from '../../common/CrudPageRedirect';
import { ROLE } from '../../constants/RolPermission';
import KEYQUERY from '../../constants/KeyQueries';
import ROUTE from '../../constants/Routes';
import columnsTable from './ListUsuario';

const Usuarios = () => {
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

  return (
    <CrudPageRedirect
      titleHeader='Usuarios'
      methodServiceList={() => getUsuariosByRolAndAgencia(dataParams)}
      keyQuery={KEYQUERY.USUARIO}
      columnsTable={columnsTable}
      redirectToNewRecord={ROUTE.USUARIO_NEW}
      redirectToRecord={ROUTE.USUARIO_BY_ID}
    />
  )
}

export default Usuarios
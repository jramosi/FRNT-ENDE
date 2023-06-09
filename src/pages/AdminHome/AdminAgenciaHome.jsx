import { useAuthState } from '../../security/authentication/AuthContext'
import AgenciaDetail from './AgenciaDetail'

/**Vista principal para el administrador de agencia */
const AdminAgenciaHome = () => {

    /**Obtenmos informacino del rol y la agencia(si la hubiese) desde el token */
    const { authorityCurrent, authorityCurrentDetail, agenciaAssigned, withAgenciaAssigned } = useAuthState()

    return (
        <AgenciaDetail withRedirect={false} agenciaId={withAgenciaAssigned ? agenciaAssigned.id : 0} />
    )
}

export default AdminAgenciaHome
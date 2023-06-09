import React from 'react'
import { Alert } from 'antd';

import { getUsuarioUbicacionByUsuarioId } from '../../services/UsuarioUbicacionService'
import { useAuthState } from '../../security/authentication/AuthContext'
import { useGetDataServiceByParam } from '../../hooks/useDataService'
import { AtencionProvider } from '../../contexts/AtencionContext'
import AgenciaDetalle from './AgenciaDetalle'
import Loading from '../../common/Loading'
import Atencion from './Atencion'

const OperadorPuntoAtencion = () => {

  const user = useAuthState();
  const { data: usuarioUbicacionFetch, error, message, loading } = useGetDataServiceByParam(getUsuarioUbicacionByUsuarioId, user.id)
  const { agencia = {}, puntoAtencion = {} } = usuarioUbicacionFetch

  if (loading) { return <Loading /> }

  if (error) { return <Alert message={message} type="error" showIcon /> }

  if (usuarioUbicacionFetch.puntoAtencion === null || usuarioUbicacionFetch.puntoAtencion === undefined) {
    return <Alert className='mt_6' message="Error al obtener datos del Punto de atención. Contáctese con el administrador. " type="error" showIcon />
  }

  return (
    <div>
      <AgenciaDetalle agencia={agencia}/>
      <AtencionProvider>
        <Atencion agencia={agencia} puntoAtencion={puntoAtencion} />
      </AtencionProvider>
    </div>
  )
}

export default OperadorPuntoAtencion
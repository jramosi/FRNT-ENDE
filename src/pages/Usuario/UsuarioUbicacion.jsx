import React from 'react'
import { Card, Alert, Typography, Button } from 'antd';

import { getUsuarioUbicacionByUsuarioId, quitAgencia, quitPuntoAtencion } from '../../services/UsuarioUbicacionService';
import { useGetDataServiceByParam } from '../../hooks/useDataService';
import AssignmentPuntoAtencion from './AssignmentPuntoAtencion';
import { notifySimple } from '../../common/NotifyToast';
import OperadorIcon from '../../common/OperadorIcon';
import { ROLE } from '../../constants/RolPermission';
import AssignmentAgencia from './AssignmentAgencia';
import Loading from '../../common/Loading';

const { Title, Text } = Typography;
const { Meta } = Card;

const RenderPuntoAtencion = ({ usuarioUbicacionFetch, user, handleData }) => {
    /**Verificamos si al usuario le corresponde asigancion de punto de atencion ,esto por el rol*/
    const foundRole = user.roles.find(role => role.nameRole === ROLE.OPERATOR);
    if (foundRole === undefined) {
        return <p>No le corresponde punto de atención.</p>
    }

    /**Habilitamos la opcion de asigancion si el usuario no tiene un punto de atencion*/
    if (usuarioUbicacionFetch.puntoAtencion === null || usuarioUbicacionFetch.puntoAtencion === undefined) {
        return (<AssignmentPuntoAtencion agencia={usuarioUbicacionFetch.agencia} user={user} handleData={handleData} />)
    }

    /**Retornamos el punto de atencion asignado al usuario mas metodo para dera el punto de atencion*/
    const quitPunto = async (usuarioUbicacionFetch) => {
        const { error, message } = await quitPuntoAtencion(usuarioUbicacionFetch.id)
        if (!error) {
            notifySimple('success', message)
            handleData()
        }
    }

    return (
        <>
            <Card hoverable>
                <Meta
                    avatar={<OperadorIcon width={50} />}
                    title={usuarioUbicacionFetch.puntoAtencion.codigo}
                />
                <Title className='mt_1' level={5}>{usuarioUbicacionFetch.puntoAtencion.descripcion}</Title>
                <div className='text_center'>
                    <Button type="text" danger onClick={() => quitPunto(usuarioUbicacionFetch)}>Desvincular</Button>
                </div>
            </Card>
        </>
    )
}

/**Ese componente es para roles como:Admin de agencia y operador */
const UsuarioUbicacion = (props) => {

    const { dataUsuario: user, handleData } = props

    /**Obtenemos la ubicacion del usuario*/
    const { data: usuarioUbicacionFetch = {}, error, message, status, loading } = useGetDataServiceByParam(getUsuarioUbicacionByUsuarioId, user.id)

    if (loading) return <Loading />

    /**Verificamos si existe un error y si es distinto de 404 */
    if (error && status !== 404) { return <Alert className='mt_4' message={message} type="warning" showIcon /> }

    /**Verificamos si existe el registro ,cuando esta  sin agencia ni punto de atencion*/
    if (status == 404) { return <AssignmentAgencia user={user} handleData={handleData} /> }

    const handleQuitUsuarioUbicacionAgencia = async (usuarioUbicacionId) => {
        const { error, message } = await quitAgencia(usuarioUbicacionId)
        if (!error) {
            notifySimple('success', message)
            handleData()
        }
        else { return <Alert className='mt_4' message={message} type="warning" showIcon /> }
    }
    
    return (
        <Card className='card_list'>
            <Title level={5}>{usuarioUbicacionFetch.agencia.descripcion}</Title>
            <Text> {usuarioUbicacionFetch.agencia.direccion}</Text>
            <div className='text_center mt_1 mb_1'>
                <Button danger onClick={() => handleQuitUsuarioUbicacionAgencia(usuarioUbicacionFetch.id)}>Desvincular</Button>
            </div>
            <RenderPuntoAtencion usuarioUbicacionFetch={usuarioUbicacionFetch} user={user} handleData={handleData} />
        </Card>
    )
}

export default UsuarioUbicacion
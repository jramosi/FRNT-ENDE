import { List, Card, Button, Result, Typography, Alert, Space } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';

import { getUsuarioUbicacionByUsuarioId, quitAgencia, quitPuntoAtencion } from '../../services/UsuarioUbicacionService';
import { useAuthDispatch, useAuthState } from '../../security/authentication/AuthContext';
import { usePanelOperadorDispatch } from '../../contexts/PanelOperadorContext';
import { useGetDataServiceByParam } from '../../hooks/useDataService';
import { HasAccessRol } from '../../hooks/useRolePermission';
import { ROLE } from '../../constants/RolPermission';
import OperadorIcon from '../../common/OperadorIcon';
import RedirectTo from '../../common/RedirectTo';
import ROUTE from '../../constants/Routes';
import Loading from '../../common/Loading';
import types from '../../types';

const { Title } = Typography;

const OperadorUbicacion = () => {

    const user = useAuthState();
    const authDispatch = useAuthDispatch()
    const panelDispatch = usePanelOperadorDispatch();

    const { data: usuarioUbicacionFetch = {}, error, message, status, loading, handleData } = useGetDataServiceByParam(getUsuarioUbicacionByUsuarioId, user.id)
    const { agencia, puntoAtencion, id } = usuarioUbicacionFetch;

    const handleNewUsuarioUbicacion = () => {
        panelDispatch({ type: types.newUsuarioUbicacion });
    }

    const handleQuitUsuarioUbicacionPunto = async (usuarioUbicacionId) => {
        const { error, message } = await quitPuntoAtencion(usuarioUbicacionId)
        if (!error) { handleData(); }
        else { return <Alert className='mt_4' message={message} type="warning" showIcon /> }
    }
    const handleQuitUsuarioUbicacionAgencia = async (usuarioUbicacionId) => {
        const { error, message } = await quitAgencia(usuarioUbicacionId)

        if (!error) {
            authDispatch({ type: types.logout })
        }
        else { return <Alert className='mt_4' message={message} type="warning" showIcon /> }
    }

    if (loading) { return <Loading /> }

    if (error && status!==404) { return <Alert className='mt_4' message={message} type="warning" showIcon /> }

    /**Verificamos si el usuario esta asociado a algun punto de atencion */
    if (usuarioUbicacionFetch.puntoAtencion === null || usuarioUbicacionFetch.puntoAtencion === undefined) {
        return (
            <Card className='card_list mt_1 animate__animated animate__fadeInUp'>
                <Result
                    style={{ padding: 0 }}
                    status="warning"
                    title="Sin punto de atención."
                    extra={
                        <Space
                            direction="vertical"
                            size="middle"
                        >
                            <Button type="primary" onClick={handleNewUsuarioUbicacion}>Seleccionar un punto de atención</Button>
                            {id ? <Button danger onClick={() => handleQuitUsuarioUbicacionAgencia(id)}>Abandonar Agencia</Button> : <></>}
                        </Space>
                    }
                />
            </Card>
        )
    }


    return (
        <>
            <Card className="mt_1 animate__animated animate__fadeInUp">
                <List  >
                    <List.Item
                        actions={[
                            <RedirectTo to={ROUTE.OPERADOR_PUNTO_ATENCION}>
                                <Button className='text_center' type='primary' icon={<ArrowRightOutlined />}>Continuar</Button>
                            </RedirectTo>
                        ]}
                    >
                        <List.Item.Meta
                            avatar={<OperadorIcon width="128" type='success' />}
                            description={<>
                                <Title style={{ marginBottom: 0 }} level={4}>{puntoAtencion.codigo}</Title>
                                <Title style={{ marginTop: 0 }} level={5}>{puntoAtencion.descripcion}</Title>
                                <Title style={{ margin: 0 }} level={4}>{agencia.descripcion}</Title>
                                <Title style={{ margin: 0 }} level={5}>{agencia.direccion}</Title>
                            </>}
                        />
                    </List.Item >
                </List>
            </Card>
            <HasAccessRol deny={true} roles={ROLE.ADMINISTRATION}>
                <div className='mt_2 mt_1 animate__animated animate__fadeInUp' style={{ textAlign: 'end' }}>
                    <Button type="text" onClick={() => handleQuitUsuarioUbicacionPunto(id)}>Abandonar punto de atención</Button>
                    <Button type="text" danger onClick={() => handleQuitUsuarioUbicacionAgencia(id)}>Abandonar Agencia</Button>
                </div>
            </HasAccessRol>
        </>
    )
}

export default OperadorUbicacion
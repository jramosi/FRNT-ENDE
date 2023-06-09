import React, { useState } from 'react';
import { Space, Card, Badge, Typography, Button, Drawer, Alert, Divider } from 'antd';

import { createUsuarioUbicacion, getUsuarioUbicacionByAgenciaId } from '../../services/UsuarioUbicacionService';
import { useGetDataServiceByParam } from '../../hooks/useDataService';
import { getAgencia } from '../../services/AgenciaService';
import { getIdsPuntosAtencion } from '../../util/helpers';
import { notifySimple } from '../../common/NotifyToast';
import OperadorIcon from '../../common/OperadorIcon';
import Loading from '../../common/Loading';
import RedirectTo from '../../common/RedirectTo';
import ROUTE from '../../constants/Routes';

const { Title } = Typography;
const { Meta } = Card;

const AssignmentPuntoAtencion = (props) => {
    const { agencia, user, handleData } = props
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false)
    const [puntoAtencionSelected, setPuntoAtencionSelected] = useState(null)

    /**Obtenemos la agencia y todos sus puntos de atencion */
    const { data: agenciaFetch, loading: loadingA, error: errorA } = useGetDataServiceByParam(getAgencia, agencia.id);

    /**Obtenemos todas las ubicaciones de usuarios de la agencia actual */
    const { data: usuarioUbicacionByAgencia, loading: loadingUU, error: errorUU } = useGetDataServiceByParam(getUsuarioUbicacionByAgenciaId, agencia.id);

    if (loadingA || loadingUU) { return <Loading /> }
    if (errorA || errorUU) { return <Alert message="Error al obtener datos de la Agencia" type="error" showIcon /> }

    const puntosAtencioOcupadosIds = getIdsPuntosAtencion(usuarioUbicacionByAgencia)

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setLoading(false)
        setOpen(false);
    };

    const handlePuntoAtencionSelected = (puntoAtencion) => {
        setPuntoAtencionSelected(puntoAtencion)
        if (puntoAtencion === null)
            onClose()
    }

    const handleUbicacionOperadorConfirm = async () => {
        setLoading(true)
        const { error: errorUsuarioUbicacion, message: messageUsuarioUbicacion } = await createUsuarioUbicacion(
            {
                "puntoAtencion": { "id": puntoAtencionSelected.id },
                "usuario": { "id": user.id },
                "agencia": { "id": agencia.id },
                "activo": true
            }
        )
        if (!errorUsuarioUbicacion) {
            notifySimple('success', messageUsuarioUbicacion)
            onClose()
            handleData()
        }
        else {
            notifySimple('error', messageUsuarioUbicacion)
        }
    }

    const renderPuntoAtencion = (punto, index) => {
        if (puntosAtencioOcupadosIds.includes(punto.id)) {
            return (
                <div key={'punto-select' + index} className='animate__animated  animate__fadeInLeft'>
                    <Badge.Ribbon text="Ocupado" className='bg_danger'>
                        <Card className='card_list card_point bg_danger_light'>
                            <Meta
                                avatar={<OperadorIcon />}
                                title={punto.codigo}
                                description={punto.descripcion}
                            />
                        </Card>
                    </Badge.Ribbon>
                </div>
            )
        }
        return (
            <div key={'punto-select' + index} className='animate__animated  animate__fadeInLeft'>
                <Badge.Ribbon text="Libre" className='bg_success'>
                    <Card className="card_role_select" onClick={() => handlePuntoAtencionSelected(punto)}>
                        <Meta
                            avatar={<OperadorIcon />}
                            title={punto.codigo}
                            description={punto.descripcion}
                        />
                    </Card>
                </Badge.Ribbon>
            </div>
        )
    }

    const renderNoRecords = (agenciaFetch) => {
        if (!Array.isArray(agenciaFetch.puntoAtencion)) {
            return <></>
        }
        const { puntoAtencion = [] } = agenciaFetch
        if (puntoAtencion.length > 0) {
            return <></>
        }

        return (
            <Space style={{display:'flex' ,flexDirection:'column', alignItems:'center',justifyContent:'center'}}>
                <Alert
                    message="Sin  puntos de atención. "
                    description="La Agencia aún no cuenta con puntos de atención."
                    type="warning"
                    showIcon
                />
                <RedirectTo to={ROUTE.PUNTO_ATENCION} >
                    <Button type="link">Ir a puntos de atención.</Button>
                </RedirectTo>
            </Space>
        )

    }

    return (
        <>
            <Alert className='mb_1 mt_3' message="Usuario con rol OPERADOR. Puede vincularlo a un punto de atención." type="warning" showIcon />
            <Button type="primary" onClick={showDrawer} style={{ margin: '0 auto' }} block>
                Asignar Punto de Atención
            </Button>
            <Drawer title="Asignación de punto de atencion" placement="right" onClose={onClose} open={open} width={'100%'} destroyOnClose={true}>
                <>
                    <Title level={5}>Seleccione un punto de atención por favor.</Title>
                    <Space className='mt_1' style={{ justifyContent: 'center' }} size='large' wrap>
                        {agenciaFetch.puntoAtencion.map((punto, index) => renderPuntoAtencion(punto, index))}
                    </Space>
                    <Divider />
                    {renderNoRecords(agenciaFetch)}
                    {puntoAtencionSelected &&
                        <div style={{ textAlign: 'center', marginTop: 30 }}>
                            <Title level={3}>Selección: {puntoAtencionSelected.descripcion}</Title>
                            <Button type="text" danger onClick={() => handlePuntoAtencionSelected(null)}>Cancelar</Button>
                            <Button className='button_success' size='large' loading={loading} onClick={() => handleUbicacionOperadorConfirm()}>
                                Confirmar
                            </Button>
                        </div>
                    }
                </>
            </Drawer>
        </>
    )
}

export default AssignmentPuntoAtencion
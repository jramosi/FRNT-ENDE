import React from 'react'
import { Space, Card, Badge, Typography } from 'antd';

import { usePanelOperadorDispatch, usePanelOperadorState } from '../../contexts/PanelOperadorContext'
import { getUsuarioUbicacionByAgenciaId } from '../../services/UsuarioUbicacionService';
import { useGetDataServiceByParam } from '../../hooks/useDataService';
import { getIdsPuntosAtencion } from '../../util/helpers';
import OperadorIcon from '../../common/OperadorIcon';
import Loading from '../../common/Loading';
import types from '../../types';

const { Title } = Typography;
const { Meta } = Card;

const PuntoAtencionSelect = () => {

    const { agenciaSelected = {} } = usePanelOperadorState();
    const { puntoAtencion = [] } = agenciaSelected
    const panelDispatch = usePanelOperadorDispatch();

    const { data: usuarioUbicacionByAgencia, loading } = useGetDataServiceByParam(getUsuarioUbicacionByAgenciaId, agenciaSelected.id);

    if (loading) return <Loading />

    const puntosAtencioOcupadosIds = getIdsPuntosAtencion(usuarioUbicacionByAgencia)

    const handlePuntoAtencionSelected = (puntoAtencion) => {
        panelDispatch({ type: types.puntoAtencionSelected, puntoAtencion })
        panelDispatch({ type: types.nextStepAsignacion })
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

    return (
        <>
            <Title level={5}>Seleccione un punto de atención por favor.</Title>
            <Space className='mt_1' style={{ justifyContent: 'center' }} size='large' wrap>
                {puntoAtencion.map((punto, index) => renderPuntoAtencion(punto, index))}
            </Space>
        </>
    )
}

export default PuntoAtencionSelect
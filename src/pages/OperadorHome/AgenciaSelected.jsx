import React from 'react'
import { Typography, Avatar, Card, Space, Alert } from 'antd';
import { HomeOutlined } from '@ant-design/icons';

import { usePanelOperadorDispatch } from '../../contexts/PanelOperadorContext';
import { useAuthState } from '../../security/authentication/AuthContext';
import { useGetDataServiceByParam } from '../../hooks/useDataService';
import { getAgencia } from '../../services/AgenciaService';
import Loading from '../../common/Loading';
import types from '../../types';

const { Title } = Typography;
const { Meta } = Card;

const AgenciaSelected = () => {

    const { agenciaAssigned } = useAuthState()
    const panelDispatch = usePanelOperadorDispatch()
    const { data: agencia, loading, error, message } = useGetDataServiceByParam(getAgencia, agenciaAssigned.id);

    if (loading) return <Loading />
    if (error) return <Alert message={message} type="warning" showIcon />

    const handleAgenciaSelected = (agencia) => {
        panelDispatch({ type: types.agenciaSelected, agencia })
        panelDispatch({ type: types.nextStepAsignacion })
    }

    return (
        <>
            <Title level={5}>Seleccione la agencia por favor</Title>
            <Space className='mt_1' size='large' wrap style={{ justifyContent: 'center' }}>
                <Card key={'agencia-selected'} className="card_role_select card_agencia_select animate__animated  animate__fadeInLeft" onClick={() => handleAgenciaSelected(agencia)}>
                    <Meta
                        avatar={<Avatar className='bg_success' icon={<HomeOutlined />} />}
                        title={agencia.descripcion}
                        description={agencia.direccion}
                    />
                </Card>
            </Space>
        </>
    )
}

export default AgenciaSelected
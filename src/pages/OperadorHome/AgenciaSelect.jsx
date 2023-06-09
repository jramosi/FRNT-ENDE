import React from 'react'

import { Typography, Avatar, Card, Space,Alert } from 'antd';
import { HomeOutlined } from '@ant-design/icons';

import { usePanelOperadorDispatch } from '../../contexts/PanelOperadorContext';
import { useGetDataService } from '../../hooks/useDataService'
import {  getAgencias } from '../../services/AgenciaService';
import Loading from '../../common/Loading';
import types from '../../types';

const { Title } = Typography;
const { Meta } = Card;

const AgenciaSelect = () => {

    const panelDispatch = usePanelOperadorDispatch()

    const { data: agencias, loading ,error,message} = useGetDataService(getAgencias);

    const handleAgenciaSelected = (agencia) => {
        panelDispatch({ type: types.agenciaSelected, agencia })
        panelDispatch({ type: types.nextStepAsignacion })
    }

    if (loading) return <Loading/>
    if (error) return <Alert message={message} type="warning" showIcon />
    
    return (
        <>
            <Title level={5}>Seleccione una agencia por favor</Title>
            <Space className='mt_1' size='large' wrap style={{justifyContent:'center'}}>
                {agencias.map((agencia, index) => {
                    return (
                        <Card key={'agencia-select' + index} className="card_role_select card_agencia_select animate__animated  animate__fadeInLeft" onClick={() => handleAgenciaSelected(agencia)}>
                            <Meta
                                avatar={<Avatar className='bg_success' icon={<HomeOutlined />} />}
                                title={agencia.descripcion}
                                description={agencia.direccion}
                            />
                        </Card>
                    )
                })}
            </Space>

        </>
    )
}

export default AgenciaSelect
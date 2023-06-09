import React, { useState } from 'react'
import { Button, Drawer, Typography, Avatar, Card, Space, Alert, Divider } from 'antd';
import { createUsuarioUbicacion } from '../../services/UsuarioUbicacionService';
import { useGetDataService } from '../../hooks/useDataService';
import { getAgencias } from '../../services/AgenciaService';
import { notifySimple } from '../../common/NotifyToast';
import { HomeOutlined } from '@ant-design/icons';
import Loading from '../../common/Loading';

const { Title, Text } = Typography;
const { Meta } = Card;

const AssignmentAgencia = (props) => {
    const { user, handleData } = props
    const [open, setOpen] = useState(false);
    const [agenciaSelected, setAgenciaSelected] = useState(null)
    const [loading, setLoading] = useState(false)

    const { data: agencias, loading: loadingData, error, message } = useGetDataService(getAgencias);

    const showDrawer = () => { setOpen(true); };
    const onClose = () => {
        setOpen(false)
        setLoading(false)
    };

    const handleAgenciaSelected = (agencia) => {
        setAgenciaSelected(agencia)
        if (agencia === null)
            onClose()
    }

    const handleUbicacionConfirm = async () => {
        setLoading(true)
        const { error: errorUsuarioUbicacion, message: messageUsuarioUbicacion } = await createUsuarioUbicacion(
            {
                "usuario": { "id": user.id },
                "agencia": { "id": agenciaSelected.id },
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

    if (loadingData) return <Loading />
    if (error) return <Alert message={message} type="warning" showIcon />

    return (
        <>
            <Alert className='mb_2' message="Es necesario vincular al usuario con una Agencia." type="warning" showIcon />
            <Button type="primary" block onClick={showDrawer}>
                Vincular a Agencia
            </Button>
            <Drawer title="Agencias" placement="right" width={'100%'} onClose={onClose} open={open}>
                {agenciaSelected &&
                    <div style={{ textAlign: 'center' }}>
                        <Title level={3}>{agenciaSelected.descripcion}</Title>
                        <Text>{agenciaSelected.direccion}</Text><br />
                        <Button className='mt_2' type="text" danger onClick={() => handleAgenciaSelected(null)}>Cancelar</Button>
                        <Button className='' size='large'type='primary' loading={loading} onClick={() => handleUbicacionConfirm()}>
                            Confirmar Selección
                        </Button>
                        <Divider />
                    </div>
                }
                <Title level={5}>Seleccione una agencia para vincularla al usuario. </Title>
                <Space className='mt_1' size='large' wrap style={{ justifyContent: 'center' }}>
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
            </Drawer>
        </>
    )
}

export default AssignmentAgencia
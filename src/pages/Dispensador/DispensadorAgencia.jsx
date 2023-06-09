import React, { useState } from 'react'
import { Row, Col, Card, Modal, Alert, Button, Layout } from 'antd';
import { DoubleRightOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { newTicketEstadoTicket } from '../../services/TicketEstadoTicketService';
import { useGetDataServiceByParam } from '../../hooks/useDataService';
import { getTiposTicketsByAgencia } from '../../services/TipoTicketService'
import HeaderWave from '../../common/HeaderWave';
import LoadingTicket from './LoadingTicket';
import Loading from '../../common/Loading';
import TiposTickets from './TiposTickets';
import Ticket from './Ticket';

const ticketDefault = {
    codigoTicket: '',
    fechaRegistroTicket: '',
    exists: false
}
const { Meta } = Card;

const { Content, Header } = Layout;

const DispensadorAgencia = (props) => {
    const { agencia } = props
    const [tipoTicketSelected, setTipoTicketSelected] = useState(null)
    const [ticket, setTicket] = useState(ticketDefault)
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [isPreferencial, setIsPreferencial] = useState(null)

    const { data: tiposTickets, error: errorTiposTickets, loading: loadingTiposTickets } = useGetDataServiceByParam(getTiposTicketsByAgencia, agencia.id)

    const handleTipoTicketSelected = async (tipoTicket) => {
        setIsModalVisible(true)
        setTipoTicketSelected(tipoTicket)
        const dataToSend = { idAgencia: agencia.id, idTipoTicket: tipoTicket.id }
        const { data: ticketFecth = {}, error } = await newTicketEstadoTicket(dataToSend)

        if (!error) {
            setTicket({ ...ticketFecth, exists: true })
            setTipoTicketSelected(tipoTicket)
            setTimeout(function () {
                handleCancel()
            }, 3000);
        }
    }
    
    const handleCancel = () => {
        setIsModalVisible(false);
        setTicket(ticketDefault)
        setTipoTicketSelected({})
        setIsPreferencial(null)
    };
    const handleTipoTicketPrefencial = async (value) => {
        setIsPreferencial(value)
    }

    if (loadingTiposTickets) { return <Loading /> }

    if (errorTiposTickets) { return <Alert message="Error al obtener tipos de ticket de la Agencia" type="error" showIcon /> }
    return (
        <>
            <Header className='wave_container'>
                <HeaderWave agenciaDescripcion={agencia.descripcion} />
            </Header>

            <Content className='dispensador_container'>
                <main className='dispensador_main'>
                    {isPreferencial === null ?
                        <Row gutter={[24, 24]} className='menu_content'>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24} style={{ margin: '0 auto' }}>
                                <Card
                                    className={`card_tipo_ticket_select animate__animated  ${isModalVisible ? ' animate__fadeOutDown' : 'animate__fadeInDown'} `}
                                    onClick={() => handleTipoTicketPrefencial(false)}>
                                    <Meta title={<><DoubleRightOutlined style={{ marginRight: 5 }} />CLIENTE REGULAR</>} />
                                </Card>
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24} style={{ margin: '0 auto' }}>
                                <Card
                                    className={`card_tipo_ticket_select animate__animated  ${isModalVisible ? ' animate__fadeOutDown' : 'animate__fadeInDown'} `}
                                    onClick={() => handleTipoTicketPrefencial(true)}>
                                    <Meta title={<><DoubleRightOutlined style={{ marginRight: 5 }} />CLIENTE PREFERENCIAL</>} />
                                </Card>
                            </Col>
                        </Row>
                        :
                        <Row gutter={[24, 24]} className='menu_content'>
                            <TiposTickets tiposTickets={tiposTickets} isModalVisible={isModalVisible} isPreferencial={isPreferencial} handleTipoTicketSelected={handleTipoTicketSelected} />
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <Button
                                    shape="round"
                                    icon={<ArrowLeftOutlined />}
                                    className={`mt_5 animate__animated ${isModalVisible ? ' animate__fadeOutDown' : 'animate__fadeInDown'} `}
                                    onClick={() => handleTipoTicketPrefencial(null)}>
                                    Regresar
                                </Button>
                            </Col>

                        </Row>
                    }
                </main>
            </Content>
            <Modal centered closable={false} open={isModalVisible} onCancel={handleCancel} footer={null} destroyOnClose={true}
                bodyStyle={{ height: 300, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {ticket.exists ? <Ticket ticket={ticket} tipoTicketSelected={tipoTicketSelected} agencia={agencia} /> : <LoadingTicket />}
            </Modal>
        </>
    )
}

export default DispensadorAgencia
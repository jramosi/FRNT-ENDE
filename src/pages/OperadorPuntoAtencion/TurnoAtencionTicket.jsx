import React from 'react'
import { Typography, Space } from 'antd';
const { Title } = Typography;

const TurnoAtencionTicket = (props) => {
    const { ticketCurrent } = props

    const renderTicket = (
        <>
            <Title className='text_light'>{ticketCurrent?.numeroTicket || '-'}</Title>
            <Title className='text_light' level={3}>{ticketCurrent?.descTipoTicket || '-'} </Title>
            <Title className='text_light' level={5}>{ticketCurrent?.descPrioridad || '-'} </Title>
        </>
    )
    const renderNoTicket = <Title level={5}>Sin ticket asignado</Title>

    return (
        <div className={`ticket_display card_content ${ticketCurrent?'bg_secondary':'bg_secondary_light'}`}>
            <Space direction="vertical">
                {ticketCurrent ? renderTicket : renderNoTicket}
            </Space>
        </div>
    )
}

export default TurnoAtencionTicket
import React from 'react'
import { Card, Typography, Timeline } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';

import { useAtencionState } from '../../contexts/AtencionContext';

const { Text } = Typography;

const HistorialAtencion = () => {
    const { estadoTicketCurrent: data } = useAtencionState();
    return (
        <Card
            className='atencion_card card_list'
        >
            <Text italic style={{display: 'block'}} className='mt_2 text_center' >Historial de Ticket</Text>

            <Timeline className='px_1 mt_2 '>
                {data.map((item, index) =>
                    <Timeline.Item
                        key={"historial" + index}
                        dot={<ClockCircleOutlined style={{ fontSize: '16px', }} />}
                        className='animate__animated  animate__fadeInUp'>
                        {item.descEstado.toLowerCase()} {item.fechaInicio}
                    </Timeline.Item>
                )}
            </Timeline>
        </Card>
    )
}

export default HistorialAtencion
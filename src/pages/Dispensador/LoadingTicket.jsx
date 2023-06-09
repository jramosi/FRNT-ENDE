import React from 'react'
import { Typography, Spin } from 'antd';
import { LoadingOutlined, ClockCircleOutlined } from '@ant-design/icons';

const { Title } = Typography;

const antIcon = (<LoadingOutlined style={{ fontSize: 24, }} spin />);
const LoadingTicket = () => {
    return (
        <div style={{ textAlign: 'center' }}>
            <ClockCircleOutlined style={{ fontSize: 64, color: '#009e72' }} />
            <Title italic level={3}>POR FAVOR ESPERE</Title>
            <Title italic level={5}>Estamos procesando su información</Title>
            <Spin indicator={antIcon} />
        </div>
    )
}

export default LoadingTicket
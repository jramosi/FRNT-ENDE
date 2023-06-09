import React from 'react'
import { Card, Typography } from 'antd';
import { UserAddOutlined, UserDeleteOutlined } from '@ant-design/icons';

import { useAtencionState } from '../../contexts/AtencionContext';
import TicketsEnEspera from './TicketsEnEspera';
import TagIcon from '../../common/TagIcon';

const { Title, Text } = Typography;
const PuntoAtencion = (props) => {

    const { puntoAtencion } = props

    const { inAttention } = useAtencionState();

    const renderUnoccupied = <TagIcon style='tag_in_attention' label="Libre" icon={<UserAddOutlined />} color="green" />
    const renderOccupied = <TagIcon style='tag_in_attention' label="Ocupado" icon={<UserDeleteOutlined />} color="red" />

    return (
        <>
            <Card
                className='atencion_card card_list'
                style={{ textAlign: 'center'}}
            >
                <div className='card_content' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Title style={{ fontSize: '3rem' }}>{puntoAtencion.codigo}</Title>
                    <Text italic style={{ background: '' }}>{puntoAtencion.descripcion}</Text>
                    {inAttention ? renderOccupied : renderUnoccupied}
                </div>
            </Card >
            <TicketsEnEspera puntoAtencion={puntoAtencion} />
        </>
    )
}

export default PuntoAtencion
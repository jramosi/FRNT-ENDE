import React from 'react'
import { Card, Col } from 'antd';
import { DoubleRightOutlined } from '@ant-design/icons';

const { Meta } = Card;

const TiposTickets = ({ tiposTickets = [], isModalVisible, handleTipoTicketSelected, isPreferencial }) => {

    const filterTiposTickets = tiposTickets.filter(tipoTicket => tipoTicket.preferencial === isPreferencial)
    const size_col = 24;

    return filterTiposTickets.map((tipo, index) => (
        <Col xs={size_col} sm={size_col} md={size_col} lg={size_col} xl={size_col} key={'tt' + index} style={{ margin: '0 auto' }}>
            <Card
                className={`card_tipo_ticket_select animate__animated  ${isModalVisible ? ' animate__fadeOutDown' : 'animate__fadeInDown'} `}
                onClick={() => handleTipoTicketSelected(tipo)}>
                <Meta title={<><DoubleRightOutlined style={{ marginRight: 5 }} />{tipo.descripcion}</>} />
            </Card>
        </Col>
    ));
}

export default TiposTickets
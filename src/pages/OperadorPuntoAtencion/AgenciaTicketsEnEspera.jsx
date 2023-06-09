import React from 'react'
import { useSocket } from '../../hooks/useSocket'
import { Avatar, Badge, Button, Drawer, List, Statistic, Row, Col } from 'antd';
import { useState } from 'react';

const AgenciaTicketsEnEspera = (props) => {

    const { agencia } = props
    const [open, setOpen] = useState(false);
    const { isConnected, data: dataSocket } = useSocket(`/channel/punto_atencion/allTicketsEspera/${agencia.id}`)
    const { cantidadTicket = [], tickets = [], totalTicket = 0 } = dataSocket

    const showDrawer = () => { setOpen(true); };
    const onClose = () => { setOpen(false); };

    if (!(Array.isArray(cantidadTicket) && Array.isArray(tickets))) {
        return <p>Error</p>
    }

    const titleDrawer = (
        <Row gutter={16}>
            <Col span={12}>
                <Statistic title="Tickets" value='En Espera' />
            </Col>
            <Col span={12}>
                <Statistic title="Total" value={totalTicket} />
            </Col>
        </Row>
    )

    return (
        <>
            <Badge count={totalTicket}>
                <Button type="primary" onClick={showDrawer} className='button_secondary' style={{ border: '0' }}>
                    TICKETS en espera
                </Button>
            </Badge>
            <Drawer title={titleDrawer} placement="right" onClose={onClose} open={open}>
                <List
                    itemLayout="horizontal"
                    dataSource={cantidadTicket}
                    renderItem={(item, index) => (
                        <List.Item
                            actions={[
                                <Badge size='default' count={item.cantidad} color="blue" >
                                    <Avatar shape="square" className={`bg_color_${index}`}>
                                        {item.codigoTicket}
                                    </Avatar>
                                </Badge>
                            ]}
                        >
                            <List.Item.Meta title={<>{item.descripcion}</>} />
                        </List.Item>
                    )}
                />
            </Drawer>
        </>
    )
}

export default AgenciaTicketsEnEspera
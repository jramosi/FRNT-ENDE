import React from 'react'
import { Col, Row, Spin } from 'antd';
import PuntoAtencion from './PuntoAtencion';
import TurnoAtencion from './TurnoAtencion';
import HistorialAtencion from './HistorialAtencion';
import { useCheckPendingTicket } from '../../hooks/useTicket';

const Atencion = (props) => {

    const { puntoAtencion } = props
    const { loading } = useCheckPendingTicket(puntoAtencion)

    return (
        <Spin spinning={loading} tip="Verificando si hay ticket pendiente.">
            <Row gutter={[8, 8]}>
                <Col xs={24} sm={24} md={8} lg={5} xl={5}>
                    <PuntoAtencion puntoAtencion={puntoAtencion} />
                </Col>
                <Col xs={24} sm={24} md={16} lg={14} xl={14}>
                    <TurnoAtencion puntoAtencion={puntoAtencion} />
                </Col>
                <Col xs={24} sm={24} md={24} lg={5} xl={5}>
                    <HistorialAtencion />
                </Col>
            </Row>
        </Spin>
    )
}

export default Atencion
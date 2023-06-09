import React from 'react'
import { List, Card, Badge, Tag } from 'antd';
import StopWatchSimple from '../../common/StopWatchSimple';

/**Operador del punto de atencion */
const Operador = ({ puntoAtencion }) => {
    if (puntoAtencion.usuarioUbicacion.length > 0) {
        const { usuario } = puntoAtencion.usuarioUbicacion[0]
        return <p>Operador: {usuario.nombre} {usuario.primerApellido}</p> || 'Sin nombre'
    }
    return <p>{'Operador: ninguno'} </p>
}

/**Estado del punto de atencion */
const StatePuntoAtencion = ({ puntoAtencion }) => {
    const { usuarioUbicacion, free, tiempoEnAtencionSeg } = puntoAtencion
    if (usuarioUbicacion.length > 0) {
        if (!free && tiempoEnAtencionSeg === null)
            return <Badge status="warning" text="Llamando..." />

        if (!free)
            return <>
                <Badge status="processing" text="En Atencion" />
                <br />
                <StopWatchSimple timeCurrent={tiempoEnAtencionSeg} />
            </>

        return <Badge status="success" text="Libre" />
    }
    return <Badge status="default" text="Sin operador asignado" />
}

/**Tipos de ticket asiognados al punto de atencion */
const TipoTicket = ({ puntoAtencion }) => {
    const { tipoTicket = [] } = puntoAtencion
    return (
        <div>
            {tipoTicket.map((tipo) => <Tag color="volcano">{tipo.codigoTipoTicket}</Tag>)}
        </div>
    )
}

/**Componente Princiapl , detalle de un Punto de Atencion */
const PuntoAtencionDetail = (props) => {

    const { puntoAtencion } = props

    return (
        <List.Item>
            <Card title={`${puntoAtencion.codigo} - ${puntoAtencion.descripcion}`} >
                <TipoTicket puntoAtencion={puntoAtencion} />
                <Operador puntoAtencion={puntoAtencion} />
                <StatePuntoAtencion puntoAtencion={puntoAtencion} />
            </Card>
        </List.Item>
    )
}

export default PuntoAtencionDetail
import { List, Card, Badge } from 'antd';

import ButtonIconRedirectById from '../../common/ButtonIconRedirectById';
import ROUTE from '../../constants/Routes';

const AgenciaDetailCompact = (props) => {

    const { item } = props
   // console.log("ITEM",item);
    const counPuntosAtencion = (puntosAtencion = [], free = true) => {
        let countFree = 0
        let countOccupied = 0
        puntosAtencion.forEach(element => {
            if (element.free)
                countFree++
            else
                countOccupied++
        });
        return free ? countFree : countOccupied
    }

    return (
        <List.Item>
            <Card title={`${item.codigo} - ${item.descripcion}`} >
                <p>Puntos de atención: {item.puntoAtencion.length}</p>
                <Badge status="warning" text={`En Atención: ${counPuntosAtencion(item.puntoAtencion, false)}`} /> <br />
                <Badge status="success" text={`Libres:  ${counPuntosAtencion(item.puntoAtencion)}`} /><br /> <br />
                <ButtonIconRedirectById label='Ver detalle' id={item.id} path={ROUTE.ADMIN_AGENCIA_BY_ID} />
            </Card>
        </List.Item>
    )
}

export default AgenciaDetailCompact
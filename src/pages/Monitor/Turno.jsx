import { useEffect, useState } from 'react';
import { Card, Typography, Divider } from 'antd';
import ReactHowler from 'react-howler'

import soundCall from '../../assets/sound/soundCall.ogg'
import { ESTADO } from '../../constants/Ticket';

const { Title } = Typography;
let player = null

const Turno = (props) => {
    const { ticket } = props
    const [isCalling, setIsCalling] = useState(false)
    const fontSize='2.5rem'

    useEffect(() => {
        //*Verificamos si el estadoTicket esta en LLAMADO y es el ticket emisor
        if ((ticket.codEstado === ESTADO.LLAMADO || ticket.codEstado === ESTADO.ASIGNADO) && ticket.emisor) {
            //*Activamos el sonido
            setIsCalling(true)
            //*Desactivamos el sonido en 3s porque nuestro sonido dura 2s ,asi evitamos conflictos
            setTimeout(() => handleStop(), 1000)
        }
    }, [ticket])

    const handleStop = () => {
        player.stop()
        setIsCalling(false)
    }

    return (
        <>
            <ReactHowler src={soundCall} playing={isCalling} ref={(ref) => (player = ref)} />
            <Card className={ticket.style}>
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <Title style={{ margin: 0, fontSize, fontWeight: 700, color: '#172a4f' }} >{ticket.numero}</Title>
                    <Divider type='vertical' plain style={{ height: 55, borderLeft: '1px solid #172a4f' }} />
                    <Title style={{ margin: 0, fontSize, fontWeight: 700, color: '#009E72' }} >{ticket.puntoAtencion.codigo}</Title>
                </div>
            </Card>
        </>
    )
}

export default Turno
import { useEffect, useState } from 'react';
import { ESTADO } from '../../constants/Ticket';
import { useSocket } from '../../hooks/useSocket';
import Turno from './Turno';

const TurnosDefault = (props) => {

    const { agencia } = props
    //*Array de turnos(tickets+punto de atencion) visibles en el monitor
    const [dataTurnos, setDataTurnos] = useState([])

    //*Data recibida del websocket
    const { data: dataSocket, isConnected } = useSocket(`/channel/monitor/${agencia.id}`)

    //*Cada vez que dataSoclet cambie se dispare el metodo
    useEffect(() => {
        if (isConnected && (Array.isArray(dataSocket.listaTickets))) {
            dataToRender(dataSocket)
        }
    }, [dataSocket])

    const getCountCall = (count) => {
        const newCount = count + 1
        if (newCount <= 3)
            return newCount
        return 1
    }

    const dataToRender = (dataSocket) => {
        //Verificamos que dataTurnos no este vacio
        if (dataTurnos.length > 0) {
            //Buscamos ticketemisor en dataTurnos
            const ticketDataTurnos = searchTicketById(dataTurnos, dataSocket.ticketEmisor)
            //Buscamos ticketemisor en dataSocket
            const ticketDataSocket = searchTicketById(dataSocket.listaTickets, dataSocket.ticketEmisor)

            //Verificamos si ticketEmisor esta en dataTurnos. Si no lo esta lo añadimos a dataTurnos
            if (ticketDataTurnos) {
                //ticketEmisor esta en dataTurnos => Lo Actualizamos o eliminamos de dataTurnos
                //Verificar si ticketEmisor esta en dataSocket,si no lo estA lo eluminamos de dataTurnos
                if (ticketDataSocket) {
                    // ACCION: ACTUALIZAR
                    setDataTurnos(
                        dataTurnos.map(ticket => {
                            if (ticket.idTicket === dataSocket.ticketEmisor) {
                                ticketDataSocket.countCall = getCountCall(ticket.countCall)//Para resetar las llamadas(estilos) 
                                ticketDataSocket.style = styleTurno(ticketDataSocket)
                                ticketDataSocket.emisor = true
                                return ticketDataSocket
                            }
                            ticket.emisor = false
                            return ticket;
                        })
                    )
                } else {
                    // ACCION: ELIMINAR
                    setDataTurnos(data => data.filter(ticket => ticket.idTicket !== dataSocket.ticketEmisor))
                }
            } else {
                // ACCION:AGREGAR
                if (ticketDataSocket) {
                    ticketDataSocket.countCall = 1
                    ticketDataSocket.style = styleTurno(ticketDataSocket)
                    ticketDataSocket.emisor = true
                    setDataTurnos(data => [ticketDataSocket, ...data])
                }
            }
        } else {
            setDataTurnos(
                dataSocket.listaTickets.map((ticket, index) => {
                    ticket.countCall = 1
                    ticket.style = styleTurno(ticket)
                    ticket.emisor = false
                    if (index === 0) {
                        ticket.emisor = true
                    }
                    return ticket;
                })
            )
        }
    }

    const searchTicketById = (listaTickets, ticketId) => {
        return listaTickets.find((ticket) => ticket.idTicket === ticketId);
    }

    const styleTurno = (ticket = {}) => {
        const countCall = ticket.countCall || 1
        let styles = 'card_turno'
        if (ticket.codEstado === ESTADO.ASIGNADO)//asigancion de ticket
            styles = `card_turno animated_flash_${countCall} animate__animated animate__fadeInDown`
        if (ticket.codEstado === ESTADO.LLAMADO)//lammar ticket 
            styles = `card_turno animated_flash_${countCall}`

        return styles
    }

    const styleTurnosContainer = () => {
        if (dataTurnos.length > 0) {
            return 'turnos_default_content'
        }
        return 'turnos_default_no_content'
    }

    return (
        <>
            <div className={!isConnected ? 'status_bar_error' : ''}></div>
            <section className={styleTurnosContainer()}>
                {dataTurnos.map((item) => <Turno key={item.idTicket} ticket={item} />)}
            </section>
        </>
    )
}


export default TurnosDefault
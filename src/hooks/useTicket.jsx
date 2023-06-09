import { useState, useEffect } from "react";

import { verificarTicketPendiente } from "../services/TicketEstadoTicketService";
import { useAtencionDispatch } from "../contexts/AtencionContext";
import { ACTION, ESTADO } from "../constants/Ticket";
import types from "../types";

export const useCheckPendingTicket = (puntoAtencion) => {

    const [loading, setLoading] = useState(true)

    const dispatchAtencion = useAtencionDispatch()

    useEffect(() => { getVerificarTicketPendiente() }, [])

    const getVerificarTicketPendiente = async () => {
        const { data, error, message } = await verificarTicketPendiente(puntoAtencion.id);
        // =========== Verificamos Si hay ticket pendiente
        if (!error && data !== undefined) {

            //1. Obtenemos Ticket
            const ticketCurrent = data.informacionTicket || null

            //2. Obtenemos estado del ticket
            const estadoTicketCurrent = data.historial || []

            //3.Obtener las acciones 
            let actions = []
            if (estadoTicketCurrent.length > 0) {
                const ultimoEstado = estadoTicketCurrent[estadoTicketCurrent.length - 1]

                if (ultimoEstado.codEstado === ESTADO.ASIGNADO || ultimoEstado.codEstado === ESTADO.LLAMADO) {
                    actions = [ACTION.CALL_AGAIN, ACTION.START_ATTENTION, ACTION.CANCEL];
                }
                if (ultimoEstado.codEstado === ESTADO.ATENDIENDO) {
                    actions = [ACTION.REGISTER_CLIENT, ACTION.END_ATTENTION];
                }
            }

            dispatchAtencion({ type: types.restoreTicket, ticket: ticketCurrent, estadoTicket: estadoTicketCurrent, actions })
        }
        setLoading(false)
    }

    return { loading }
}
import React, { useState } from 'react'
import { Card, Modal } from 'antd';

import { nextTicketEstadoTicket, updateTicketEstadoTicket } from '../../services/TicketEstadoTicketService';
import { useAtencionDispatch, useAtencionState } from '../../contexts/AtencionContext';
import { useAuthState } from '../../security/authentication/AuthContext';
import { TurnoAtencionActions } from './TurnoAtencionActions';
import { notifySimple } from '../../common/NotifyToast';
import TurnoAtencionTicket from './TurnoAtencionTicket';
import ClienteRegister from './ClienteRegister';
import types from '../../types';
import Confirm from './Confirm';

import { ESTADO } from '../../constants/Ticket';
import StopWatch from '../../common/StopWatch';

const TurnoAtencion = (props) => {

    const [isModalOpenConfirm, setIsModalOpenConfirm] = useState(false);
    const [isVisibleStopWatch, setIsVisibleStopWatch] = useState(false)
    const user = useAuthState()
    const { puntoAtencion = {} } = props
    const { actionsCurrent, ticketCurrent } = useAtencionState();
    const attentionDispatch = useAtencionDispatch();
    /* Metodo para las asignacion de ticket */
    const actionCallNext = async () => {
        const dataToSend = { "idPuntoAtencion": puntoAtencion.id, "idUsuario": user.id }
        const { data, error, message } = await nextTicketEstadoTicket(dataToSend)
        if (!error) {
            const { informacionTicket, historial } = data
            attentionDispatch({ type: types.callNext, ticket: informacionTicket, estadoTicket: historial });
        } else {
            notifySimple('error', message)
        }
    }

    /* Metodo para la actualizacion del estado del ticket  */
    const actionUpdateEstadoTicket = async (codEstado, type) => {
        const dataToSend = {
            idTicket: ticketCurrent.idTicket,
            codEstado: codEstado,
            idPuntoAtencion: puntoAtencion.id
        }
        const { data: ticketFetch, error, message } = await updateTicketEstadoTicket(dataToSend)
        if (!error && ticketFetch) {
            /**Activando cronometro si corresponde */
            if (ESTADO.ATENDIENDO === codEstado) { setIsVisibleStopWatch(true) }
            if (ESTADO.FINALIZADO === codEstado) { setIsVisibleStopWatch(false) }
            const { historial } = ticketFetch
            attentionDispatch({ type, estadoTicket: historial });
        } else {
            notifySimple('error', message)
        }
    }
    /* Metodo para abrir el registro */
    const actionRegisterCliente = () => {
        attentionDispatch({ type: types.openRegister, open: true })
    }
    /**Metode confirmacion */
    const actionConfirm = () => {
        setIsModalOpenConfirm(true)
    }

    return (
        <>
            <Card
                className='atencion_card card_list'
                style={{ textAlign: 'center' }}
                actions={TurnoAtencionActions(actionsCurrent, actionCallNext, actionUpdateEstadoTicket, actionRegisterCliente, actionConfirm)}
            >
                <TurnoAtencionTicket ticketCurrent={ticketCurrent} />
            </Card>
            <ClienteRegister />
            <Confirm
                isModalOpenConfirm={isModalOpenConfirm}
                handleOpen={() => setIsModalOpenConfirm()}
                actionUpdateEstadoTicket={actionUpdateEstadoTicket}
            />
            {isVisibleStopWatch?<StopWatch start={isVisibleStopWatch}/>:<></>}
        </>
    )
}

export default TurnoAtencion
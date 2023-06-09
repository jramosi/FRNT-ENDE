import produce from 'immer'
import { ACTION } from '../constants/Ticket'
import types from '../types'

const defaultAttention = {
    actionsCurrent: [ACTION.CALL_NEXT],
    ticketCurrent: null,
    estadoTicketCurrent: [],
    inAttention: false,
    openRegister: false,
    clienteCurrent: null,
    openConsulta: false,
    consultaCurrent: null,
    loading: false
}

export const atencionInitialState = {
    ...defaultAttention
}

export const AtencionReducer = produce((state = {}, action) => {
    switch (action.type) {
        case types.callNext:
            state.actionsCurrent = [ACTION.CALL_AGAIN, ACTION.START_ATTENTION, ACTION.CANCEL];
            state.ticketCurrent = action.ticket
            state.estadoTicketCurrent = action.estadoTicket
            state.inAttention = true
            return state;

        case types.callAgain:
            state.estadoTicketCurrent = action.estadoTicket
            return state;

        case types.startAttention:
            state.actionsCurrent = [ACTION.REGISTER_CLIENT, ACTION.END_ATTENTION]
            state.estadoTicketCurrent = action.estadoTicket
            return state;

        case types.endAttention:
            state = defaultAttention
            return state;

        case types.cancel:
            state = defaultAttention
            return state;

        case types.openRegister:
            state.openRegister = action.open
            return state;

        case types.clienteRegistered:
            state.clienteCurrent = action.cliente
            state.openConsulta = true
            return state;

        case types.consultaRegistered:
            state.consultaCurrent = action.consulta
            return state;

        case types.restoreTicket:
            state.ticketCurrent = action.ticket
            state.estadoTicketCurrent = action.estadoTicket
            state.estadoTicketCurrent = action.estadoTicket
            state.actionsCurrent = action.actions
            state.inAttention = true
            return state;

        default:
            return state;
    }
})
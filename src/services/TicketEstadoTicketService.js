import axios from "axios";
import ENDPOINT from "../constants/EndPoints";
import { formatRequestError, formatResponseSuccess } from "../util/apiResponseRequest";
import { endPointReplaceId } from "../util/helpers";


/**
 * @param {idAgencia,idTipoTicket} data 
 * @returns 
 */
export const newTicketEstadoTicket = async (data) => {
    try {
        const response = await axios.post(ENDPOINT.TICKET_ESTADO_TICKET_NEW, data);
        return formatResponseSuccess(response)
    } catch (error) {
        return formatRequestError(error)
    }
}

/**
 * @param {"idTicket": 3, "codEstado": 4,"idPuntoAtencion":2} data 
 * @returns historial del ticket
 */
export const updateTicketEstadoTicket = async (data) => {
    try {
        const response = await axios.post(ENDPOINT.TICKET_ESTADO_TICKET_UPDATE, data);
        return formatResponseSuccess(response)
    } catch (error) {
        return formatRequestError(error)
    }
}

/**Asignacion de un ticket a un punto de atencion
 * @param {idPuntoAtencion,idUsuario} data 
 * @returns 
 */
export const nextTicketEstadoTicket = async (data) => {
    try {
        const response = await axios.post(ENDPOINT.TICKET_ESTADO_TICKET_NEXT, data);
        return formatResponseSuccess(response)
    } catch (error) {
        return formatRequestError(error)
    }
}

/**Asignacion de un ticket a un punto de atencion
 * @param {idAgencia,} data 
 * @returns 
 */
export const monitorTicketEstadoTicketByAgencia = async () => {
    try {
        const response = await axios.get(ENDPOINT.TICKET_ESTADO_TICKET_MONITOR_BY_AGENCIA_ID);
        // console.log(response);
        return formatResponseSuccess(response, 'LIST')
    } catch (error) {
        return formatRequestError(error)
    }
}

/** Verrificar si un punto de atencion tiene un ticket pendiente
 * @param idPuntoAtencion
 * @returns 
 */
export const verificarTicketPendiente = async (idPuntoAtencion) => {
    try {
        const response = await axios.get(endPointReplaceId(ENDPOINT.TICKET_ESTADO_TICKET_PENDIENTE, idPuntoAtencion));
        return formatResponseSuccess(response)
    } catch (error) {
        return formatRequestError(error)
    }
}

/**
 * 
 * @param {*} estadoId 
 * @param {*} agenciaId 
 * @param {*} fecha 
 * @returns 
 */
export const getQuantityTicketByEstadoAndAgencia = async (estadoId, agenciaId, fecha) => {
    try {
        const response = await axios.get(endPointReplaceId(ENDPOINT.TICKET_ESTADO_TICKET_BY_AGENCIA + `estado/${estadoId}/agencia/${agenciaId}/fecha/2022-10-06`));
        return formatResponseSuccess(response)
    } catch (error) {
        return formatRequestError(error)
    }
}

/**
 * 
 * @param {*} estadoId 
 * @param {*} agenciaId 
 * @param {*} fecha 
 * @returns 
 */
export const getQuantityTicketByAgencia = async (agenciaId, fecha) => {
    try {
        const response = await axios.get(endPointReplaceId(ENDPOINT.TICKET_ESTADO_TICKET_BY_AGENCIA + `agencia/${agenciaId}/fecha/${fecha}`));
        return formatResponseSuccess(response)
    } catch (error) {
        return formatRequestError(error)
    }
}
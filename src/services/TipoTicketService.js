import axios from "axios";
import ENDPOINT from "../constants/EndPoints";
import { FORMAT_DATA } from "../constants/Response";
import { formatRequestError, formatResponseSuccess } from "../util/apiResponseRequest";
import { endPointReplaceId } from "../util/helpers";


export const getTiposTickets = async () => {
    try {
        const response = await axios.get(ENDPOINT.TIPOTICKET_ALL);
        return formatResponseSuccess(response, FORMAT_DATA.TYPE_ARRAY)
    } catch (error) {
        return formatRequestError(error, FORMAT_DATA.TYPE_ARRAY)
    }
}

export const createTipoTicket = async (data) => {
    try {
        const response = await axios.post(ENDPOINT.TIPOTICKET_CREATE, data);
        return formatResponseSuccess(response)
    } catch (error) {
        return formatRequestError(error)
    }
}

export const updateTipoTicket = async (data) => {
    try {
        const response = await axios.put(ENDPOINT.TIPOTICKET_UPDATE, data);
        return formatResponseSuccess(response)
    } catch (error) {
        return formatRequestError(error)
    }
}

export const deleteTipoTicket = async (id) => {
    try {
        const response = await axios.delete(ENDPOINT.TIPOTICKET_DELETE + id);
        return formatResponseSuccess(response)
    } catch (error) {
        return formatRequestError(error)
    };
}

export const getTiposTicketsByAgencia = async (idAgencia) => {
    try {
        const response = await axios.get(endPointReplaceId(ENDPOINT.TIPOTICKET_BY_AGENCIA,idAgencia));
        return formatResponseSuccess(response, FORMAT_DATA.TYPE_ARRAY)
    } catch (error) {
        return formatRequestError(error, FORMAT_DATA.TYPE_ARRAY)
    }
}
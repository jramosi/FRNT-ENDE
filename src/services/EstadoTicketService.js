import axios from "axios";
import ENDPOINT from "../constants/EndPoints";
import { FORMAT_DATA } from "../constants/Response";
import { formatRequestError, formatResponseSuccess } from "../util/apiResponseRequest";


export const getEstadosTickets = async () => {
    try {
        const response = await axios.get(ENDPOINT.ESTADOTICKET_ALL);
        return formatResponseSuccess(response, FORMAT_DATA.TYPE_ARRAY)
    } catch (error) {
        return formatRequestError(error,FORMAT_DATA.TYPE_ARRAY)
    }
}

export const createEstadoTicket = async (data) => {
    try {
        const response = await axios.post(ENDPOINT.ESTADOTICKET_CREATE, data);
        return formatResponseSuccess(response)
    } catch (error) {
        return formatRequestError(error)
    }

}
export const updateEstadoTicket = async (data) => {
    try {
        const response = await axios.put(ENDPOINT.ESTADOTICKET_UPDATE, data);
        return formatResponseSuccess(response)
    } catch (error) {
        return formatRequestError(error)
    }
}

export const deleteEstadoTicket = async (id) => {
    try {
        const response = await axios.delete(ENDPOINT.ESTADOTICKET_DELETE + id);
        return formatResponseSuccess(response)
    } catch (error) {
        return formatRequestError(error)
    };
}



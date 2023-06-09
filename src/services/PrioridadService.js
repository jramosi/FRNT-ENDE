import axios from "axios";
import ENDPOINT from "../constants/EndPoints";
import { FORMAT_DATA } from "../constants/Response";
import { formatRequestError, formatResponseSuccess } from "../util/apiResponseRequest";


export const getPrioridades = async () => {
    try {
        const response = await axios.get(ENDPOINT.PRIORIDAD_ALL);
        return formatResponseSuccess(response, FORMAT_DATA.TYPE_ARRAY)
    } catch (error) {
        return formatRequestError(error, FORMAT_DATA.TYPE_ARRAY)
    }
}

/**
 * Lista de prioridades ordenada por codigo
 * @returns []
 */
export const getPrioridadesByCodigo = async () => {
    try {
        const response = await axios.get(ENDPOINT.PRIORIDAD_ALL_BY_CODIGO);
        return formatResponseSuccess(response, FORMAT_DATA.TYPE_ARRAY)
    } catch (error) {
        return formatRequestError(error, FORMAT_DATA.TYPE_ARRAY)
    }
}

export const createPrioridad = async (data) => {
    try {
        const response = await axios.post(ENDPOINT.PRIORIDAD_CREATE, data);
        return formatResponseSuccess(response)
    } catch (error) {
        return formatRequestError(error)
    }

}
export const updatePrioridad = async (data) => {
    try {
        const response = await axios.put(ENDPOINT.PRIORIDAD_UPDATE, data);
        return formatResponseSuccess(response)
    } catch (error) {
        return formatRequestError(error)
    }
}

export const deletePrioridad = async (id) => {
    try {
        const response = await axios.delete(ENDPOINT.PRIORIDAD_DELETE + id);
        return formatResponseSuccess(response)
    } catch (error) {
        return formatRequestError(error)
    };
}



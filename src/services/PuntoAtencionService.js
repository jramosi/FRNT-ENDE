import axios from "axios";
import ENDPOINT from "../constants/EndPoints";
import { FORMAT_DATA } from "../constants/Response";
import { formatRequestError, formatResponseSuccess } from "../util/apiResponseRequest";

export const getPuntosAtencion = async () => {
    try {
        const response = await axios.get(ENDPOINT.PUNTO_ATENCION_ALL);
        return formatResponseSuccess(response, FORMAT_DATA.TYPE_ARRAY)
    } catch (error) {
        return formatRequestError(error, FORMAT_DATA.TYPE_ARRAY)
    }
}
/**
 * 
 * data @param idRol int 
 * data @param idAgencia int || null  
 * @returns 
 */
export const getPuntosAtencionByAgencia = async (data) => {
    try {
        const response = await axios.post(ENDPOINT.PUNTO_ATENCION_BY_AGENCIA, data);
        return formatResponseSuccess(response, FORMAT_DATA.TYPE_ARRAY)
    } catch (error) {
        return formatRequestError(error, FORMAT_DATA.TYPE_ARRAY)
    }
}

export const createPuntoAtencion = async (data) => {
    try {
        const response = await axios.post(ENDPOINT.PUNTO_ATENCION_CREATE, data);
        return formatResponseSuccess(response)
    } catch (error) {
        return formatRequestError(error)
    }
}

export const updatePuntoAtencion = async (data) => {
    try {
        const response = await axios.post(ENDPOINT.PUNTO_ATENCION_UPDATE, data);
        return formatResponseSuccess(response)
    } catch (error) {
        return formatRequestError(error)
    }
}

export const deletePuntoAtencion = async (id) => {
    try {
        const response = await axios.delete(ENDPOINT.PUNTO_ATENCION_DELETE + id);
        return formatResponseSuccess(response)
    } catch (error) {
        return formatRequestError(error)
    };
}



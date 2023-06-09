import axios from "axios";
import ENDPOINT from "../constants/EndPoints";
import { FORMAT_DATA } from "../constants/Response";
import { formatRequestError, formatResponseSuccess } from "../util/apiResponseRequest";
import { endPointReplaceId } from "../util/helpers";

export const getAgencias = async () => {
    try {
        const response = await axios.get(ENDPOINT.AGENCIA_LIST_ALL);
        return formatResponseSuccess(response, FORMAT_DATA.TYPE_ARRAY)
    } catch (error) {
        return formatRequestError(error, FORMAT_DATA.TYPE_ARRAY)
    }
}

export const getAgencia = async (idAgencia) => {
    try {
        const response = await axios.get(endPointReplaceId(ENDPOINT.AGENCIA , idAgencia));
        return formatResponseSuccess(response)
    } catch (error) {
        return formatRequestError(error)
    }
}

/**
 * Obtener la agencia con puntos de atencion y operadores
 * @param {*} agenciaId 
 * @returns 
 */
export const getAgenciaFull = async (agenciaId) => {
    try {
        const response = await axios.get(endPointReplaceId(ENDPOINT.AGENCIA_FULL, agenciaId));
        return formatResponseSuccess(response)
    } catch (error) {
        return formatRequestError(error)
    }
}

export const createAgencia = async (data) => {
    try {
        const response = await axios.post(ENDPOINT.AGENCIA_CREATE, data);
        return formatResponseSuccess(response)
    } catch (error) {
        return formatRequestError(error)
    }
}

export const updateAgencia = async (data) => {
    try {
        const response = await axios.post(ENDPOINT.AGENCIA_UPDATE, data);
        return formatResponseSuccess(response)
    } catch (error) {
        return formatRequestError(error)
    }
}

export const deleteAgencia = async (id) => {
    try {
        const response = await axios.delete(ENDPOINT.AGENCIA_DELETE + id);
        return formatResponseSuccess(response)
    } catch (error) {
        return formatRequestError(error)
    };
}
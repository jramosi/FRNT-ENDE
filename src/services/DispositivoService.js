import axios from "axios";
import ENDPOINT from "../constants/EndPoints";
import { FORMAT_DATA } from "../constants/Response";
import { formatRequestError, formatResponseSuccess } from "../util/apiResponseRequest";
import { endPointReplaceId } from "../util/helpers";

export const getDispositivos = async () => {
    try {
        const response = await axios.get(ENDPOINT.DISPOSITIVO_ALL);
        return formatResponseSuccess(response, FORMAT_DATA.TYPE_ARRAY)
    } catch (error) {
        return formatRequestError(error, FORMAT_DATA.TYPE_ARRAY)
    }
}

export const getDispositivoById = async (id) => {
    try {
        const response = await axios.get(endPointReplaceId(ENDPOINT.DISPOSITIVO_BY_ID, id));
        return formatResponseSuccess(response)
    } catch (error) {
        return formatRequestError(error)
    }
}

export const createDispositivo = async (data) => {
    try {
        const response = await axios.post(ENDPOINT.DISPOSITIVO_CREATE, data);
        return formatResponseSuccess(response)
    } catch (error) {
        return formatRequestError(error)
    }
}

export const updateDispositivo = async (data) => {
    try {
        const response = await axios.put(ENDPOINT.DISPOSITIVO_UPDATE, data);
        return formatResponseSuccess(response)
    } catch (error) {
        return formatRequestError(error)
    }
}

export const deleteDispositivo = async (id) => {
    try {
        const response = await axios.delete(endPointReplaceId(ENDPOINT.DISPOSITIVO_DELETE, id));
        return formatResponseSuccess(response)
    } catch (error) {
        return formatRequestError(error)
    };
}
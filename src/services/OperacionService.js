import axios from "axios";
import ENDPOINT from "../constants/EndPoints";
import { FORMAT_DATA } from "../constants/Response";
import { formatRequestError, formatResponseSuccess } from "../util/apiResponseRequest";


export const getOperaciones = async () => {
    try {
        const response = await axios.get(ENDPOINT.OPERACION_ALL);
        return formatResponseSuccess(response, FORMAT_DATA.TYPE_ARRAY)
    } catch (error) {
        return formatRequestError(error, FORMAT_DATA.TYPE_ARRAY)
    }
}

export const createOperacion = async (data) => {
    try {
        const response = await axios.post(ENDPOINT.OPERACION_CREATE, data);
        return formatResponseSuccess(response)
    } catch (error) {
        return formatRequestError(error)
    }
}

export const updateOperacion = async (data) => {
    try {
        const response = await axios.put(ENDPOINT.OPERACION_UPDATE, data);
        return formatResponseSuccess(response)
    } catch (error) {
        return formatRequestError(error)
    }
}

export const deleteOperacion = async (id) => {
    try {
        const response = await axios.delete(ENDPOINT.OPERACION_DELETE + id);
        return formatResponseSuccess(response)
    } catch (error) {
        return formatRequestError(error)
    };
}

import axios from "axios";
import ENDPOINT from "../constants/EndPoints";
import { FORMAT_DATA } from "../constants/Response";
import { formatRequestError, formatResponseSuccess } from "../util/apiResponseRequest";

export const getClientes = async () => {
    try {
        const response = await axios.get(ENDPOINT.CLIENTE_ALL);
        return formatResponseSuccess(response, FORMAT_DATA.TYPE_ARRAY)
    } catch (error) {
        return formatRequestError(error, FORMAT_DATA.TYPE_ARRAY)
    }
}

export const createCliente = async (data) => {
    try {
        const response = await axios.post(ENDPOINT.CLIENTE_CREATE, data);
        return formatResponseSuccess(response)
    } catch (error) {
        return formatRequestError(error)
    }
}


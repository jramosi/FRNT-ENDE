import axios from "axios";
import ENDPOINT from "../constants/EndPoints";
import { formatRequestError, formatResponseSuccess } from "../util/apiResponseRequest";

export const createConsultaCliente = async (data) => {
    try {
        const response = await axios.post(ENDPOINT.CONSULTA_CREATE, data);
        return formatResponseSuccess(response)
    } catch (error) {
        return formatRequestError(error)
    }
}


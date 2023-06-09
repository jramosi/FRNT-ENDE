import axios from "axios";
import ENDPOINT from "../constants/EndPoints";
import { FORMAT_DATA } from "../constants/Response";
import { formatRequestError, formatResponseSuccess } from "../util/apiResponseRequest";


export const getTiposUsuarios = async () => {
    try {
        const response = await axios.get(ENDPOINT.TIPO_USUARIO_ALL);
        return formatResponseSuccess(response, FORMAT_DATA.TYPE_ARRAY)
    } catch (error) {
        return formatRequestError(error, FORMAT_DATA.TYPE_ARRAY)
    }
}

export const createTipoUsuario = async (data) => {
    try {
        const response = await axios.post(ENDPOINT.TIPO_USUARIO_CREATE, data);
    //    console.log(response);
        return formatResponseSuccess(response)
    } catch (error) {
        return formatRequestError(error)
    }
}

export const updateTipoUsuario = async (data) => {
    try {
        const response = await axios.put(ENDPOINT.TIPO_USUARIO_UPDATE, data);
        return formatResponseSuccess(response)
    } catch (error) {
        return formatRequestError(error)
    }
}

export const deleteTipoUsuario = async (id) => {
    try {
        const response = await axios.delete(ENDPOINT.TIPO_USUARIO_DELETE + id);
        return formatResponseSuccess(response)
    } catch (error) {
        return formatRequestError(error)
    };
}



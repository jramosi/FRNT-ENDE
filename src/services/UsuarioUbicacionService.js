import axios from "axios";
import ENDPOINT from "../constants/EndPoints";
import { FORMAT_DATA } from "../constants/Response";
import { formatRequestError, formatResponseSuccess } from "../util/apiResponseRequest";
import { endPointReplaceId } from "../util/helpers";

/**
 * @param idAgencia
 * @returns data[{id_agencia": 1,"id_usuario": 1,"id": 1,"id_punto_atencion": 1},{}] */
export const getUsuarioUbicacionByAgenciaId = async (id) => {
    try {
        const response = await axios.get(ENDPOINT.USUARIO_UBICACION_BY_AGENCIA_ID + id);
        return formatResponseSuccess(response, FORMAT_DATA.TYPE_ARRAY)
    } catch (error) {
        return formatRequestError(error, FORMAT_DATA.TYPE_ARRAY)
    }
}

export const getUsuarioUbicacionByUsuarioId = async (id) => {
    try {
        const response = await axios.get(ENDPOINT.USUARIO_UBICACION_BY_USUARIO_ID + id);
        return formatResponseSuccess(response)
    } catch (error) {
        return formatRequestError(error)
    }
}

export const createUsuarioUbicacion = async (data) => {
    try {
        const response = await axios.post(ENDPOINT.USUARIO_UBICACION_REGISTER, data);
        return formatResponseSuccess(response)
    } catch (error) {
        return formatRequestError(error)
    }
}

export const deleteUsuarioUbicacion = async (id) => {
    try {
        const response = await axios.delete(ENDPOINT.USUARIO_UBICACION_DELETE + id);
        return formatResponseSuccess(response)
    } catch (error) {
        return formatRequestError(error)
    };
}
export const quitPuntoAtencion = async (idUsuarioUbicacion) => {
    try {
        const response = await axios.get(endPointReplaceId(ENDPOINT.USUARIO_UBICACION_QUIT_PUNTO_ATENCION, idUsuarioUbicacion));
        return formatResponseSuccess(response)
    } catch (error) {
        return formatRequestError(error)
    };
}
export const quitAgencia = async (idUsuarioUbicacion) => {
    try {
        const response = await axios.get(endPointReplaceId(ENDPOINT.USUARIO_UBICACION_QUIT_AGENCIA, idUsuarioUbicacion));
        return formatResponseSuccess(response)
    } catch (error) {
        return formatRequestError(error)
    };
}

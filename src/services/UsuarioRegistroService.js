import axios from "axios";
import ENDPOINT from "../constants/EndPoints";
import { FORMAT_DATA } from "../constants/Response";
import { formatRequestError, formatResponseSuccess, formatResponseSuccessAuth } from "../util/apiResponseRequest";
import { endPointReplaceId } from "../util/helpers";

/**
 * Registro del inicio de sesion del usuario
 * @param {*} userId 
 * @param {*} token 
 * @returns 
 */
export const registerLoginUser = async (userId, token = '') => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    try {
        const response = await axios.get(endPointReplaceId(ENDPOINT.USUARIO_REGISTRO_LOGIN, userId), config);
        return formatResponseSuccess(response)
    } catch (error) {
        return formatRequestError(error)
    }

}

/**
 * Registro del cierre de sesion del usuario
 * @param {*} userId 
 * @returns 
 */
export const registerLogoutUser = async (userId) => {
    try {
        const response = await axios.get(endPointReplaceId(ENDPOINT.USUARIO_REGISTRO_LOGOUT, userId));
        return formatResponseSuccess(response)
    } catch (error) {
        return formatRequestError(error)
    }
}
/**
 * Obtnemos el historial de sesiones del usuario
 * @param {*} userId 
 * @returns 
 */
export const usuarioRegistroByIdUser = async (userId) => {
    try {
        const response = await axios.get(endPointReplaceId(ENDPOINT.USUARIO_REGISTRO_BY_ID_USER, userId));
        return formatResponseSuccess(response ,FORMAT_DATA.TYPE_ARRAY)
    } catch (error) {
        return formatRequestError(error)
    }
}
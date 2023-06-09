import axios from "axios";
import ENDPOINT from "../constants/EndPoints";
import { FORMAT_DATA } from "../constants/Response";
import { formatRequestError, formatResponseSuccess } from "../util/apiResponseRequest";
import { endPointReplaceId } from "../util/helpers";


export const getUsuarios = async () => {
    try {
        const response = await axios.get(ENDPOINT.USUARIO_ALL);
        return formatResponseSuccess(response, FORMAT_DATA.TYPE_ARRAY)
    } catch (error) {
        return formatRequestError(error, FORMAT_DATA.TYPE_ARRAY)
    }
}

/**
 * data @param idRol int 
 * data @param idAgencia int || null  
 * @returns 
 */
export const getUsuariosByRolAndAgencia = async (data) => {
    try {
        const response = await axios.post(ENDPOINT.USUARIO_BY_ROL_AGENCIA, data);
        return formatResponseSuccess(response, FORMAT_DATA.TYPE_ARRAY)
    } catch (error) {
        return formatRequestError(error, FORMAT_DATA.TYPE_ARRAY)
    }
}

/** 
@param nombre: "JUAN CARLOS",
@param primerApellido": "ZELADA",
@param segundoApellido": "CALLE",        
@param codigo: "COD1",
@param email: "juan@gmail.com",        
@param direccion: "Z/miraflores C/ponsnasky",
@param celular: "71234567",
@param interno: "121",
@param username: "juan.zelada",
@param password: "12345",
@param enabled: true,
@param idTipoUsuario": 1,
@param roles: [1]  
*/
export const createUsuario = async (data) => {
    try {
        const response = await axios.post(ENDPOINT.USUARIO_CREATE, data);
        return formatResponseSuccess(response)
    } catch (error) {
        return formatRequestError(error)
    }
}

export const updateUsuario = async (data) => {
    try {
        const response = await axios.put(ENDPOINT.USUARIO_UPDATE, data);
        return formatResponseSuccess(response)
    } catch (error) {
        return formatRequestError(error)
    }
}

export const deleteUsuario = async (id) => {
    try {
        const response = await axios.delete(ENDPOINT.USUARIO_DELETE + id);
        return formatResponseSuccess(response)
    } catch (error) {
        return formatRequestError(error)
    };
}

export const updateUsuarioRole = async (data) => {
    try {
        const response = await axios.post(ENDPOINT.USUARIO_UPDATE, data);
        return formatResponseSuccess(response)
    } catch (error) {
        return formatRequestError(error)
    }
}

export const getUsuarioById = async (id) => {
    try {
        const response = await axios.get(endPointReplaceId(ENDPOINT.USUARIO_BY_ID, id));
        return formatResponseSuccess(response)
    } catch (error) {
        return formatRequestError(error)
    }
}

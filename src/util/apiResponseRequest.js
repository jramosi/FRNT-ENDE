/**Metodos para retornar respuesta aceptable al front cuando se consume un endpoint */
import { FORMAT_DATA } from "../constants/Response"

export const formatResponseSuccess = (response, format) => {

    const { data = [], error = false, message = '' } = response.data

    if (format === FORMAT_DATA.TYPE_ARRAY) {
        if (Array.isArray(data))
            return { data, error, message }
        else
            return { data: [], error: true, message: 'Se esperaba información de tipo listado.' }
    }

    // TODO manejar el formato de data null , [] o {}
    return { data, error, message }
}

export const formatRequestError = (error = null, format = '') => {

    let data = {}
    let message = 'Algo inesperado paso al realizar la solicitud.'
    let status = 'Sin estado'
    let errorFront = true

    if (format === FORMAT_DATA.TYPE_ARRAY)
        data = []

    if (error.code === "ERR_BAD_REQUEST")
        message = "Error al realizar la solicitud."

    if (error?.response?.data?.message !== undefined) {
        message = error.response.data.message
    }

    if (error?.response?.data?.error_description !== undefined) {
        message = error.response.data.error_description
    }

    if (error?.response?.data?.status !== undefined) {
        if (error.response.data.status == 404 || error.response.data.status == 'NOT_FOUND')
            status = 404
        else
            status = error.response.data.status
    }

    if (error.code === "ERR_NETWORK")
        message = "Error. Revise su conexión por favor."

    return { data, error: errorFront, message, status }
}

export const formatResponseSuccessAuth = (response) => {

    const { access_token = '', error = false, user } = response.data

    return { access_token, error, user }
}

export const formatRequestErrorAuth = (error = null) => {

    let message = 'Algo inesperado paso al realizar la solicitud.'

    if (error?.response?.data?.message !== undefined) {
        message = error.response.data.message
    }

    return { data: null, error: true, message }
}
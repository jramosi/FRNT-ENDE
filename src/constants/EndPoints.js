const API_BASE = import.meta.env.VITE_BACKEND_API_URL

const ENDPOINT = {
    AUTH: import.meta.env.VITE_BACKEND_API_AUTH_URL,

    AGENCIA_ALL:    `${API_BASE}/agencia`,
    AGENCIA_CREATE: `${API_BASE}/agencia/registro`,
    AGENCIA_DELETE: `${API_BASE}/agencia/`,
    AGENCIA_UPDATE: `${API_BASE}/agencia/actualizacion`,
    AGENCIA_FULL:   `${API_BASE}/agencia/:ID/puntosAtencion`,
    AGENCIA:        `${API_BASE}/agencia/:ID`,
    AGENCIA_LIST_ALL:`${API_BASE}/agencia/lista`,

    PUNTO_ATENCION_ALL:    `${API_BASE}/puntoAtencion`,
    PUNTO_ATENCION_CREATE: `${API_BASE}/puntoAtencion/registro`,
    PUNTO_ATENCION_DELETE: `${API_BASE}/puntoAtencion/`,
    PUNTO_ATENCION_UPDATE: `${API_BASE}/puntoAtencion/actualizacion`,
    PUNTO_ATENCION_BY_AGENCIA:    `${API_BASE}/puntoAtencion/lista`,

    PRIORIDAD_ALL:    `${API_BASE}/prioridad`,
    PRIORIDAD_ALL_BY_CODIGO:    `${API_BASE}/prioridad/listOrderByCodigo`,
    PRIORIDAD_CREATE: `${API_BASE}/prioridad`,
    PRIORIDAD_DELETE: `${API_BASE}/prioridad/`,
    PRIORIDAD_UPDATE: `${API_BASE}/prioridad`,

    TIPOTICKET_ALL: `${API_BASE}/tipoTicket`,
    TIPOTICKET_CREATE: `${API_BASE}/tipoTicket`,
    TIPOTICKET_DELETE: `${API_BASE}/tipoTicket/`,
    TIPOTICKET_UPDATE: `${API_BASE}/tipoTicket`,
    TIPOTICKET_BY_AGENCIA:        `${API_BASE}/agenciaTipoTicket/agencia/:ID`,

    ESTADOTICKET_ALL: `${API_BASE}/estadoTicket`,
    ESTADOTICKET_CREATE: `${API_BASE}/estadoTicket`,
    ESTADOTICKET_DELETE: `${API_BASE}/estadoTicket/`,
    ESTADOTICKET_UPDATE: `${API_BASE}/estadoTicket`,

    CLIENTE_ALL: `${API_BASE}/cliente`,
    CLIENTE_CREATE: `${API_BASE}/cliente/registroCliente`,

    OPERACION_ALL:      `${API_BASE}/operacion`,
    OPERACION_CREATE:   `${API_BASE}/operacion`,
    OPERACION_DELETE:   `${API_BASE}/operacion/`,
    OPERACION_UPDATE:   `${API_BASE}/operacion`,

    USUARIO_ALL:      `${API_BASE}/usuario`,
    USUARIO_CREATE:   `${API_BASE}/usuario/registro`,
    USUARIO_DELETE:   `${API_BASE}/usuario/`,
    USUARIO_UPDATE:   `${API_BASE}/usuario/actualizacion`,
    USUARIO_BY_ID:   `${API_BASE}/usuario/:ID`,
    USUARIO_BY_ROL_AGENCIA:      `${API_BASE}/usuario/lista`,

    USUARIO_REGISTRO_BY_ID_USER:   `${API_BASE}/usuarioRegistro/usuario/:ID`,
    USUARIO_REGISTRO_LOGIN:    `${API_BASE}/usuarioRegistro/login/:ID`,
    USUARIO_REGISTRO_LOGOUT:    `${API_BASE}/usuarioRegistro/logout/:ID`,
    
    TIPO_USUARIO_ALL:      `${API_BASE}/tipoUsuario`,
    TIPO_USUARIO_CREATE:   `${API_BASE}/tipoUsuario`,
    TIPO_USUARIO_DELETE:   `${API_BASE}/tipoUsuario/`,
    TIPO_USUARIO_UPDATE:   `${API_BASE}/tipoUsuario`,

    USUARIO_UBICACION_ALL:      `${API_BASE}/usuarioUbicacion`,
    USUARIO_UBICACION_CREATE:   `${API_BASE}/usuarioUbicacion`,
    USUARIO_UBICACION_DELETE:   `${API_BASE}/usuarioUbicacion/`,
    USUARIO_UBICACION_UPDATE:   `${API_BASE}/usuarioUbicacion`,
    USUARIO_UBICACION_BY_AGENCIA_ID:   `${API_BASE}/usuarioUbicacion/agencia/`,
    USUARIO_UBICACION_BY_USUARIO_ID:   `${API_BASE}/usuarioUbicacion/usuario/`,
    USUARIO_UBICACION_REGISTER:   `${API_BASE}/usuarioUbicacion/registroUsuario`,
    USUARIO_UBICACION_QUIT_PUNTO_ATENCION:   `${API_BASE}/usuarioUbicacion/:ID/abandonar/puntoAtencion`,
    USUARIO_UBICACION_QUIT_AGENCIA:   `${API_BASE}/usuarioUbicacion/:ID/abandonar/agencia`,


    DISPENSADOR_BY_MAC:        `${API_BASE}/dispensador/codigo/`,

    TICKET_ESTADO_TICKET_NEW:        `${API_BASE}/ticketEstadoTicket/nuevo`,
    TICKET_ESTADO_TICKET_NEXT:        `${API_BASE}/ticketEstadoTicket/siguiente`,
    TICKET_ESTADO_TICKET_UPDATE:        `${API_BASE}/ticketEstadoTicket/actualizar`,
    TICKET_ESTADO_TICKET_MONITOR_BY_AGENCIA_ID:`${API_BASE}/ticketEstadoTicket/monitor/agencia/1`,//TODO:VERIFICAR EL ID
    TICKET_ESTADO_TICKET_PENDIENTE: `${API_BASE}/ticketEstadoTicket/verifica/puntoAtencion/:ID`,
    TICKET_ESTADO_TICKET_BY_AGENCIA: `${API_BASE}/ticketEstadoTicket/`,

    ROL_ALL:      `${API_BASE}/roles`,

    CONSULTA_CREATE: `${API_BASE}/clienteConsulta/registro`,

    DISPOSITIVO_ALL:      `${API_BASE}/dispensador/lista`,
    DISPOSITIVO_BY_ID:    `${API_BASE}/dispensador/:ID`,
    DISPOSITIVO_CREATE:   `${API_BASE}/dispensador`,
    DISPOSITIVO_DELETE:   `${API_BASE}/dispensador/:ID`,
    DISPOSITIVO_UPDATE:   `${API_BASE}/dispensador`,

    MULTIMEDIA_ALL:      `${API_BASE}/videos`,
    MULTIMEDIA_BY_ID:    `${API_BASE}/multimedia/:ID`,
    MULTIMEDIA_CREATE:   `${API_BASE}/file/upload`,
    MULTIMEDIA_DELETE:   `${API_BASE}/file/delete/:ID`,
    MULTIMEDIA_UPDATE:   `${API_BASE}/videos`,
}

export default ENDPOINT;
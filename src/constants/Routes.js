//*modulos*/
const ADMIN='administracion'


const ROUTE = {
    // Rutas de administracion
    HOME:                       '/',
    LOGIN:                      'login',
    ADMIN_HOME:                 `${ADMIN}`,
    ADMIN_AGENCIA_HOME:         `${ADMIN}/principal`,
    ADMIN_AGENCIA_BY_ID:        `${ADMIN}/agencia/:IdParam`,
    AGENCIA:                    `${ADMIN}/agencias`,
    AGENCIA_BY_ID:              `${ADMIN}/agencias/:IdParam`,
    PUNTO_ATENCION:             `${ADMIN}/puntos-atencion`,
    TIPO_USUARIO:               `${ADMIN}/tipo-usuario`,
    USUARIO:                    `${ADMIN}/usuarios`,
    USUARIO_NEW:                `${ADMIN}/usuario/nuevo`,
    USUARIO_BY_ID:              `${ADMIN}/usuarios/:IdParam`,
    PRIORIDAD:                  `${ADMIN}/prioridad`,
    TIPO_TICKET:                `${ADMIN}/tipo-ticket`,
    ESTADO_TICKET:              `${ADMIN}/estado-ticket`,
    CLIENTE:                    `${ADMIN}/clientes`,
    OPERACION:                  `${ADMIN}/operaciones`,
    DISPOSITIVO:                `${ADMIN}/dispositivos`,
    MULTIMEDIA:                 `${ADMIN}/multimedia`,
    DISPENSADOR:                'dispensador',
    MONITOR:                    'monitor',
    ROLE_SELECT:                'rol-seleccionar',
    OPERADOR:                   'panel-operador',
    OPERADOR_PUNTO_ATENCION:    'punto-de-atencion',
};

export default ROUTE;
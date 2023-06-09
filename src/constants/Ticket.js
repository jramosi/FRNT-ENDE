export const ACTION = {
    CALL_NEXT:      'llamar al siguiente ticket',
    CALL_AGAIN:     'llamar nuevamente',
    START_ATTENTION:'iniciar atencion',
    END_ATTENTION:  'finalizar la atencion',
    CANCEL:         'anular el ticket',

    REGISTER_CLIENT:            'registro del cliente',
    REGISTER_CLIENT_CONSULTA:   'registro de la cosnulta del cliente'
}

/**CONSTANTE, CODIGO_ESTADO_TICKET */
export const ESTADO = {
    ESPERA:     1,
    ASIGNADO:   2,
    LLAMADO:    3,
    ATENDIENDO: 4,
    FINALIZADO: 5,
    ANULADO:    6,
    DERIVADO:   7
}
const types = {
    login:                  '[auth] Login',
    logout:                 '[auth] Logout',
    authorityChange:        'change authority',

    agenciaSelected:        '[panel-operador] seleccionar una agencia',
    puntoAtencionSelected:  '[panel-operador] seleccionar un punto de atencion',
    ubicacionConfirm:       '[panel-operador] ubicacion del usuario',
    nextStepAsignacion:     '[panel-operador] paso siguiente asigancion ubicacion',
    prevStepAsignacion:     '[panel-operador] paso anterior asigancion ubicacion',
    setUsuarioUbicacion:    '[panel-operador] setear a UsuarioUbicacion',
    newUsuarioUbicacion:    '[panel-operador] nueva asignacion usuario-punto',
    cancelAssignment:       '[panel-operador] cancelar asignacion de punto de atencion',

    callNext:               '[atencion-al-cliente] llamar al siguiente ticket',
    callAgain:              '[atencion-al-cliente] llamar nuevamente',
    startAttention:         '[atencion-al-cliente] iniciar atencion',
    endAttention:           '[atencion-al-cliente] finalizar la atencion',
    cancel:                 '[atencion-al-cliente] anular el ticket',
    openRegister:           '[atencion-al-cliente] formulario de registro cliente',
    clienteRegistered:      '[atencion-al-cliente] cliente registrado',
    consultaRegistered:      '[atencion-al-cliente] consulta registrada',
    restoreTicket:          '[atencion-al-cliente] restaurar ticket pendiente',
    
}

export default types;
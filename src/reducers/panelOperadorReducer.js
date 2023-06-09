import produce from 'immer'
import types from '../types'

const defaultPanelOperador = {
    usuarioUbicacion: null,
    agenciaSelected: null,
    puntoAtencionSelected: null,
    currentStepAsignacion: 0,
    usuarioUbicacionNew: false,
    redirectPuntoAtencion: false,
    opened: true,
    errors: {},
}

export const panelOperadorInitialState = {
    ...defaultPanelOperador
}

export const PanelOperadorReducer = produce((state = {}, action) => {
    switch (action.type) {
        case types.agenciaSelected:
            state.agenciaSelected = action.agencia
            return state;

        case types.puntoAtencionSelected:
            state.puntoAtencionSelected = action.puntoAtencion
            return state;

        case types.ubicacionConfirm:
            state.usuarioUbicacion = action.ubicacionUsuario
            state.redirectPuntoAtencion = true
            return state;

        case types.nextStepAsignacion:
            state.currentStepAsignacion = state.currentStepAsignacion + 1
            return state;

        case types.prevStepAsignacion:
            state.currentStepAsignacion = state.currentStepAsignacion - 1
            return state;

        case types.setUsuarioUbicacion:
            state.usuarioUbicacion = action.usuarioUbicacion
            return state;

        case types.newUsuarioUbicacion:
            state.usuarioUbicacionNew = true
            return state;

        case types.cancelAssignment:
            return {...defaultPanelOperador};

        default:
            return state;
    }
})
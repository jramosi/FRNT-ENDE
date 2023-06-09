import React from 'react'
import { actions } from './actions';

const getActionscurrent = (actionsCurrent = []) => {
    return actionsCurrent.map(actionCurrent => actions[actionCurrent]);
}

export const TurnoAtencionActions = (actionsCurrent, actionCallNext, actionUpdateEstadoTicket, actionRegisterCliente, actionConfirm) => {

    // Obtenemos las acciones del momento permitidas(array de acciones)
    const actions = getActionscurrent(actionsCurrent)

    // Obtenemos las acciones del momento permitidas (array de componentes) 
    let renderActions = []
    let methodAction = null
    actions.map((action, index) => {
        switch (action.methodClick) {
            case 'actionCallNext':
                methodAction = actionCallNext
                break;
            case 'actionUpdateEstadoTicket':
                methodAction = () => actionUpdateEstadoTicket(action.estado, action.type)
                break;
            case 'actionRegisterCliente':
                methodAction = actionRegisterCliente
                break;
            case 'actionConfirm':
                methodAction = actionConfirm
                break;
            default:
                methodAction = null
                break;
        }
        renderActions.push(
            <div onClick={methodAction} className='action_option'> {action.icon} {action.label}</div>,
        )
    })

    return renderActions
}


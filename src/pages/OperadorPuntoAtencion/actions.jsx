import { ACTION, ESTADO } from "../../constants/Ticket";
import { SoundFilled, PlayCircleOutlined, CloseCircleOutlined, StopOutlined, UserOutlined } from '@ant-design/icons';
import types from "../../types";

// Todas las acciones que el operador puede hacer en atencion al cliente.
export const actions = {
    [ACTION.CALL_NEXT]: {
        label: 'LLamar al siguiente',
        icon: <SoundFilled className='icon_action' />,
        methodClick: 'actionCallNext',

    },
    [ACTION.CALL_AGAIN]: {
        label: 'LLamar nuevamente',
        icon: <SoundFilled className='icon_action' />,
        methodClick: 'actionUpdateEstadoTicket',
        estado: ESTADO.LLAMADO,
        type: types.callAgain
    },
    [ACTION.START_ATTENTION]: {
        label: 'Iniciar Atención',
        icon: <PlayCircleOutlined className='icon_action' />,
        methodClick: 'actionUpdateEstadoTicket',
        estado: ESTADO.ATENDIENDO,
        type: types.startAttention
    },
    [ACTION.CANCEL]: {
        label: 'No se presento',
        icon: <CloseCircleOutlined className='icon_action' />,
        methodClick: 'actionUpdateEstadoTicket',
        estado: ESTADO.ANULADO,
        type: types.cancel
    },
    [ACTION.END_ATTENTION]: {
        label: 'Finalizar Atención',
        icon: <StopOutlined className='icon_action' />,
        methodClick: 'actionConfirm',
        // estado: ESTADO.FINALIZADO,
        // type: types.endAttention
    },
    [ACTION.REGISTER_CLIENT]: {
        label: 'Registrar Cliente',
        icon: <UserOutlined className='icon_action' />,
        methodClick: 'actionRegisterCliente'
    },
}

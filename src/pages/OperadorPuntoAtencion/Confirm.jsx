import { Alert, Modal, Typography } from 'antd';
import { ESTADO } from '../../constants/Ticket';
import { useAtencionState } from '../../contexts/AtencionContext';
import types from '../../types';

const { Title } = Typography;
const Confirm = (props) => {

    const { isModalOpenConfirm, handleOpen, actionUpdateEstadoTicket } = props
    const { clienteCurrent, consultaCurrent, ticketCurrent } = useAtencionState();

    const handleOk = () => {
        actionUpdateEstadoTicket(ESTADO.FINALIZADO, types.endAttention)
        handleOpen(false)
    };

    const handleCancel = () => {
        handleOpen(false)
    };
    return (
        <>
            <Modal
                open={isModalOpenConfirm}
                onOk={handleOk}
                onCancel={handleCancel}
                cancelText='No'
                okText='Si'
                destroyOnClose={true}
            >
                <Title className='mt_3' level={3} style={{ textAlign: 'center' }}>¿Desea finalizar la atención?</Title>
                {clienteCurrent && consultaCurrent ?
                    <></> :
                    <Alert
                        message="No se registro al cliente ni su consulta."
                        description="El registro del cliente y su consulta es opcional."
                        type="info"
                        showIcon
                        className='mt_3'
                    />}
            </Modal>
        </>
    )
}

export default Confirm
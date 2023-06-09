import { useState } from 'react';
import { Button, Card, Typography, List} from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';

import { usePanelOperadorDispatch, usePanelOperadorState } from '../../contexts/PanelOperadorContext'
import { createUsuarioUbicacion } from '../../services/UsuarioUbicacionService';
import { useAuthState } from '../../security/authentication/AuthContext';
import OperadorIcon from '../../common/OperadorIcon';
import RedirectTo from '../../common/RedirectTo';
import ROUTE from '../../constants/Routes';
import types from '../../types';
import {notifySimple} from '../../common/NotifyToast';

const { Title } = Typography;
const UbicacionConfirm = () => {

    const [loading, setLoading] = useState(false)

    const { agenciaSelected, puntoAtencionSelected, redirectPuntoAtencion } = usePanelOperadorState();
    const panelDispatch = usePanelOperadorDispatch();
    const { id: userId } = useAuthState();


    const handleUbicacionOperadorConfirm = async () => {
        setLoading(true)
        const dataToSend = {
            "puntoAtencion": { "id": puntoAtencionSelected.id },
            "usuario": { "id": userId },
            "agencia": { "id": agenciaSelected.id },
            "activo": true
        };

        const { data, message: messageFetch, error } = await createUsuarioUbicacion(dataToSend);

        setLoading(false)
        if (!error) {
            panelDispatch({ type: types.ubicacionConfirm, ubicacionUsuario: data })
            notifySimple('success', messageFetch)
        }
        else {
            notifySimple('error', messageFetch) 
        }
    }


    return (
        <>
            <Title level={5}>Presione en confirmar si los datos son los correctos.</Title>
            <Card className="card_list animate__animated  animate__fadeInLeft">
                <List >
                    <List.Item>
                        <List.Item.Meta
                            avatar={<OperadorIcon width="128" type='success' />}
                            description={<>
                                <Title style={{ margin: 0 }} level={4}>{puntoAtencionSelected.codigo}</Title>
                                <Title style={{ marginTop: 0 }} level={5}>{puntoAtencionSelected.descripcion}</Title>
                                <Title style={{ margin: 0 }} level={4}>{agenciaSelected.descripcion}</Title>
                                <Title style={{ margin: 0 }} level={5}>{agenciaSelected.direccion}</Title>
                            </>}
                        />
                    </List.Item >
                </List>
            </Card>

            <div style={{ textAlign: 'center', marginTop: 10 }}>
                {!redirectPuntoAtencion && (
                    <Button className='button_success' size='large' loading={loading} onClick={handleUbicacionOperadorConfirm}>
                        Confirmar
                    </Button>
                )}
                {redirectPuntoAtencion && (
                    <RedirectTo to={ROUTE.OPERADOR_PUNTO_ATENCION}>
                        <Button type="primary" icon={<ArrowRightOutlined />}> Ir a punto de atención</Button>
                    </RedirectTo>
                )}
            </div>
        </>
    )
}

export default UbicacionConfirm

import { Typography, Input, Button, Form, Layout } from 'antd';

import { getDispensadorByMac } from '../services/DispensadorService';
import { notifySimple } from './NotifyToast';
import { Toaster } from 'react-hot-toast';
import HeaderWave from './HeaderWave';
import FooterLayout from '../layouts/partials/FooterLayout';

const { Title } = Typography;
const { Content, Header } = Layout;

const IdentifyDevice = ({ setNumeroPinLocal, keyLocalStorage }) => {
    const onFinish = async (values) => {
        const { pin } = values
        const { data, error, message } = await getDispensadorByMac(pin)
        if (!error) {
            localStorage.setItem(keyLocalStorage, pin);
            setNumeroPinLocal(pin)
        } else {
            notifySimple("error", "Pin Incorrecto")
        }
    };

    return (
        <>
            <Header className='wave_container'>
                <HeaderWave />
            </Header>
            <Content>
                <main className='identify_device_container'>
                    <Title level={3} style={{ textAlign: 'center' }}>Registro del dispositivo</Title>
                    <Form
                        name="basic"
                        onFinish={onFinish}
                        autoComplete="off"
                    >
                        <Form.Item
                            name="pin"
                            rules={[
                                {
                                    required: true,
                                    message: 'Por favor ingrese un numero de PIN correspondiente a la agencia.',
                                },
                            ]}
                        >
                            <Input placeholder='Ingrese un numero de PIN correspondiente a la agencia.' size="large" />
                        </Form.Item>
                        <Form.Item>
                            <Button className='button_success' htmlType="submit">
                                Registrar
                            </Button>
                        </Form.Item>
                    </Form>
                </main>
            </Content>
            <FooterLayout />
            <Toaster />
        </ >
    )
}

export default IdentifyDevice
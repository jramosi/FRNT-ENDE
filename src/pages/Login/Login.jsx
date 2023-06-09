import React, { useState } from 'react'
import { Button, Form, Input, Card, Layout } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Toaster } from 'react-hot-toast';

import { useAuthDispatch } from '../../security/authentication/AuthContext';
import { registerLoginUser } from '../../services/UsuarioRegistroService';
import FooterLayout from '../../layouts/partials/FooterLayout';
import { notifySimple } from '../../common/NotifyToast';
import { loginUser } from '../../services/AuthService';
import HeaderWave from '../../common/HeaderWave';
import types from '../../types';
import RedirectTo from '../../common/RedirectTo';
import ButtonSave from '../../common/ButtonSave';

const { Content } = Layout;
const NAME_APP = import.meta.env.VITE_APP_NAME

const Login = () => {

    const [loading, setLoading] = useState(false)
    const authDispatch = useAuthDispatch();

    const handleSubmit = async (values) => {

        setLoading(true)
        const { username, password } = values
        const { access_token: token = '', user, error = false, message } = await loginUser(username, password)
       

        setLoading(false)
        if (!error && token !== '') {
            /**Registramos el inicio de sesion */
            const { data } = await registerLoginUser(user.id, token)
            /**Disparamos el evento para anular el token */
            authDispatch({ type: types.login, token })
            
        }
        else {
            notifySimple('error', 'Credenciales Incorrectas')
        }
    };

    const onFinishFailed = (errorInfo) => {
        setLoading(false)
    };

    return (
        <div style={{ maxWidth: '100%', overflow: 'hidden' }}>
            <Layout className="container animate__animated animate__fadeInRight animate__faster 500ms">
                {/* <HeaderWave /> */}
                <Content className='container_content '>
                    <div className="site_layout_default_content login_container ">
                        <Card
                            title={NAME_APP}
                            bordered={false}
                            style={{
                                width: 300,
                                boxShadow: 'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px',
                            }}
                            headStyle={{ background: '#172a4f', color: '#fff' }}
                        >
                            <Form
                                name="basic"
                                layout='vertical'
                                onFinish={handleSubmit}
                                onFinishFailed={onFinishFailed}
                                autoComplete="off"
                                initialValues={{ password: '12345' }}
                            >
                                <Form.Item label="Usuario">
                                    <Form.Item
                                        noStyle
                                        name="username"
                                        rules={[{ required: true, message: 'Por favor ingresa tu nombre de usuario!', },]}
                                    >
                                        <Input prefix={<UserOutlined />} />
                                    </Form.Item>
                                </Form.Item>

                                <Form.Item label="Contraseña">
                                    <Form.Item
                                        noStyle
                                        name="password"
                                        rules={[{ required: true, message: 'Por favor ingresa tu contraseña!', },]}
                                    >
                                        <Input.Password prefix={<LockOutlined />} />
                                    </Form.Item>
                                </Form.Item>

                                <Form.Item className='login_button'                    >
                                    <ButtonSave loading={loading} label='Iniciar Sesión' />
                                </Form.Item>
                            </Form>
                        </Card>
                        <RedirectTo >
                            <Button type="link">Pagina de inicio</Button>
                        </RedirectTo>
                    </div>
                </Content>
                <FooterLayout />
                <Toaster />
            </Layout>
        </div>

    )
}

export default Login
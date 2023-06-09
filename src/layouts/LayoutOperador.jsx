import React from 'react'
import { Layout, Button, PageHeader, Typography, Dropdown, Menu } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Outlet } from "react-router-dom";
import { Toaster } from 'react-hot-toast';

import { useAuthDispatch, useAuthState } from '../security/authentication/AuthContext';
import FooterLayout from './partials/FooterLayout';
import HeaderLogo from './partials/HeaderLogo';
import types from '../types';
import { getFullName } from '../util/helpers';
import { registerLogoutUser } from '../services/UsuarioRegistroService';

const { Content } = Layout;
const { Title, Text } = Typography;
const NAME_APP = import.meta.env.VITE_APP_NAME

const LayoutOperador = () => {

    const { userDetails, userName, authorityCurrent } = useAuthState();
    const authDispatch = useAuthDispatch()

    const handleMenuClick = async (e) => {
        if (e.key === 'logout') {
            /**Registramos el cierre de sesion */
            const { data, error } = await registerLogoutUser(userDetails.id)
            /**Disparamos el evento para anular el token */
            authDispatch({
                type: types.logout
            })
        }
    };

    const menu = (
        <Menu
            onClick={handleMenuClick}
            items={[
                {
                    label: userName,
                    key: '1',
                    type: 'group'
                },
                {
                    label: 'Operador',
                    key: '3',
                    type: 'group'
                },
                {
                    type: 'divider',
                },
                {
                    label: 'Cerrar sesión',
                    key: 'logout',
                    icon: <LogoutOutlined />,
                },
            ]}
        />
    );

    const renderUserAvatar = (
        <Dropdown overlay={menu} trigger={['click']}>
            <Button type="primary" size="" icon={<UserOutlined />} />
        </Dropdown>
    )

    return (
        <Layout className="container">
            <div className="contenedor_page_header" >
                <PageHeader
                    ghost={false}
                    title={<HeaderLogo type='primary' />}
                    className='bg_secondary page_header_operador'
                    extra={[
                        <div key='layout-header'>
                            <div style={{ textAlign: 'end' }}>
                                <Text key="1" style={{ color: '#fff', margin: 0, marginRight: 5 }} italic>{getFullName(userDetails)}</Text>
                                {renderUserAvatar}
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <Title level={4} style={{ color: '#fff', margin: 0 }} >{NAME_APP} - Atención al cliente</Title>
                            </div>
                        </div>
                    ]}
                >
                </PageHeader>
            </div>
            <div className='contenedor_content'>
                <Content className='content_operador'>
                    <div className="site_layout_default_content" style={{ width: '100%' }} >
                        <Outlet />
                    </div>
                </Content>
            </div>
            <FooterLayout />
            <Toaster />
        </Layout >
    )
}

export default LayoutOperador
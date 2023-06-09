import React from 'react'
import { TagOutlined, LogoutOutlined } from '@ant-design/icons';
import { Layout, Typography, Button } from 'antd';
import { useAuthDispatch, useAuthState } from '../../security/authentication/AuthContext';
import types from '../../types';
const { Header } = Layout;
const { Title } = Typography;

const Navbar = () => {
    const { nombre, authorityCurrent } = useAuthState();

    // TODO:cambiar a dinamico
    const authorityDisplay = authorityCurrent ? authorityCurrent === 'ROLE_USER' ? 'OPERADOR' : 'ADMINISTRADOR' : 'SR'
    const authDispatch = useAuthDispatch();
    const handleLogout = () => {
        authDispatch({
            type: types.logout
        })
    }
    return (
        <Header className="header layout-header">
            <div className="logo-content" >
                <Title level={5} className="logo-item">Sistema de Tickets</Title>
                <TagOutlined className="logo-item" />
            </div>
            <span>
                <span className='layout-header-user'>{nombre}</span>
                <span className='layout-header-user'>{authorityDisplay}</span>
                <Button
                    className='layout-header-logout'
                    type="primary"
                    shape="circle"
                    icon={<LogoutOutlined />}
                    size="default"
                    onClick={handleLogout} />
            </span>
        </Header>
    )
}

export default Navbar
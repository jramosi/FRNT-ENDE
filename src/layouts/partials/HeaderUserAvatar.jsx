import React from 'react'
import { Button, Dropdown, Menu, Typography } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';

import { useAuthDispatch, useAuthState } from '../../security/authentication/AuthContext';
import { getAuthorityDisplay, getFullName, getFullNameInitials } from '../../util/helpers';
import { registerLogoutUser } from '../../services/UsuarioRegistroService';
import types from '../../types';

const { Text } = Typography;

const HeaderUserAvatar = (props) => {
    const { isThemeDefault = false } = props
    const { userDetails, authorityCurrent, authoritiesDisplay } = useAuthState();
    const authorityDisplay = getAuthorityDisplay(authorityCurrent, authoritiesDisplay)
    const authDispatch = useAuthDispatch()

    const handleMenuClick = async (e) => {
        if (e.key === 'logout-admin') {
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
                    label: 'Cerrar sesión',
                    key: 'logout-admin',
                    icon: <LogoutOutlined />,
                },
            ]}
        />
    );
    const styleText = isThemeDefault ? { color: '#fff' } : {}
    return (
        <span className='header_user_avatar_content'>
            <span className='content-header-user'>
                <Text strong style={{ ...styleText, textAlign: 'end' }}>{getFullName(userDetails)}</Text>
                <Text italic style={styleText} className='content-header-user-text'>{authorityDisplay?.name_role_display || ''}</Text>
            </span>

            <Dropdown overlay={menu} trigger={['click']}>
                <Button type="primary" shape="circle" size="large">
                    {getFullNameInitials(userDetails)}
                </Button>
            </Dropdown>
        </span>
    )
}

export default HeaderUserAvatar
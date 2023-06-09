import React from 'react'
import { Navigate } from "react-router-dom";
import { Typography, Avatar, Card, Alert, List, Divider } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import { useAuthDispatch, useAuthState } from '../../security/authentication/AuthContext'
import { redirectAccordingToRoleView } from '../../util/helpers';
import types from '../../types';

const { Title } = Typography;

const RolSelect = () => {

    const { authorityCurrent, authoritiesDisplay } = useAuthState();
    const authDispatch = useAuthDispatch();

    const handleSelectedAuthority = (authority) => {
        authDispatch({ type: types.authorityChange, authority: authority.name_role });
    }

    if (authorityCurrent) {
        const redirect = redirectAccordingToRoleView(authorityCurrent);
        return <Navigate to={redirect} />
    }

    if (authoritiesDisplay.length <= 0)
        return <Alert message="No cuentas con ningún rol, comunícate con un administrador por favor. " type="warning" showIcon />

    return (
        <>
            <Divider orientation="left" plain >
                <Title level={4}>Roles asignados a tu usuario</Title>
            </Divider>
            <div className='list_card'>
                <List
                    grid={{
                        gutter: 16,
                        xs: 1,
                        sm: 1,
                        md: 2,
                        lg: 2,
                        xl: 3,
                        xxl: 3,
                    }}
                    dataSource={authoritiesDisplay}
                    renderItem={(authority) => (
                        <List.Item className='list_item'>
                            <Card onClick={() => handleSelectedAuthority(authority)} className='card_list card_select animate__animated animate__fadeInLeft' style={{ minHeight: '120px' }}>
                                <Card.Meta
                                    avatar={<Avatar icon={<UserOutlined />} className='bg_success' />}
                                    title={authority?.name_role_display || ''}
                                    description={authority?.description || ''}
                                />
                            </Card>
                        </List.Item>
                    )}
                />
            </div>
        </>
    )
}

export default RolSelect
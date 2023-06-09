import { Outlet } from "react-router-dom";
import { Breadcrumb, Layout } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { Toaster } from 'react-hot-toast';

import SiderMenu from './partials/SiderMenu';
import HeaderNavbar from './partials/HeaderNavbar';
import FooterLayout from './partials/FooterLayout';
import { ROLE } from "../constants/RolPermission";
import { useAuthState } from "../security/authentication/AuthContext";
const { Content } = Layout;

const LayoutAdministrador = () => {
    const { withAgenciaAssigned, agenciaAssigned, authorityCurrent } = useAuthState()
    const labelAgencia = authorityCurrent === ROLE.ADMINISTRATION_GRAL || authorityCurrent === ROLE.ADMINISTRATION_SYS ? 'Todas' : ''
    return (
        <Layout style={{ minHeight: '100vh' }} className="">
            <SiderMenu />
            <Layout className="site-layout">
                <HeaderNavbar theme="admin" />
                <Content style={{ margin: '0 16px', }}>
                    <div
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            minHeight: 360,
                        }}
                    >
                        <Breadcrumb className="mb_2">
                            <Breadcrumb.Item >
                                <HomeOutlined />
                                <span>Agencia</span>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>{withAgenciaAssigned ? agenciaAssigned.descripcion : labelAgencia}</Breadcrumb.Item>
                        </Breadcrumb>
                        <Outlet />
                    </div>
                </Content>
                <FooterLayout />
            </Layout>
            <Toaster />
        </Layout>
    )
}

export default LayoutAdministrador

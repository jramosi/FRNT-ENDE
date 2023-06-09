import React from 'react'
import { Outlet } from "react-router-dom";
import { Layout } from 'antd';

import HeaderNavbar from './partials/HeaderNavbar';
import FooterLayout from './partials/FooterLayout';

const { Content } = Layout;
const LayoutDefault = () => {
    return (
        <Layout className="container">
            <HeaderNavbar />
            <Content style={{ padding: '0 50px', minHeight: '100%' }}>
                <div className="site_layout_default_content">
                    <Outlet />
                </div>
            </Content>
            <FooterLayout />
        </Layout>
    )
}

export default LayoutDefault
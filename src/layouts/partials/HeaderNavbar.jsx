import React from 'react'
import { Layout } from 'antd';
import HeaderUserAvatar from './HeaderUserAvatar';
import HeaderLogo from './HeaderLogo';

const { Header } = Layout;

const HeaderNavbar = (props) => {

    const { theme = 'default' } = props;
    const isThemeDefault = theme === 'default' ? true : false;
    const styleNavbar = isThemeDefault ? {} : { background: '#fff', justifyContent: 'right' }
    
    return (
        <Header className="layout_header_navbar">
            <span className='content_header_container_default' style={styleNavbar}>
                {isThemeDefault && <HeaderLogo />}
                <HeaderUserAvatar isThemeDefault={isThemeDefault} />
            </span>
        </Header>
    )
}

export default HeaderNavbar
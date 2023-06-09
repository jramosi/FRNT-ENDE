import React, { useState } from 'react'
import { Layout, Menu } from 'antd';
import { itemsMenuAdmin } from '../../routes/privateRoutes';
import { useAuthState } from '../../security/authentication/AuthContext';

const { Sider } = Layout;
const NAME_APP = import.meta.env.VITE_APP_NAME
const SiderMenu = () => {
    const [collapsed, setCollapsed] = useState(false);

    /**Obtenemos los permisos del token */
    const { permissions } = useAuthState()

    const items = itemsMenuAdmin.filter(item => {
        /**Si no hay submenus  solo verifcamos si cuenta con los permissos */
        if (item.children === undefined) {
            if (item.permission==='ANY') {
                return true
            }
            return permissions.includes(item.permission);
        }

        /**Si hay submenus , verifcamos y filtramos si los submenus cuenta con los permissos */
        if (Array.isArray(item.children)) {
            const childrenFilter = item.children.filter(itemChild => {
                return permissions.includes(itemChild.permission);
            })
            item.children = childrenFilter
            return childrenFilter.length > 0 ? true : false
        }
    });

    return (
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} width="240px">
            <div className="container-logo">
                {!collapsed ? <h2 className='logo'>{NAME_APP}</h2> : null}
            </div>
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
        </Sider>
    )
}

export default SiderMenu
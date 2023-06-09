import { Route } from 'react-router-dom'

import LayoutAdministrador from '../layouts/LayoutAdministrador';
import LayoutOperador from '../layouts/LayoutOperador';
import LayoutDefault from '../layouts/LayoutDefault';
import { ROLE } from '../constants/RolPermission';
import { privateRoutes } from './privateRoutes';
import RolSelect from '../pages/RolSelect';
import ROUTE from "../constants/Routes";

/**Metodo para obtner el laypout segun el rol del usuario */
const getLayout = (authorityCurrent) => {
    switch (authorityCurrent) {
        case ROLE.OPERATOR:
            return <LayoutOperador />
        case ROLE.ADMINISTRATION:
        case ROLE.ADMINISTRATION_GRAL:
        case ROLE.ADMINISTRATION_SYS:
            return <LayoutAdministrador />
        default:
            return <LayoutDefault />
    }
}
/**Metodo para obtner los ROUTE para react-router segun el rol del usuario */
export const getRoutesAccordingToAuthority = (authorityCurrent) => {

    if (!authorityCurrent) {
        return <Route element={<LayoutDefault />}><Route path={ROUTE.ROLE_SELECT} element={<RolSelect />} /></Route>
    }

    const filterRoutes = privateRoutes.filter(route => {
        //filtramos las paths segun rol
        return route.roleAuthorized.includes(authorityCurrent)
    });

    const layout = getLayout(authorityCurrent);

    return (
        <>
            <Route element={layout}>
                {filterRoutes.map((routePrivate, index) => {
                    return routePrivate.layout ? <Route key={"rt" + index} path={routePrivate.path} element={routePrivate.element} /> : null
                })}
            </Route>
            {filterRoutes.map((routePrivate, index) => {
                return routePrivate.layout ? null : <Route key={"rt" + index} path={routePrivate.path} element={routePrivate.element} />
            })}
        </>
    )
}



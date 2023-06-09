import React from 'react'
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useAuthState } from '../security/authentication/AuthContext';
import { redirectAccordingToRoleView } from '../util/helpers';

const GuestRoute = () => {
    const { isAuthenticated, authorityCurrent } = useAuthState();
    const { pathname } = useLocation();

    const redirect = redirectAccordingToRoleView(authorityCurrent);

    return !isAuthenticated ? <Outlet /> : <Navigate to={redirect} state={{ from: pathname }} replace />
}

export default GuestRoute
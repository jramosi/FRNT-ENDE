import React from 'react'
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useAuthState } from '../security/authentication/AuthContext';

const PrivateRoute = () => {
    const { isAuthenticated } = useAuthState();

    const { pathname } = useLocation();
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" state={{ from: pathname }} replace />

}

export default PrivateRoute
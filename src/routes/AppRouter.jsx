import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useAuthState } from '../security/authentication/AuthContext'
import { getRoutesAccordingToAuthority } from './routesConfig'
import PageNotFound from '../pages/PageNotFound'
import PrivateRoute from './PrivateRoute'
import ROUTE from '../constants/Routes'
import GuestRoute from './GuestRoute'
import Login from '../pages/Login'
import Home from '../pages/Home'
import Dispensador from '../pages/Dispensador'
import Monitor from '../pages/Monitor'

const AppRouter = () => {
    const { authorityCurrent } = useAuthState();
    
    return (
        <BrowserRouter>
            <Routes>

                <Route path={ROUTE.HOME} element={<Home />} />
                <Route path={ROUTE.DISPENSADOR} element={<Dispensador />} />
                <Route path="/monitor" element={<Monitor />} />

                <Route path="/*" element={<GuestRoute />} >
                    <Route path={ROUTE.LOGIN} element={<Login />} />
                </Route>

                <Route path="/*" element={<PrivateRoute />}>
                    {getRoutesAccordingToAuthority(authorityCurrent)}
                    <Route path="*" element={<PageNotFound />} />
                </Route>

            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter
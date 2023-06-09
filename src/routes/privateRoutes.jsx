import React from 'react'
import { Link } from "react-router-dom";
import { HomeOutlined, ApartmentOutlined, TeamOutlined, TagsOutlined, GoldOutlined, UserSwitchOutlined, ControlOutlined ,FundProjectionScreenOutlined,PlayCircleOutlined} from '@ant-design/icons';

import OperadorPuntoAtencion from '../pages/OperadorPuntoAtencion';
import AdminAgenciaHome from '../pages/AdminHome/AdminAgenciaHome';
import AgenciaDetail from '../pages/AdminHome/AgenciaDetail';
import UsuarioCreate from '../pages/Usuario/UsuarioCreate';
import UsuarioDetail from '../pages/Usuario/UsuarioDetail';
import PuntosAtencion from "../pages/PuntoAtencion";
import EstadosTickets from "../pages/EstadoTicket";
import { ROLE } from '../constants/RolPermission';
import TiposUsuarios from "../pages/TipoUsuario";
import Dispositivos from '../pages/Dispositivo';
import Operaciones from "../pages/Operacion";
import Operador from '../pages/OperadorHome';
import Prioridades from "../pages/Prioridad";
import TipoTicket from "../pages/TipoTicket";
import RolSelect from '../pages/RolSelect';
import Usuarios from "../pages/Usuario";
import Agencias from "../pages/Agencia";
import ROUTE from "../constants/Routes";
import Clientes from "../pages/Cliente";
import Admin from "../pages/AdminHome";
import Multimedia from '../pages/Multimedia';

/*Items del menu. solo  para usuarios administradores ,controlado por permisos */
/**utilizado en SiderMenu.jsx */
export const itemsMenuAdmin = [
    {
        key: 'menu-home',
        icon: React.createElement(ApartmentOutlined),
        label: <Link to={ROUTE.ADMIN_HOME}>Principal</Link>,
        permission: 'ADMIN.HOME'
    },
    {
        key: 'menu-agencia-home',
        icon: React.createElement(HomeOutlined),
        label: <Link to={ROUTE.ADMIN_AGENCIA_HOME}>Principal</Link>,
        permission: 'ADMIN.AGENCIA.HOME'
    },
    {
        type: 'divider'
    },
    {
        key: 'menu-agencia',
        icon: React.createElement(HomeOutlined),
        label: <Link to={ROUTE.AGENCIA}>Agencias</Link>,
        permission: 'AGENCIA.LIST'
    },
    {
        key: 'menu-puntos-atencion',
        icon: <GoldOutlined />,
        label: <Link to={ROUTE.PUNTO_ATENCION}>Puntos de atención</Link>,
        permission: 'PUNTO_ATENCION.LIST'
    },
    {
        key: 'menu-gestion-usuario',
        icon: React.createElement(TeamOutlined),
        label: 'Gestión de Usuarios',
        children: [
            {
                key: 'submenu-usuarios',
                label: <Link to={ROUTE.USUARIO}>Usuarios</Link>,
                permission: 'USUARIO.LIST'
            },
            {
                key: 'submenu-tipo-usuarios',
                label: <Link to={ROUTE.TIPO_USUARIO}>Tipo de usuarios</Link>,
                permission: 'TIPO_USUARIO.LIST'
            },
        ]
    },
    {
        key: 'menu-operaciones',
        icon: <ControlOutlined />,
        label: <Link to={ROUTE.OPERACION}>Operaciones</Link>,
        permission: 'OPERACION.LIST'
    },
    {
        key: 'menu-gestion-ticket',
        icon: <TagsOutlined />,
        label: 'Gestión de Tickets',
        children: [
            {
                key: 'submenu-prioridad',
                label: <Link to={ROUTE.PRIORIDAD}>Prioridad</Link>,
                permission: 'PRIORIDAD.LIST'
            },
            {
                key: 'submenu-tipo-ticket',
                label: <Link to={ROUTE.TIPO_TICKET}>Tipo de ticket</Link>,
                permission: 'TIPO_TICKET.LIST'
            },
            {
                key: 'submenu-estado-ticket',
                label: <Link to={ROUTE.ESTADO_TICKET}>Estado de ticket</Link>,
                permission: 'ESTADO_TICKET.LIST'
            },
        ]
    },
    {
        key: 'menu-clientes',
        icon: <UserSwitchOutlined />,
        label: <Link to={ROUTE.CLIENTE}>Clientes</Link>,
        permission: 'CLIENTE_TICKET.LIST'
    },
    {
        key: 'menu-dispositivos',
        icon: <FundProjectionScreenOutlined />,
        label: <Link to={ROUTE.DISPOSITIVO}>Dispositivos</Link>,
        permission: 'DISPOSITIVO.LIST'
    },
    {
        key: 'menu-multimedia',
        icon: <PlayCircleOutlined />,
        label: <Link to={ROUTE.MULTIMEDIA}>Multimedia</Link>,
        permission: 'VIDEO.LIST' //TODO: adicionar permiso en sql
    },
]

/*Paths privadas para usuarios administradores y operadores*/
/*Ej. http://localhost:5173/administracion/usuarios/7*/
export const privateRoutes = [
    {
        path: ROUTE.ADMIN_HOME,
        element: <Admin />,
        roleAuthorized: [ROLE.ADMINISTRATION, ROLE.ADMINISTRATION_GRAL,ROLE.ADMINISTRATION_SYS],
        layout: true
    },
    {
        path: ROUTE.ADMIN_AGENCIA_HOME,
        element: <AdminAgenciaHome />,
        roleAuthorized: [ROLE.ADMINISTRATION],
        layout: true
    },
    {
        path: ROUTE.ADMIN_AGENCIA_BY_ID,
        element: <AgenciaDetail />,
        roleAuthorized: [ROLE.ADMINISTRATION_GRAL,ROLE.ADMINISTRATION_SYS],
        layout: true
    },
    {
        path: ROUTE.AGENCIA,
        element: <Agencias />,
        roleAuthorized: [ROLE.ADMINISTRATION_GRAL,ROLE.ADMINISTRATION_SYS],
        layout: true
    },
    {
        path: ROUTE.PUNTO_ATENCION,
        element: <PuntosAtencion />,
        roleAuthorized: [ROLE.ADMINISTRATION, ROLE.ADMINISTRATION_GRAL,ROLE.ADMINISTRATION_SYS],
        layout: true
    },
    {
        path: ROUTE.TIPO_USUARIO,
        element: <TiposUsuarios />,
        roleAuthorized: [ROLE.ADMINISTRATION, ROLE.ADMINISTRATION_GRAL,ROLE.ADMINISTRATION_SYS],
        layout: true
    },
    {
        path: ROUTE.USUARIO,
        element: <Usuarios />,
        roleAuthorized: [ROLE.ADMINISTRATION, ROLE.ADMINISTRATION_GRAL,ROLE.ADMINISTRATION_SYS],
        layout: true
    },
    {
        path: ROUTE.USUARIO_NEW,
        element: <UsuarioCreate />,
        roleAuthorized: [ROLE.ADMINISTRATION, ROLE.ADMINISTRATION_GRAL,ROLE.ADMINISTRATION_SYS],
        layout: true
    },
    {
        path: ROUTE.USUARIO_BY_ID,
        element: <UsuarioDetail />,
        roleAuthorized: [ROLE.ADMINISTRATION, ROLE.ADMINISTRATION_GRAL,ROLE.ADMINISTRATION_SYS],
        layout: true
    },
    {
        path: ROUTE.PRIORIDAD,
        element: <Prioridades />,
        roleAuthorized: [ROLE.ADMINISTRATION, ROLE.ADMINISTRATION_GRAL,ROLE.ADMINISTRATION_SYS],
        layout: true
    },
    {
        path: ROUTE.TIPO_TICKET,
        element: <TipoTicket />,
        roleAuthorized: [ROLE.ADMINISTRATION, ROLE.ADMINISTRATION_GRAL,ROLE.ADMINISTRATION_SYS],
        layout: true
    },
    {
        path: ROUTE.ESTADO_TICKET,
        element: <EstadosTickets />,
        roleAuthorized: [ROLE.ADMINISTRATION, ROLE.ADMINISTRATION_GRAL,ROLE.ADMINISTRATION_SYS],
        layout: true
    },
    {
        path: ROUTE.CLIENTE,
        element: <Clientes />,
        roleAuthorized: [ROLE.ADMINISTRATION, ROLE.ADMINISTRATION_GRAL,ROLE.ADMINISTRATION_SYS],
        layout: true
    },
    {
        path: ROUTE.OPERACION,
        element: <Operaciones />,
        roleAuthorized: [ROLE.ADMINISTRATION, ROLE.ADMINISTRATION_GRAL,ROLE.ADMINISTRATION_SYS],
        layout: true
    },
    {
        path: ROUTE.ROLE_SELECT,
        element: <RolSelect />,
        roleAuthorized: [ROLE.ADMINISTRATION, ROLE.OPERATOR, ROLE.ADMINISTRATION_GRAL,ROLE.ADMINISTRATION_SYS],
        layout: false
    },
    {
        path: ROUTE.OPERADOR,
        element: <Operador />,
        roleAuthorized: [ROLE.OPERATOR],
        layout: true
    },
    {
        path: ROUTE.OPERADOR_PUNTO_ATENCION,
        element: <OperadorPuntoAtencion />,
        roleAuthorized: [ROLE.OPERATOR],
        layout: true
    },
    {
        path: ROUTE.DISPOSITIVO,
        element: <Dispositivos />,
        roleAuthorized: [ROLE.ADMINISTRATION_GRAL,ROLE.ADMINISTRATION_SYS],
        layout: true
    },
    {
        path: ROUTE.MULTIMEDIA,
        element: <Multimedia />,
        roleAuthorized: [ROLE.ADMINISTRATION_GRAL,ROLE.ADMINISTRATION_SYS],
        layout: true
    }
]

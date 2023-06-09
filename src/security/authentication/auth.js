import axios from "axios";
import jwt_decode from 'jwt-decode';

const TOKEN_KEY = "token";
const AUTHORITY_KEY = "authority";

const defaultUser = {
    userName: null,
    userDetails: null,//nombre
    permissions: [],
    id: null,
    exp: 0,
    authorities: [],
    authoritiesDisplay: [],
    authorityCurrent: null,
    authorityCurrentDetail: null,
    isAuthenticated: false,
    agenciaAssigned: null,
    withAgenciaAssigned: false

};

const setToken = (token = '') => {
    localStorage.setItem(TOKEN_KEY, token);
}

const getToken = () => {
    return localStorage.getItem(TOKEN_KEY) || null;
}

const removeToken = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(AUTHORITY_KEY);
}

const getAuthorityCurrent = (authorities = []) => {

    const localAuthorityCurrent = localStorage.getItem(AUTHORITY_KEY) || null;
    if (localAuthorityCurrent) { return localAuthorityCurrent }

    return authorities.length === 1 ? authorities[0] : null;

}

const getAuthorityCurrentDetail = (authorities = [], authorityCurrent) => {
    const authorityCurrentDetail = authorities.find(authority => authority.name_role === authorityCurrent)
    return authorityCurrentDetail || {}
}

export const authorityChange = (state, authority) => {
    localStorage.setItem(AUTHORITY_KEY, authority);
    return { ...state, authorityCurrent: authority, authorityCurrentDetail: getAuthorityCurrentDetail(state.authoritiesDisplay, authority), };
}

export const authenticate = (token = '') => {

    if (token) { setToken(token); }

    /*Obtenemos el token ya sea por parametro o desde el localstorage*/
    const _token = token ? token : getToken();
    /**Si el token no existe retornamo el valores  por defecto(esto redirige al usuario al login)  */
    if (!_token) { return { ...defaultUser }; }

    const currentTime = Date.now() / 1000;

    // const { user_name = '', permissions = [], id = '', exp = 0, nombre = '', email = '', authorities = [] } = jwt_decode(_token);
    const { user_name = '', permissions = [], exp = 0, authorities = [], user, role, agencia } = jwt_decode(_token);

    if (exp < currentTime) {
        console.log("Token expirado");
        removeToken();
        return { ...defaultUser };
    }

    const authorityCurrent = getAuthorityCurrent();
    // const authorityCurrentDetail=getAuthorityCurrentDetail(role,authorityCurrent)
    axios.defaults.headers.common["Authorization"] = 'Bearer ' + _token;
    return {
        ...defaultUser,
        userName: user_name,
        userDetails: user,
        permissions,
        id: user.id,
        exp,
        authorities,
        authoritiesDisplay: role,
        authorityCurrent,
        authorityCurrentDetail: getAuthorityCurrentDetail(role, authorityCurrent),
        isAuthenticated: true,
        agenciaAssigned: agencia,
        withAgenciaAssigned: agencia !== null ? true : false
    };
}

export const logout = () => {
    removeToken();
    delete axios.defaults.headers.common['Authorization'];
    return { ...defaultUser };
}

const OAUTH_USER = import.meta.env.VITE_OAUTH_USER
const OAUTH_PASSWORD = import.meta.env.VITE_OAUTH_PASSWORD

const CONFIG = {
    BASIC_AUTH: 'Basic ' + window.btoa(`${OAUTH_USER}:${OAUTH_PASSWORD}`),
    GRANT_TYPE: 'password'
}

export default CONFIG;
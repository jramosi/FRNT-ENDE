import { useAuthState } from "../security/authentication/AuthContext"

/*
 * 
 * @param roles []
 * @param rol string
 * @param deny boolean
 * @returns 
 */
const hasAccessRol = (roles, rol, deny = false) => {
    let hasAccess = roles.includes(rol)
    if (deny)
        return !hasAccess

    return hasAccess
}
/**
 * 
 * @param array permissions 
 * @param string permission 
 * @returns boolean true || false
 */
const hasAccessByPermission = (permissions, permission) => {
    let hasAccess = permissions.includes(permission)
    return hasAccess
}

export const HasAccessRol = (props) => {
    const { deny = false, roles = '', children } = props
    const { authorities } = useAuthState()

    if (!hasAccessRol(authorities, roles, deny))
        return <></>

    return (
        <>{children}</>
    )
}

export const HasPermission = (props) => {
    const { permission = '', children } = props
    const { permissions } = useAuthState()

    if (!hasAccessByPermission(permissions, permission,))
        return <></>

    return (
        <>{children}</>
    )
}


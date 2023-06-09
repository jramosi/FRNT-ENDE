import { ROLE } from "../constants/RolPermission";
import ROUTE from "../constants/Routes";

export const addFieldToForm = (fieldsForm, field) => {

    const found = fieldsForm.find(element => element.name === field.name);

    if (!found) {
        fieldsForm.push(field)
    }
    else {
        fieldsForm.pop()
        fieldsForm.push(field)
    }
}

export const addItemtoArrayOnce = (arrayList, item) => {

    const found = arrayList.find(element => element.key === item.key);

    if (!found) {
        arrayList.push(item)
    }

}


export const redirectAccordingToRoleView = (authorityCurrent) => {
    if (!authorityCurrent) {
        return ROUTE.ROLE_SELECT;
    }

    let redirect = '/'
    switch (authorityCurrent) {
        case ROLE.OPERATOR:
            redirect = "/" + ROUTE.OPERADOR
            break;
        case ROLE.ADMINISTRATION:
            redirect = "/" + ROUTE.ADMIN_AGENCIA_HOME
            break;
        case ROLE.ADMINISTRATION_GRAL:
        case ROLE.ADMINISTRATION_SYS:
            redirect = "/" + ROUTE.ADMIN_HOME
            break;
        default:
            break;
    }
    return redirect;
}

export const getIdsPuntosAtencion = (usuarioUbicacionByAgencia = []) => {
    if (usuarioUbicacionByAgencia.length === 0)
        return [];

    const puntosAtencionNotNull = usuarioUbicacionByAgencia.filter((usuarioUbicacion) => usuarioUbicacion.id_punto_atencion !== null)
    if (puntosAtencionNotNull.length === 0)
        return [];

    const puntosAtencionIds = puntosAtencionNotNull.map(ubicacioneAgencia => ubicacioneAgencia.id_punto_atencion)
    if (puntosAtencionIds.length === 0)
        return [];

    return puntosAtencionIds

}

export const getFullName = (user) => {
    const name = user.nombre.toLowerCase()
    const nameFirst = user.primerApellido.toLowerCase()
    const fullName = `${name[0].toUpperCase() + name.substring(1)} ${nameFirst[0].toUpperCase() + nameFirst.substring(1)}`
    return fullName

}

export const getFullNameInitials = (user) => {
    let initials = ''
    initials = user.nombre.substring(0, 1) || 'N'
    initials += user.primerApellido.substring(0, 1) || 'N'
    return initials
}

export const getAuthorityDisplay = (authorityCurrent, authorities) => {
    const authoritie = authorities.find(authoritie => authoritie.name_role === authorityCurrent);
    return authoritie ? authoritie : {}
}

export const endPointReplaceId = (endPoint, id) => {
    return endPoint.replace(':ID', id);
}

/**
 * Metodo para paths dinamicos, donde remplazamos los ids
 * @param {string} path 
 * @param {number} id 
 * @param {boolean} redirect ,agrega un / al inicio del path (por react router)
 * @returns 
 */
export const matchPathId = (path, id, redirect = false) => {

    let pathNew = ''
    if (path.includes(':ID')) {
        pathNew = path.replace(':ID', id);
    }

    if (path.includes(':IdParam')) {
        pathNew = path.replace(':IdParam', id);
    }

    return redirect ? `/${pathNew}` : pathNew
}

/**
 * Verificando si el parametro es un objeto
 * @param {*} param 
 * @returns 
 */
export const isObject = (param) => {
    if ((!Array.isArray(param)) && typeof param === 'object' && param !== null) {
        return true
    }
    return false
}

/**
 * De un listado de objetos, obtenemos un listado de valores de la propiedad Id
 * @param array arrayOfObjects 
 * @param string identifier 
 * @param string prefix ,cancatena un id a Identifier
 */
export const getIds = (arrayOfObjects = [], identifier, prefix = false) => {
    let _identifier = identifier

    if (prefix)
        _identifier = `id${identifier[0].toUpperCase() + identifier.substring(1)}`

    let ids = []
    arrayOfObjects.map(data => {
        if (data[_identifier] !== undefined) {
            ids.push(data[_identifier])
        }
    })
    
    return ids
}
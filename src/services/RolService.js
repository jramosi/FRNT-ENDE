import axios from "axios";
import ENDPOINT from "../constants/EndPoints";
import { FORMAT_DATA } from "../constants/Response";
import { formatRequestError, formatResponseSuccess } from "../util/apiResponseRequest";
import { ROLE } from "../constants/RolPermission"

export const getRoles = async () => {

    //TODO:podria venir desde  el back ya con los roles correspondientes
    /**Obtenemos el rol actual del usuario para devolver para filtrar los roles */
    const localAuthorityCurrent = localStorage.getItem('authority') || null;

    try {
        const response = await axios.get(ENDPOINT.ROL_ALL);
        const { data, error, message } = formatResponseSuccess(response, FORMAT_DATA.TYPE_ARRAY);

        let dataFilter = [];
        switch (localAuthorityCurrent) {
            case ROLE.ADMINISTRATION_SYS:
                dataFilter = data
                break;
            case ROLE.ADMINISTRATION_GRAL:
                dataFilter = data.filter(rol => rol.nameRole !== ROLE.ADMINISTRATION_SYS)
                break;
            case ROLE.ADMINISTRATION:
            default:
                dataFilter = data.filter(rol => rol.nameRole !== ROLE.ADMINISTRATION_SYS && rol.nameRole !== ROLE.ADMINISTRATION_GRAL)
                break;
        }

        return { data: dataFilter, error, message }

    } catch (error) {
        return formatRequestError(error, FORMAT_DATA.TYPE_ARRAY)
    }
}

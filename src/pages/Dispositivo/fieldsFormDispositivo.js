import { PERMISSION} from "../../constants/RolPermission";
import { getAgencias } from "../../services/AgenciaService";

const fieldsForm = [
    {
        name: "codigo",
        label: "Codigo",
        rules: [{
            required: true,
            message: 'Por favor ingrese un codigo',
        }],
        permission: PERMISSION.ANY
    },
    {
        name: "descripcion",
        label: "Descripción",
        rules: [{
            required: true,
            message: 'Por favor ingrese una descripción',
        }],
        permission: PERMISSION.ANY
    },
    {
        name: "agencia",
        label: "Agencia",
        rules: [{
            required: true,
            message: 'Por favor seleccione una agencia.',
        }],
        type: 'select',
        options: [],
        originDB: true,
        methodService: getAgencias,
        permission: PERMISSION.AGENCIA_SELECT
    },
]

export default fieldsForm;


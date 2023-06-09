import { PERMISSION } from "../../constants/RolPermission";
import { getAgencias } from "../../services/AgenciaService";
import { getTiposTicketsByAgencia } from "../../services/TipoTicketService";

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
        name: "idAgencia",
        label: "Agencia",
        rules: [{
            required: true,
            message: 'Por favor seleccione una agencia.',
        }],
        type: 'selectAndCheckBox',
        options: [],
        originDB: true,
        methodService: getAgencias,
        permission: PERMISSION.AGENCIA_SELECT,
        fieldDependet: {
            name: "tipoTicket",
            label: "Tipo Ticket",
            rules: [],
            type: 'checkbox.group',
            options: [],
            originDB: true,
            methodService: getTiposTicketsByAgencia,
            permission: PERMISSION.ANY
        }
    },


]

export default fieldsForm;


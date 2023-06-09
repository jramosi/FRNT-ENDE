import { PERMISSION } from "../../constants/RolPermission";
import { getTiposTickets, getTiposTicketsByAgencia } from "../../services/TipoTicketService";

const fieldsForm = [
    {
        name: "codigo",
        label: "Codigo",
        rules: [{
            required: true,
            message: 'Por favor ingrese un codigo',
        }]
    },
    {
        name: "descripcion",
        label: "Descripción",
        rules: [{
            required: true,
            message: 'Por favor ingrese una descripción',
        }]
    },
    {
        name: "direccion",
        label: "Dirección",
        rules: [{
            required: true,
            message: 'Por favor ingrese una Dirección',
        }]
    },
    {
        name: "tipoTicket",
        label: "Tipo de ticket",
        rules: [{ validator: (_, value=[]) => value.length > 0 ? Promise.resolve() : Promise.reject(new Error('Seleccione al menos un tipo de ticket')), },],
        type: 'checkbox.group',
        options: [],
        originDB: true,
        methodService: getTiposTickets,        
        permission: PERMISSION.ANY       
    },
]

export default fieldsForm;


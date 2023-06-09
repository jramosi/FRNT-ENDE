import { getPrioridades } from "../../services/PrioridadService";

const fieldsForm = [
    {
        name: "codigo",
        label: "Código",
        rules: [{
            required: true,
            message: 'Por favor ingrese un código',
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
        name: "preferencial",
        label: "Preferencial",
        type:'switch',
        valuePropName: "checked",

    },
    {
        name: "prioridad",
        label: "Prioridad",
        rules: [{
            required: true,
            message: 'Por favor ingrese prioridad',
        }],
        type: 'select',
        options: [],
        originDB: true,
        methodService: getPrioridades
    },
]


export default fieldsForm;
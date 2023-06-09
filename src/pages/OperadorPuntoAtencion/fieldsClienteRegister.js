
export const initialFormCliente = {
    documento: "",
    celular: "",
    nombre: "",
}

export const initialFormConsulta = {
    reclamo: "",
    solicitud: "",
    glosa: "",
}


export const fieldsFormCliente = [
    {
        name: "documento",
        label: "Numero de C.I.",
        rules: [{
            required: true,
            message: 'Por favor ingrese un codigo',
        }],
        placeholder: "Ej. 8934889"
    },
    {
        name: "celular",
        label: "Celular",
    },
    {
        name: "nombre",
        label: "Nombre del cliente",
    },
]

export const fieldsFormConsulta = [
    {
        name: "reclamo",
        label: "Nª Reclamo",
    },
    {
        name: "solicitud",
        label: "Nº Solicitud",
    },
    {
        name: "glosa",
        label: "Glosa",
        rules: [{
            required: true,
            message: 'Por favor ingrese información en el campo.',
        }],
        type: 'textArea',
        placeholder: 'Consulta del cliente.'
    },
]
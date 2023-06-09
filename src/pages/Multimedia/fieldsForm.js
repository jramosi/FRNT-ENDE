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
        name: "files",
        label: "Multimedia",
        rules: [{
            required: true,
            message: 'Por favor ingrese una descripción',
        }],
        type: 'upload',
        onlyCreate: true
    },
    {
        name: "url",
        label: "Url",
        rules: [],
        onlyEdit: true,
        disabled: true
    },
    {
        name: "play",
        label: "Reproducir",
        rules: [],
        type: 'switch2'
    },
]

export default fieldsForm;


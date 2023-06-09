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
]

export default fieldsForm;


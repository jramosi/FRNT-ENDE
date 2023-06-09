const fieldsForm = [
    {
        name: "codigo",
        label: "Código",
        type:'number',
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
]

export default fieldsForm;


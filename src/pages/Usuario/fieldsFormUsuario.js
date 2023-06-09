import { getRoles } from "../../services/RolService";
import { getTiposUsuarios } from "../../services/TipoUsuarioService";

const fieldsForm = [
    // {
    //     name: "codigo",
    //     label: "Codigo",
    //     rules: [{
    //         required: true,
    //         message: 'Por favor ingrese un codigo',
    //     }]
    // },
    {
        name: "nombre",
        label: "Nombre",
        rules: [{
            required: true,
            message: 'Por favor ingrese un nombre',
        }]
    },
    {
        name: "primerApellido",
        label: "Primer Apellido",
        rules: [{
            required: true,
            message: 'Por favor ingrese el primer apellido',
        }]
    },
    {
        name: "segundoApellido",
        label: "Segundo Apellido",
    },
    {
        name: "direccion",
        label: "Dirección",
        rules: [{
            required: true,
            message: 'Por favor ingrese la dirección',
        }]
    },
    {
        name: "celular",
        label: "Celular",
        rules: [{
            required: true,
            message: 'Por favor ingrese el celular',
        }]
    },
    {
        name: "email",
        label: "Email",
        rules: [{
            required: true,
            message: 'Por favor ingrese el email',
        }]
    },
    {
        name: "interno",
        label: "Interno",
    },
    {
        name: "idTipoUsuario",
        label: "Tipo de Usuario",
        rules: [{
            required: true,
            message: 'Por favor ingrese el interno',
        }],
        type: 'select',
        options: [],
        originDB: true,
        methodService: getTiposUsuarios
    },

]

export const fieldsFormUser = [
    {
        name: "username",
        label: "Usuario",
        rules: [{
            required: true,
            message: 'Por favor ingrese un nombre de usuario',
        }]
    },
    {
        name: "password",
        label: "Contraseña",
        rules: [{
            required: true,
            message: 'Por favor ingrese una contraseña.',
        }]
    },
    {
        name: "enabled",
        label: "Activo",
        valuePropName: "checked",
        type: 'switch'
    },
]

export const fieldsFormRol = [
    {
        name: "roles",
        label: "Roles",
        rules:[{ validator: (_, value=[]) => value.length > 0 ? Promise.resolve() : Promise.reject(new Error('Seleccione un rol')), },],
        type: 'checkbox.group',
        options: [],
        originDB: true,
        methodService: getRoles
    },
]


export default fieldsForm;


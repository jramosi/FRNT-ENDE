import React from 'react'
import { Link } from "react-router-dom";

/**Componente para redireccion 
 * esto para evitar conflictos con el router y la configuracion del router */
const RedirectTo = ({to='',children}) => {
    return (
        <Link to={'/' + to}>{children}</Link>
    )
}

export default RedirectTo
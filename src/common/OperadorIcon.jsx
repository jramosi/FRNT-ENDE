import React from 'react'
import Operador from '../assets/img/operador.png'
import OperadorSuccess from '../assets/img/operador-success.png'
const OperadorIcon = ({ type = 'default', width = 64 }) => {
    if (type === 'success')
        return (
            <img src={OperadorSuccess} alt="" style={{ background: '#fff', borderRadius: 10 }} width={width}  className="icono_point"/>
        )
    return (
        <img src={Operador} alt="" style={{ background: '#fff', borderRadius: 10 }} width={width} />
    )
}

export default OperadorIcon
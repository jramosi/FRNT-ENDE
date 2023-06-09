import { Button } from 'antd';
import React, { useEffect, useState } from 'react'
import { useAuthState } from '../../security/authentication/AuthContext';
import { getAgencia } from '../../services/AgenciaService'
import { Link } from 'react-router-dom'
import ROUTE from '../../constants/Routes';

const VentanillaSelect = () => {

  const { agencia_id } = useAuthState();

  // ===============Select de agencias

  const [puntos, setPuntos] = useState([])
  useEffect(() => { handleAgencia() }, [])

  const handleAgencia = async () => {
    const { data } = await getAgencia(agencia_id);
    setPuntos(data.puntoAtencion)
  }


  // ===============
  return (
    <div>
      <h2>Seleccione una ventanilla</h2>

      {puntos.map(punto => <Link to={'/'+ROUTE.VENTANILLA+'/'+punto.id} key={punto.id}><Button>{punto.codigo}</Button></Link>)}


    </div>
  )
}

export default VentanillaSelect
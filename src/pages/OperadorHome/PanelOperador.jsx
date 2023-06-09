import {  usePanelOperadorState } from '../../contexts/PanelOperadorContext';
import AsignacionPuntoAtencion from './AsignacionPuntoAtencion';
import OperadorUbicacion from './OperadorUbicacion';

const PanelOperador = () => {

  const { usuarioUbicacionNew } = usePanelOperadorState();

  if (usuarioUbicacionNew)
    return <AsignacionPuntoAtencion />

  return (
    <OperadorUbicacion />
  )
}

export default PanelOperador
import React from 'react'
import { PanelOperadorProvider } from '../../contexts/PanelOperadorContext'
import PanelOperador from './PanelOperador'

const Operador = () => {
  return (
    <PanelOperadorProvider>
        <PanelOperador/>
    </PanelOperadorProvider>
  )
}

export default Operador
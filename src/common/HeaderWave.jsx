import React from 'react'
import { Typography } from 'antd';
import logo from '../assets/img/logo-delpz-bl.png'
import '../assets/css/waves/style.css'
const { Title } = Typography;

/**
 * Header para el dispensador de tickets  y para la vista del monitor
 * @param {descripcion_de_la_agencia :string, isMonitor:boolean} props 
 * @returns 
 */
const HeaderWave = (props) => {
    const { agenciaDescripcion = '', monitor = false } = props

    if (monitor) {
        return (
            <div className='monitor_header_default'>
                <figure style={{ margin: 0, padding: 0 }}>
                    <img src={logo} alt="logo-delapaz" />
                </figure>
                <Title italic level={4} style={{ color: '#fff', padding: 0, margin: 0 ,wordBreak: 'normal'}}>{agenciaDescripcion ? `${agenciaDescripcion}` : 'DISTRIBUIDORA DE ELECTRICIDAD LA PAZ'}</Title>
            </div>
        )
    }
    //HeaderWave para el dispensador
    return (
        <div className='dispensador_header' style={{ position: 'relative' }}>
            <figure style={{ margin: 0, padding: 0 }}>
                <img src={logo} alt="logo-delapaz" />
            </figure>
            <Title italic level={5} style={{ color: '#fff', padding: 0, margin: 0 }}>{agenciaDescripcion ? `AGENCIA: ${agenciaDescripcion}` : 'DISTRIBUIDORA DE ELECTRICIDAD LA PAZ'}</Title>
            <svg className="waves" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
                <defs><path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" /></defs>
                <g className="parallax">
                    <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.1" />
                    <use xlinkHref="#gentle-wave" x="48" y="1" fill="rgba(255,255,255,0.1)" />
                    <use xlinkHref="#gentle-wave" x="48" y="2" fill="rgba(255,255,255,0.1)" />
                    <use xlinkHref="#gentle-wave" x="48" y="3" fill="#ececec" />
                </g>
            </svg>
        </div>
    )
}

export default HeaderWave
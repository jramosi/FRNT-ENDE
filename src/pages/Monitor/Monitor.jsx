import React from 'react'
import { Alert, Layout } from 'antd';

import Turnos from './Turnos'
import Multimedia from './Multimedia'
import Loading from '../../common/Loading';
import HeaderWave from '../../common/HeaderWave';
import { getDispensadorByMac } from '../../services/DispensadorService';
import { getAllUrlsMultimedia } from '../../services/MultimediaService';
import { useGetDataService, useGetDataServiceByParam } from '../../hooks/useDataService';

const { Header } = Layout;

const Monitor = ({ numeroPinLocal = null }) => {
    const { data: agencia, error: errorAgencia, loading: loadingAgencia } = useGetDataServiceByParam(getDispensadorByMac, numeroPinLocal)
    const { data: urlsVideos = [], error, loading } = useGetDataService(getAllUrlsMultimedia)
    
    if (loadingAgencia) { return <Loading /> }
    if (errorAgencia) { return <Alert message="Error al obtener datos de la Agencia" type="error" showIcon /> }

    return (
        <>
            <Header className='wave_container wave_container_monitor' style={{background:'rgba(0, 0, 0, 0)'}}>
                <HeaderWave agenciaDescripcion={agencia.descripcion} monitor={true} />
            </Header>

            <section id="hero">
                <div className="hero-container">
                    {urlsVideos.length > 0 ? <Multimedia urlsVideos={urlsVideos} /> : <></>}
                </div>
            </section>
            
            <div id="turnos-content" style={{ display: 'flex', alignItems: 'center' }}>
                <div className="">
                    <Turnos agencia={agencia} />
                </div>
            </div>
        </>
    )
}

export default Monitor